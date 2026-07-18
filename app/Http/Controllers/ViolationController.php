<?php

namespace App\Http\Controllers;

use App\Actions\Violation\CreateViolation;
use App\Http\Requests\Store\StoreViolationRequest;
use App\Models\StudentEnrollment;
use Inertia\Inertia;

class ViolationController extends Controller
{
    public function __invoke(StoreViolationRequest $request, CreateViolation $action)
    {
        $studentEnrollment = StudentEnrollment::findOrFail($request->validated('student_enrollment_id'));

        $action->handle($request->validated(), $studentEnrollment);

        return Inertia::flash(['message' => 'Pelanggaran berhasil dibuat.'])->back();
    }
}
