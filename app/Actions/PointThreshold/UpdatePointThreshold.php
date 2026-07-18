<?php

declare(strict_types=1);

namespace App\Actions\PointThreshold;

use App\Models\PointThreshold;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

final class UpdatePointThreshold
{
    /**
     * @throws Throwable
     */
    public function handle(array $data, PointThreshold $pointThreshold): PointThreshold
    {
        DB::transaction(function () use ($data, $pointThreshold) {
            $pointThreshold->update([...$data, 'updated_by' => Auth::id()]);
        });

        return $pointThreshold->fresh();
    }
}
