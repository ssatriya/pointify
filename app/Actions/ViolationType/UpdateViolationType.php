<?php

declare(strict_types=1);

namespace App\Actions\ViolationType;

use App\Models\ViolationType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

final class UpdateViolationType
{
    /**
     * @throws Throwable
     */
    public function handle(array $data, ViolationType $violationType): ViolationType
    {
        DB::transaction(function () use ($data, $violationType) {
            $violationType->update([...$data, 'updated_by' => Auth::id()]);
        });

        return $violationType->fresh();
    }
}
