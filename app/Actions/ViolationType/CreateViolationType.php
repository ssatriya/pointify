<?php

declare(strict_types=1);

namespace App\Actions\ViolationType;

use App\Models\ViolationType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

final class CreateViolationType
{
    /**
     * @throws Throwable
     */
    public function handle(array $data): void
    {
        DB::transaction(function () use ($data) {
            ViolationType::create([...$data, 'created_by' => Auth::id()]);
        });
    }
}
