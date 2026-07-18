<?php

declare(strict_types=1);

namespace App\Actions\Student;

use App\Models\Student;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

final class UpdateStudent
{
    /**
     * @throws Throwable
     */
    public function handle(array $data, Student $student): Student
    {
        DB::transaction(function () use ($data, $student) {
            $student->update([...$data, 'updated_by' => Auth::id()]);
        });

        return $student->fresh();
    }
}
