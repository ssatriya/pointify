<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\Store\StoreVocationalProgramRequest;
use App\Http\Requests\Update\UpdateVocationalProgramRequest;
use App\Http\Resources\VocationalProgramResource;
use App\Http\Services\VocationalProgramService;
use App\Models\VocationalProgram;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Throwable;

class VocationalProgramController extends Controller
{
    public function __construct(
        protected VocationalProgramService $vocationalProgramService
    ) {
    }

    /**
     * Index.
     *
     * Getting vocational program pagination list.
     *
     * @authenticated
     *
     * @return Response
     */
    public function index(GetListRequestParams $request)
    {
        $paginatedList = $this->vocationalProgramService->index($request->validated());

        return Inertia::render('dashboard/vocational-programs/vocational-programs', [
            'vocationalPrograms' => VocationalProgramResource::collection($paginatedList),
        ]);
    }

    /**
     * Create.
     *
     * Create new entry of vocational program, return inserted data.
     *
     * @authenticated
     *
     * @return RedirectResponse
     * @throws Throwable
     */
    public function store(StoreVocationalProgramRequest $request): RedirectResponse
    {
        $this->vocationalProgramService->create($request->validated());

        return Inertia::flash([
            'message' => 'Program kejuruan berhasil disimpan.'
        ])->back();
    }

    /**
     * Show.
     *
     * Get single entry of vocational data to be shown in form.
     *
     * @authenticated
     *
     * @param VocationalProgram $vocationalProgram The resolved vocational program instance.
     * @return Response
     */
    public function show(VocationalProgram $vocationalProgram)
    {
        return Inertia::modal('dashboard/vocational-programs/partials/edit-vocational-program', [
            'vocationalProgram' => new VocationalProgramResource($vocationalProgram),
        ]);
    }

    /**
     * Update.
     *
     * Update existing vocational program, return updated data.
     *
     * @authenticated
     *
     * @param UpdateVocationalProgramRequest $request
     * @param VocationalProgram $vocationalProgram
     * @return RedirectResponse
     * @throws Throwable
     */
    public function update(UpdateVocationalProgramRequest $request, VocationalProgram $vocationalProgram): RedirectResponse
    {
        $this->vocationalProgramService->update($request->validated(), $vocationalProgram);

        return Inertia::flash(['message' => 'Program kejuruan berhasil diperbarui.'])->back();
    }

    /**
     * Delete.
     *
     * Delete an entry of vocational program.
     *
     * @authenticated
     *
     * @param VocationalProgram $vocationalProgram
     * @return RedirectResponse
     * @throws Throwable
     */
    public function destroy(VocationalProgram $vocationalProgram): RedirectResponse
    {
        $this->vocationalProgramService->delete($vocationalProgram);

        return Inertia::flash(['message' => 'Program kejuruan berhasil dihapus.'])->back();
    }
}
