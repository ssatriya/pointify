<?php

namespace App\Http\Controllers;

use App\Actions\RewardType\CreateRewardType;
use App\Actions\RewardType\DeleteRewardType;
use App\Actions\RewardType\UpdateRewardType;
use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\Store\StoreRewardTypeRequest;
use App\Http\Requests\Update\UpdateRewardTypeRequest;
use App\Http\Resources\RewardTypeResource;
use App\Models\RewardType;
use App\Queries\RewardTypeList;
use Inertia\Inertia;
use InertiaUI\Modal\Modal;
use Throwable;

class RewardTypeController extends Controller
{
    public function index(GetListRequestParams $request, RewardTypeList $query)
    {
        $paginatedList = $query->handle($request->validated());

        return Inertia::render('dashboard/reward-types/reward-types', [
            'rewardTypes' => RewardTypeResource::collection($paginatedList),
        ]);
    }

    /**
     * @throws Throwable
     */
    public function store(StoreRewardTypeRequest $request, CreateRewardType $action)
    {
        $action->handle($request->validated());

        return Inertia::flash(['message' => 'Data jenis pelanggaran berhasil disimpan.'])->back();
    }

    /**
     * Show.
     *
     * Get single entry of vocational data to be shown in form.
     *
     * @authenticated
     *
     * @param  RewardType  $rewardType  The resolved vocational program instance.
     * @return Modal
     */
    public function show(RewardType $rewardType)
    {
        return Inertia::modal('dashboard/reward-types/partials/edit-reward-type', [
            'rewardType' => new RewardTypeResource($rewardType),
        ]);
    }

    /**
     * @throws Throwable
     */
    public function update(UpdateRewardTypeRequest $request, RewardType $rewardType, UpdateRewardType $action)
    {
        $action->handle($request->validated(), $rewardType);

        return Inertia::flash(['message' => 'Data jenis pelanggaran berhasil diperbarui.'])->back();
    }

    /**
     * @throws Throwable
     */
    public function destroy(RewardType $rewardType, DeleteRewardType $action)
    {
        $action->handle($rewardType);

        return Inertia::flash(['message' => 'Tipe prestasi berhasil dihapus.'])->back();
    }
}
