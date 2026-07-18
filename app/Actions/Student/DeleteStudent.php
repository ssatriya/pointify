<?php

declare(strict_types=1);

namespace App\Actions\Student;

use App\Models\Student;
use Illuminate\Support\Facades\DB;
use Throwable;

final class DeleteStudent
{
    /**
     * @throws Throwable
     */
    public function handle(Student $student): void
    {
        DB::transaction(function () use ($student) {
            $student->delete();
        });
    }
}
