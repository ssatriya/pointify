<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\Store\StoreRewardTypeRequest;
use App\Http\Requests\Update\UpdateRewardTypeRequest;
use App\Http\Resources\RewardTypeResource;
use App\Http\Services\RewardTypeService;
use App\Models\RewardType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;

class RewardTypeController extends Controller
{
    public function __construct(
        protected RewardTypeService $rewardTypeService
    ) {
    }

    public function index(GetListRequestParams $request)
    {
        $paginatedList = $this->rewardTypeService->index($request->validated());

        return Inertia::render('dashboard/reward-types/reward-types', [
            'rewardTypes' => RewardTypeResource::collection($paginatedList)
        ]);
    }

    /**
     * @throws Throwable
     */
    public function store(StoreRewardTypeRequest $request)
    {
        $this->rewardTypeService->create($request->validated());

        return Inertia::flash(['message' => 'Data jenis pelanggaran berhasil disimpan.'])->back();
    }

    /**
     * Show.
     *
     * Get single entry of vocational data to be shown in form.
     *
     * @authenticated
     *
     * @param RewardType $rewardType The resolved vocational program instance.
     * @return JsonResponse
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
    public function update(UpdateRewardTypeRequest $request, RewardType $rewardType)
    {
        $this->rewardTypeService->update($request->validated(), $rewardType);

        return Inertia::flash(['message' => 'Data jenis pelanggaran berhasil diperbarui.'])->back();
    }

    /**
     * @throws Throwable
     */
    public function destroy(RewardType $rewardType)
    {
        $this->rewardTypeService->delete($rewardType);

        return Inertia::flash(['message' => 'Tipe prestasi berhasil dihapus.'])->back();
    }
}
