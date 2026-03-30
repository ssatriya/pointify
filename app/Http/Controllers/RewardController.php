<?php

namespace App\Http\Controllers;

use App\Http\Requests\Store\StoreRewardRequest;
use App\Http\Services\RewardService;
use App\Models\StudentEnrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;

class RewardController extends Controller
{
    public function __construct(
        protected RewardService $rewardService
    ) {
    }

    /**
     * @throws Throwable
     */
    public function __invoke(StoreRewardRequest $request)
    {
        $studentEnrollmentId = $request->validated('student_enrollment_id');
        $studentEnrollment = StudentEnrollment::findOrFail($studentEnrollmentId);

        $this->rewardService->create($request->validated(), $studentEnrollment);

        return Inertia::flash(['message' => 'Data poin prestasi berhasil disimpan.'])->back();
    }
}
