<?php

namespace App\Http\Services;

use App\Facades\DataTable;
use App\Facades\QueryBuilder;
use App\Models\ViolationType;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class ViolationTypeService
{
    public function index(array $validated): LengthAwarePaginator
    {
        $query = ViolationType::query()
            ->select([
                'id',
                'code',
                'description',
                'points',
                'is_active',
                'created_at',
            ]);

        return DataTable::make($query, $validated)->process();
    }

    /**
     * @throws Throwable
     */
    public function create(array $data): void
    {
        DB::transaction(function () use ($data) {
            ViolationType::create([...$data, 'created_by' => Auth::id()]);
        });
    }

    /**
     * @throws Throwable
     */
    public function update(array $data, ViolationType $violationType): void
    {
        DB::transaction(function () use ($data, $violationType) {
            $violationType->update([...$data, 'updated_by' => Auth::id()]);
        });
    }

    /**
     * @throws Throwable
     */
    public function delete(ViolationType $violationType): void
    {
        DB::transaction(function () use ($violationType) {
            $violationType->delete();
        });
    }

    public function search(array $validated)
    {
        $query = ViolationType::limit(10)->latest();

        return QueryBuilder::make($query)->search($validated['q'])->get();
    }
}