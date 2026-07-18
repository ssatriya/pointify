<?php

declare(strict_types=1);

namespace App\Actions\VocationalProgram;

use App\Models\VocationalProgram;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

final class UpdateVocationalProgram
{
    /**
     * @throws Throwable
     */
    public function handle(array $data, VocationalProgram $vocationalProgram): VocationalProgram
    {
        DB::transaction(function () use ($data, $vocationalProgram) {
            $vocationalProgram->update([...$data, 'updated_by' => Auth::id()]);
        });

        return $vocationalProgram->fresh();
    }
}
