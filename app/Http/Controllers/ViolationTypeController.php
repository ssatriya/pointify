<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\Store\StoreViolationTypeRequest;
use App\Http\Requests\Update\UpdateViolationTypeRequest;
use App\Http\Resources\ViolationTypeResource;
use App\Http\Services\ViolationTypeService;
use App\Models\ViolationType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ViolationTypeController extends Controller
{
    public function __construct(
        protected ViolationTypeService $violationTypeService
    ) {
    }

    /**
     * Index.
     *
     * Getting violation types pagination list.
     *
     * @authenticated
     *
     * @return Response
     */
    public function index(GetListRequestParams $request)
    {
        $paginatedList = $this->violationTypeService->index($request->validated());

        return Inertia::render('dashboard/violation-types/violation-types', [
            'violationTypes' => ViolationTypeResource::collection($paginatedList)
        ]);
    }

    /**
     * @throws Throwable
     */
    public function store(StoreViolationTypeRequest $request)
    {
        $this->violationTypeService->create($request->validated());

        return Inertia::flash(['message' => 'Jenis pelanggaran berhasil disimpan.'])->back();
    }

    /**
     * Show.
     *
     * Get single entry of vocational data to be shown in form.
     *
     * @authenticated
     *
     * @param ViolationType $violationType The resolved vocational program instance.
     * @return JsonResponse
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
    public function update(UpdateViolationTypeRequest $request, ViolationType $violationType)
    {
        $this->violationTypeService->update($request->validated(), $violationType);

        return Inertia::flash(['message' => 'Jenis pelanggaran berhasil diperbarui.'])->back();
    }

    /**
     * @throws Throwable
     */
    public function destroy(ViolationType $violationType)
    {
        $this->violationTypeService->delete($violationType);

        return Inertia::flash(['message' => 'Jenis pelanggaran berhasil dihapus.'])->back();
    }
}
