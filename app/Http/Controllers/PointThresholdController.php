<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\Store\StorePointThresholdRequest;
use App\Http\Requests\Update\UpdatePointThresholdRequest;
use App\Http\Resources\PointThresholdResource;
use App\Http\Services\PointThresholdService;
use App\Models\PointThreshold;
use Inertia\Inertia;
use Throwable;

class PointThresholdController extends Controller
{
    public function __construct(
        protected PointThresholdService $pointThresholdService
    ) {
    }

    public function index(GetListRequestParams $request)
    {
        $paginatedList = $this->pointThresholdService->index($request->validated());

        return Inertia::render('dashboard/point-thresholds/point-thresholds', [
            'pointThresholds' => PointThresholdResource::collection($paginatedList),
        ]);
    }

    /**
     * @throws Throwable
     */
    public function store(StorePointThresholdRequest $request)
    {
        $this->pointThresholdService->create($request->validated());

        return Inertia::flash(['message' => 'Batas poin berhasil disimpan.'])->back();
    }

    public function show(PointThreshold $pointThreshold)
    {
        return Inertia::modal('dashboard/point-thresholds/partials/edit-point-threshold', [
            'pointThreshold' => new PointThresholdResource($pointThreshold->loadMissing('academicYear')),
        ]);
    }

    /**
     * @throws Throwable
     */
    public function update(UpdatePointThresholdRequest $request, PointThreshold $pointThreshold)
    {
        $this->pointThresholdService->update($request->validated(), $pointThreshold);

        return Inertia::flash(['message' => 'Batas poin berhasil diperbarui.'])->back();
    }
}
