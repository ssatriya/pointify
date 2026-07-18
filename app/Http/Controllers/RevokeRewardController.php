<?php

namespace App\Http\Controllers;

use App\Actions\Reward\RevokeReward;
use App\Http\Requests\RevokeReasonRequest;
use App\Models\Reward;
use Inertia\Inertia;

class RevokeRewardController extends Controller
{
    public function __invoke(RevokeReasonRequest $request, Reward $reward, RevokeReward $action)
    {
        $action->handle($reward, $request->validated());

        return Inertia::flash(['message' => 'Poin prestasi berhasil dibatalkan.'])->back();
    }
}
