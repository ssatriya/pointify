<?php

namespace App\Http\Services;

use App\Facades\DataTable;
use App\Models\VocationalProgram;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Throwable;

class VocationalProgramService
{
    public function index(array $validated): LengthAwarePaginator
    {
        $query = VocationalProgram::query()->orderBy('created_at', 'desc');

        return DataTable::make($query, $validated)->process();
    }

    /**
     * @throws Throwable
     */
    public function create(array $data): void
    {
        DB::transaction(function () use ($data) {
            VocationalProgram::create([...$data, 'created_by' => Auth::id()]);
        });
    }

    /**
     * @throws Throwable
     */
    public function update(array $data, VocationalProgram $vocationalProgram)
    {
        return DB::transaction(function () use ($data, $vocationalProgram) {
            $vocationalProgram->update([...$data, 'updated_by' => Auth::id()]);
        });
    }

    /**
     * @throws Throwable
     */
    public function delete(VocationalProgram $vocationalProgram)
    {
        return DB::transaction(function () use ($vocationalProgram) {
            $hasStudents = \App\Models\Student::where('vocational_program_id', $vocationalProgram->id)->exists();
            $hasClasses = \App\Models\StudentClass::where('vocational_program_id', $vocationalProgram->id)->exists();

            if ($hasStudents || $hasClasses) {
                throw ValidationException::withMessages([
                    'vocational_program' => 'Program kejuruan tidak bisa dihapus karena masih digunakan oleh data siswa atau kelas.'
                ]);
            }

            $vocationalProgram->delete();
        });
    }
}