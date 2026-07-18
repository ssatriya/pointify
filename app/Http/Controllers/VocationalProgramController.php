<?php

namespace App\Http\Controllers;

use App\Actions\VocationalProgram\CreateVocationalProgram;
use App\Actions\VocationalProgram\DeleteVocationalProgram;
use App\Actions\VocationalProgram\UpdateVocationalProgram;
use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\Store\StoreVocationalProgramRequest;
use App\Http\Requests\Update\UpdateVocationalProgramRequest;
use App\Http\Resources\VocationalProgramResource;
use App\Models\VocationalProgram;
use App\Queries\VocationalProgramList;
use Inertia\Inertia;
use Inertia\Response;
use InertiaUI\Modal\Modal;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Throwable;

class VocationalProgramController extends Controller
{
    /**
     * Index.
     *
     * Getting vocational program pagination list.
     *
     * @authenticated
     *
     * @return Response
     */
    public function index(GetListRequestParams $request, VocationalProgramList $query)
    {
        $paginatedList = $query->handle($request->validated());

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
     * @throws Throwable
     */
    public function store(StoreVocationalProgramRequest $request, CreateVocationalProgram $action): RedirectResponse
    {
        $action->handle($request->validated());

        return Inertia::flash([
            'message' => 'Program kejuruan berhasil disimpan.',
        ])->back();
    }

    /**
     * Show.
     *
     * Get single entry of vocational data to be shown in form.
     *
     * @authenticated
     *
     * @param  VocationalProgram  $vocationalProgram  The resolved vocational program instance.
     * @return Modal
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
     * @throws Throwable
     */
    public function update(UpdateVocationalProgramRequest $request, VocationalProgram $vocationalProgram, UpdateVocationalProgram $action): RedirectResponse
    {
        $action->handle($request->validated(), $vocationalProgram);

        return Inertia::flash(['message' => 'Program kejuruan berhasil diperbarui.'])->back();
    }

    /**
     * Delete.
     *
     * Delete an entry of vocational program.
     *
     * @authenticated
     *
     * @throws Throwable
     */
    public function destroy(VocationalProgram $vocationalProgram, DeleteVocationalProgram $action): RedirectResponse
    {
        $action->handle($vocationalProgram);

        return Inertia::flash(['message' => 'Program kejuruan berhasil dihapus.'])->back();
    }
}
