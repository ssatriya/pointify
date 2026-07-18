<?php

declare(strict_types=1);

namespace App\Queries;

use App\Models\StudentEnrollment;
use App\Models\Violation;
use Illuminate\Support\Facades\DB;

final class ClassOverviewMetrics
{
    public function handle(string $studentClassId): array
    {
        $classMetricsQuery = StudentEnrollment::query()
            ->where('student_class_id', $studentClassId)
            ->whereHas('academicYear', fn ($q) => $q->where('is_active', true))
            ->where('is_active', true);

        $classMetrics = (clone $classMetricsQuery)
            ->withSum(['pointTransactions as total_violations' => fn ($q) => $q->where('transaction_type', 'violation')], 'points_change')
            ->withSum(['pointTransactions as total_rewards' => fn ($q) => $q->where('transaction_type', 'reward')], 'points_change')
            ->get();

        $totalStudents = $classMetrics->count();
        $totalViolations = abs($classMetrics->sum('total_violations'));
        $totalRewards = $classMetrics->sum('total_rewards');

        $totalPointBalance = $classMetrics->sum(function ($enrollment) {
            return $enrollment->initial_points + ($enrollment->total_rewards ?? 0) - abs($enrollment->total_violations ?? 0);
        });

        $avgPointBalance = $totalStudents > 0 ? round($totalPointBalance / $totalStudents, 2) : 0;

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
            'top_violation_type' => $topViolation?->violationType->code ?? '-',
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
