<?php

namespace App\Http\Controllers;

use App\Actions\ViolationType\CreateViolationType;
use App\Actions\ViolationType\DeleteViolationType;
use App\Actions\ViolationType\UpdateViolationType;
use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\Store\StoreViolationTypeRequest;
use App\Http\Requests\Update\UpdateViolationTypeRequest;
use App\Http\Resources\ViolationTypeResource;
use App\Models\ViolationType;
use App\Queries\ViolationTypeList;
use Inertia\Inertia;
use Inertia\Response;
use InertiaUI\Modal\Modal;
use Throwable;

class ViolationTypeController extends Controller
{
    /**
     * Index.
     *
     * Getting violation types pagination list.
     *
     * @authenticated
     *
     * @return Response
     */
    public function index(GetListRequestParams $request, ViolationTypeList $query)
    {
        $paginatedList = $query->handle($request->validated());

        return Inertia::render('dashboard/violation-types/violation-types', [
            'violationTypes' => ViolationTypeResource::collection($paginatedList),
        ]);
    }

    /**
     * @throws Throwable
     */
    public function store(StoreViolationTypeRequest $request, CreateViolationType $action)
    {
        $action->handle($request->validated());

        return Inertia::flash(['message' => 'Jenis pelanggaran berhasil disimpan.'])->back();
    }

    /**
     * Show.
     *
     * Get single entry of vocational data to be shown in form.
     *
     * @authenticated
     *
     * @param  ViolationType  $violationType  The resolved vocational program instance.
     * @return Modal
     */
    public function show(ViolationType $violationType)
    {
        return Inertia::modal('dashboard/violation-types/partials/edit-violation-type', [
            'violationType' => new ViolationTypeResource($violationType),
        ]);
    }

    /**
     * @throws Throwable
     */
    public function update(UpdateViolationTypeRequest $request, ViolationType $violationType, UpdateViolationType $action)
    {
        $action->handle($request->validated(), $violationType);

        return Inertia::flash(['message' => 'Jenis pelanggaran berhasil diperbarui.'])->back();
    }

    /**
     * @throws Throwable
     */
    public function destroy(ViolationType $violationType, DeleteViolationType $action)
    {
        $action->handle($violationType);

        return Inertia::flash(['message' => 'Jenis pelanggaran berhasil dihapus.'])->back();
    }
}
