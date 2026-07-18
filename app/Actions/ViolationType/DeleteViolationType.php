<?php

declare(strict_types=1);

namespace App\Actions\ViolationType;

use App\Models\ViolationType;
use Illuminate\Support\Facades\DB;
use Throwable;

final class DeleteViolationType
{
    /**
     * @throws Throwable
     */
    public function handle(ViolationType $violationType): void
    {
        DB::transaction(function () use ($violationType) {
            $violationType->delete();
        });
    }
}
