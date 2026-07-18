<?php

declare(strict_types=1);

namespace App\Actions\PointThreshold;

use App\Models\PointThreshold;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

final class CreatePointThreshold
{
    /**
     * @throws Throwable
     */
    public function handle(array $data): void
    {
        DB::transaction(function () use ($data) {
            PointThreshold::create([...$data, 'created_by' => Auth::id()]);
        });
    }
}
