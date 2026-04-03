<?php

namespace App\Http\Controllers;

use App\Facades\DataTable;
use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\Store\StoreStudentEnrollmentRequest;
use App\Http\Requests\Update\UpdateStudentEnrollmentRequest;
use App\Http\Resources\StudentEnrollmentResource;
use App\Http\Resources\StudentEnrollmentSummaryResource;
use App\Http\Services\StudentEnrollmentService;
use App\Models\StudentClass;
use App\Models\StudentEnrollment;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class StudentEnrollmentController extends Controller
{
    public function __construct(
        protected StudentEnrollmentService $studentEnrollmentService
    ) {
    }

    public function index(GetListRequestParams $request, StudentClass $studentClass): Response
    {
        $validated = $request->validated();

        $query = StudentEnrollment::query()
            ->with([
                'student:id,name',
                'studentClass:id,name',
                'academicYear:id,name',
                'pointTransactions:id,student_enrollment_id,transaction_type,points_change',
            ])
            ->whereHas('studentClass', fn($q) => $q->where('id', $studentClass->id))
            ->whereHas('academicYear', fn($q) => $q->where('is_active', true))
            ->select([
                'id',
                'student_id',
                'student_class_id',
                'academic_year_id',
                'is_repeating',
                'initial_points',
                'is_active',
                'created_at',
            ]);

        $paginatedList = DataTable::make($query, $validated)->process();

        return Inertia::render('dashboard/student-enrollments/student-enrollments', [
            'studentClass' => $studentClass,
            'studentEnrollments' => StudentEnrollmentResource::collection($paginatedList),
        ]);
    }

    public function reports(StudentClass $studentClass): Response
    {
        $classOverview = $this->studentEnrollmentService->getClassOverviewMetrics($studentClass->id);

        return Inertia::render('dashboard/student-enrollments/reports/reports', [
            'studentClass' => $studentClass,
            'classOverview' => $classOverview,
        ]);
    }

    /**
     * @throws Throwable
     */
    public function store(StoreStudentEnrollmentRequest $request, StudentClass $studentClass)
    {
        // if (!Gate::allows(Permission::STUDENT_ENROLLMENTS_CREATE->value)) {
        //     throw new AuthorizationException(ErrorMessage::UNAUTHORIZED_CREATE->value);
        // }
        $this->studentEnrollmentService->create([
            ...$request->validated(),
        ], $studentClass->id);

        return Inertia::flash(['message' => 'Pendaftaran siswa berhasil disimpan.'])->back();
    }

    public function show(StudentEnrollment $studentEnrollment)
    {
        $studentEnrollment->loadMissing(['student', 'academicYear', 'studentClass:id,name,slug']);
        return Inertia::modal('dashboard/student-enrollments/partials/edit-student-enrollment', [
            'studentEnrollment' => new StudentEnrollmentResource($studentEnrollment),
        ])->baseRoute('dashboard.student-enrollments.class.index', $studentEnrollment->studentClass->slug);
    }

    /**
     * @throws Throwable
     */
    public function update(UpdateStudentEnrollmentRequest $request, StudentEnrollment $studentEnrollment)
    {
        $this->studentEnrollmentService->update($request->validated(), $studentEnrollment->loadMissing(['studentClass:id,name,slug']));

        return Inertia::flash(['Data pendaftaran siswa berhasil diperbarui.'])->back();
    }

    /**
     * @throws Throwable
     */
    public function destroy(StudentEnrollment $studentEnrollment)
    {
        // if (!Gate::allows(Permission::STUDENT_ENROLLMENTS_DELETE->value)) {
        //     throw new AuthorizationException(ErrorMessage::UNAUTHORIZED_DELETE->value);
        // }

        $this->studentEnrollmentService->delete($studentEnrollment);

        return Inertia::flash(['message' => 'Pendaftaran siswa berhasil dihapus.'])->back();
    }

    public function studentByEnrollment(StudentClass $studentClass, StudentEnrollment $studentEnrollment)
    {
        $studentEnrollment->loadMissing([
            'student',
            'academicYear',
            'studentClass',
            'pointTransactionGroups' => fn($q) => $q->with([
                'violations.pointTransaction' => fn($q) => $q->with([
                    'violation.violationType',
                    'violation.createdBy',
                ]),
                'rewards.pointTransaction' => fn($q) => $q->with([
                    'reward.rewardType',
                    'reward.createdBy',
                ]),
            ])->withExists(['violationLetters as has_letter'])->orderBy('sequence'),
        ]);

        return Inertia::render('dashboard/student-enrollments/student-detail', [
            'studentEnrollment' => new StudentEnrollmentSummaryResource($studentEnrollment),
        ]);
    }
}
