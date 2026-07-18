<?php

declare(strict_types=1);

namespace App\Actions\VocationalProgram;

use App\Models\VocationalProgram;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

final class CreateVocationalProgram
{
    /**
     * @throws Throwable
     */
    public function handle(array $data): void
    {
        DB::transaction(function () use ($data) {
            VocationalProgram::create([...$data, 'created_by' => Auth::id()]);
        });
    }
}
