<?php

declare(strict_types=1);

namespace App\Actions\StudentClass;

use App\Models\StudentClass;
use Illuminate\Support\Facades\DB;
use Throwable;

final class DeleteStudentClass
{
    /**
     * @throws Throwable
     */
    public function handle(StudentClass $studentClass): void
    {
        DB::transaction(function () use ($studentClass) {
            $studentClass->delete();
        });
    }
}
