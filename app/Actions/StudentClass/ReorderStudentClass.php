<?php

declare(strict_types=1);

namespace App\Actions\StudentClass;

use App\Models\StudentClass;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Throwable;

final class ReorderStudentClass
{
    /**
     * @param  array<string>  $ids
     *
     * @throws Throwable
     */
    public function handle(array $ids): void
    {
        DB::transaction(function () use ($ids) {
            foreach ($ids as $index => $id) {
                StudentClass::where('id', $id)->update(['order' => $index + 1]);
            }
        });

        Cache::forget('student_classes_shared');
    }
}
