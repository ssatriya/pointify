<?php

declare(strict_types=1);

namespace App\Actions\RewardType;

use App\Models\RewardType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

final class UpdateRewardType
{
    /**
     * @throws Throwable
     */
    public function handle(array $data, RewardType $rewardType): RewardType
    {
        DB::transaction(function () use ($data, $rewardType) {
            $rewardType->update([...$data, 'updated_by' => Auth::id()]);
        });

        return $rewardType->fresh();
    }
}
