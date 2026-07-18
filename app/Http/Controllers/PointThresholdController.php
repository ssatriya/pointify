<?php

namespace App\Http\Controllers;

use App\Actions\PointThreshold\CreatePointThreshold;
use App\Actions\PointThreshold\UpdatePointThreshold;
use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\Store\StorePointThresholdRequest;
use App\Http\Requests\Update\UpdatePointThresholdRequest;
use App\Http\Resources\PointThresholdResource;
use App\Models\PointThreshold;
use App\Queries\PointThresholdList;
use Inertia\Inertia;
use Throwable;

class PointThresholdController extends Controller
{
    public function index(GetListRequestParams $request, PointThresholdList $query)
    {
        $paginatedList = $query->handle($request->validated());

        return Inertia::render('dashboard/point-thresholds/point-thresholds', [
            'pointThresholds' => PointThresholdResource::collection($paginatedList),
        ]);
    }

    /**
     * @throws Throwable
     */
    public function store(StorePointThresholdRequest $request, CreatePointThreshold $action)
    {
        $action->handle($request->validated());

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
    public function update(UpdatePointThresholdRequest $request, PointThreshold $pointThreshold, UpdatePointThreshold $action)
    {
        $action->handle($request->validated(), $pointThreshold);

        return Inertia::flash(['message' => 'Batas poin berhasil diperbarui.'])->back();
    }
}
