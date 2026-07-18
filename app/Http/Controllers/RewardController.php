<?php

namespace App\Http\Controllers;

use App\Actions\Reward\CreateReward;
use App\Http\Requests\Store\StoreRewardRequest;
use App\Models\StudentEnrollment;
use Inertia\Inertia;
use Throwable;

class RewardController extends Controller
{
    /**
     * @throws Throwable
     */
    public function __invoke(StoreRewardRequest $request, CreateReward $action)
    {
        $studentEnrollmentId = $request->validated('student_enrollment_id');
        $studentEnrollment = StudentEnrollment::findOrFail($studentEnrollmentId);

        $action->handle($request->validated(), $studentEnrollment);

        return Inertia::flash(['message' => 'Data poin prestasi berhasil disimpan.'])->back();
    }
}
