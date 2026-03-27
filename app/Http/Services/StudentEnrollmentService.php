<?php

namespace App\Http\Services;

use App\Enums\ErrorMessage;
use App\Models\Reward;
use App\Models\StudentEnrollment;
use App\Models\Violation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Throwable;

class StudentEnrollmentService
{
    /**
     * @throws Throwable
     */
    public function create(array $data, string $studentClassId)
    {
        return DB::transaction(function () use ($data, $studentClassId) {
            $studentEnrollments = [];

            foreach ($data['student_id'] as $studentId) {
                $studentEnrollment = StudentEnrollment::create([
                    'student_id' => $studentId,
                    'academic_year_id' => $data['academic_year_id'],
                    'is_active' => $data['is_active'],
                    'is_repeating' => $data['is_repeating'],
                    'student_class_id' => $studentClassId,
                    'created_by' => Auth::id(),
                ]);

                $studentEnrollments[] = $studentEnrollment;
            }

            $enrollmentIds = collect($studentEnrollments)->pluck('id');

            return StudentEnrollment::with([
                'student:id,name',
                'studentClass:id,name',
                'academicYear:id,name',
                'pointTransactions:id,student_enrollment_id,transaction_type,points_change',
            ])->whereIn('id', $enrollmentIds)->get();
        });
    }

    /**
     * @throws Throwable
     */
    public function update(array $data, StudentEnrollment $studentEnrollment)
    {
        return DB::transaction(function () use ($data, $studentEnrollment) {
            $studentEnrollment->update([...$data, 'updated_by' => Auth::id()]);

            return $studentEnrollment->fresh()->load([
                'student:id,name',
                'studentClass:id,name',
                'academicYear:id,name',
            ]);
        });
    }

    /** @throws ConflictHttpException|Throwable */
    public function delete(StudentEnrollment $studentEnrollment)
    {
        return DB::transaction(function () use ($studentEnrollment) {
            $violations = Violation::where('student_enrollment_id', $studentEnrollment->id)->exists();
            $rewards = Reward::where('student_enrollment_id', $studentEnrollment->id)->exists();

            if ($violations || $rewards) {
                throw new ConflictHttpException(ErrorMessage::CONFLICT_DELETE->value);
            }

            $studentEnrollment->delete();
        });
    }

    /**
     * Get aggregate metrics for a specific class' active enrollments.
     */
    public function getClassOverviewMetrics(string $studentClassId): array
    {
        $classMetricsQuery = StudentEnrollment::query()
            ->where('student_class_id', $studentClassId)
            ->whereHas('academicYear', fn($q) => $q->where('is_active', true))
            ->where('is_active', true);

        $classMetrics = (clone $classMetricsQuery)
            ->withSum(['pointTransactions as total_violations' => fn($q) => $q->where('transaction_type', 'violation')], 'points_change')
            ->withSum(['pointTransactions as total_rewards' => fn($q) => $q->where('transaction_type', 'reward')], 'points_change')
            ->get();

        $totalStudents = $classMetrics->count();
        $totalViolations = abs($classMetrics->sum('total_violations'));
        $totalRewards = $classMetrics->sum('total_rewards');

        // Calculate average point balance: (initial + rewards - violations) / total
        $totalPointBalance = $classMetrics->sum(function($enrollment) {
            return $enrollment->initial_points + ($enrollment->total_rewards ?? 0) - abs($enrollment->total_violations ?? 0);
        });
        
        $avgPointBalance = $totalStudents > 0 ? round($totalPointBalance / $totalStudents, 2) : 0;

        // Find the top violation type by count
        $topViolation = Violation::query()
            ->whereIn('student_enrollment_id', (clone $classMetricsQuery)->pluck('id'))
            ->select('violation_type_id', DB::raw('count(*) as count'))
            ->groupBy('violation_type_id')
            ->orderByDesc('count')
            ->with('violationType:id,code')
            ->first();

        return [
            'total_students' => $totalStudents,
            'total_violations' => $totalViolations,
            'total_rewards' => $totalRewards,
            'avg_point_balance' => $avgPointBalance,
            'top_violation_type' => $topViolation?->violationType?->code ?? '-',
            'chart_data' => [
                [
                    'name' => 'Pelanggaran',
                    'total' => $totalViolations,
                    'fill' => 'hsl(var(--destructive))',
                ],
                [
                    'name' => 'Prestasi',
                    'total' => $totalRewards,
                    'fill' => 'hsl(var(--success))',
                ],
            ],
        ];
    }
}