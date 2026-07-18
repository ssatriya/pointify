<?php

declare(strict_types=1);

namespace App\Actions\RewardType;

use App\Models\RewardType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

final class CreateRewardType
{
    /**
     * @throws Throwable
     */
    public function handle(array $data): void
    {
        DB::transaction(function () use ($data) {
            RewardType::create([...$data, 'created_by' => Auth::id()]);
        });
    }
}
