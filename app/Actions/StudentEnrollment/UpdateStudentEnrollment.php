<?php

declare(strict_types=1);

namespace App\Actions\StudentEnrollment;

use App\Models\StudentEnrollment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

final class UpdateStudentEnrollment
{
    /**
     * @throws Throwable
     */
    public function handle(array $data, StudentEnrollment $studentEnrollment)
    {
        return DB::transaction(function () use ($data, $studentEnrollment) {
            $studentEnrollment->update([...$data, 'updated_by' => Auth::id()]);

            return $studentEnrollment->fresh()->load([
                'student:id,name',
                'studentClass:id,name',
                'academicYear:id,name',
            ]);
        });
    }
}
