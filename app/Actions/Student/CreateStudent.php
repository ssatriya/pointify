<?php

declare(strict_types=1);

namespace App\Actions\Student;

use App\Models\Student;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

final class CreateStudent
{
    /**
     * @throws Throwable
     */
    public function handle(array $data): void
    {
        DB::transaction(function () use ($data) {
            $student = Student::create([...$data, 'created_by' => Auth::id()]);

            $student->load(['vocationalProgram:id,name']);
        });
    }
}
