<?php

namespace App\Http\Services;

use App\Facades\DataTable;
use App\Facades\QueryFilter;
use App\Models\RewardType;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class RewardTypeService
{
    public function index(array $validated): LengthAwarePaginator
    {
        $query = RewardType::query()
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
            RewardType::create([...$data, 'created_by' => Auth::id()]);
        });
    }

    /**
     * @throws Throwable
     */
    public function update(array $data, RewardType $rewardType): void
    {
        DB::transaction(function () use ($data, $rewardType) {
            $rewardType->update([...$data, 'updated_by' => Auth::id()]);
        });
    }

    /**
     * @throws Throwable
     */
    public function delete(RewardType $rewardType): void
    {
        DB::transaction(function () use ($rewardType) {
            $rewardType->delete();
        });
    }

    public function search(array $validated)
    {
        $query = RewardType::limit(8)->latest();

        return QueryFilter::make($query)->search($validated['q'])->get();
    }
}