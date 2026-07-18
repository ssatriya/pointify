<?php

declare(strict_types=1);

namespace App\Actions\RewardType;

use App\Models\RewardType;
use Illuminate\Support\Facades\DB;
use Throwable;

final class DeleteRewardType
{
    /**
     * @throws Throwable
     */
    public function handle(RewardType $rewardType): void
    {
        DB::transaction(function () use ($rewardType) {
            $rewardType->delete();
        });
    }
}
