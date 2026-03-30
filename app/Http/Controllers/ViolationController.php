<?php

namespace App\Http\Controllers;

use App\Http\Requests\Store\StoreViolationRequest;
use App\Http\Services\ViolationService;
use App\Models\StudentEnrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ViolationController extends Controller
{
    public function __construct(
        protected ViolationService $violationService
    ) {
    }

    public function __invoke(StoreViolationRequest $request)
    {
        $studentEnrollment = StudentEnrollment::findOrFail($request->validated('student_enrollment_id'));

        $this->violationService->create($request->validated(), $studentEnrollment);

        return Inertia::flash(['message' => 'Pelanggaran berhasil dibuat.'])->back();
    }

}
