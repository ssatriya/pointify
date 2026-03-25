<?php

namespace App\Http\Services;

use App\Facades\DataTable;
use App\Models\VocationalProgram;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class VocationalProgramService
{
    public function index(array $validated): LengthAwarePaginator
    {
        $query = VocationalProgram::query();

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
            $vocationalProgram->delete();
        });
    }
}