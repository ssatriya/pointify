<?php

namespace App\Http\Controllers;

use App\Http\Requests\RevokeReasonRequest;
use App\Http\Services\RewardService;
use App\Models\Reward;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RevokeRewardController extends Controller
{
    public function __construct(
        protected RewardService $rewardService
    ) {
    }

    public function __invoke(RevokeReasonRequest $request, Reward $reward)
    {
        $this->rewardService->revokeReward($reward, $request->validated());

        return Inertia::flash(['message' => 'Poin prestasi berhasil dibatalkan.'])->back();
    }
}
