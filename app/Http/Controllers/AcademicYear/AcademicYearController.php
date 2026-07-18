<?php

declare(strict_types=1);

namespace App\Http\Controllers\AcademicYear;

use App\Actions\AcademicYear\CreateAcademicYear;
use App\Actions\AcademicYear\DeleteAcademicYear;
use App\Actions\AcademicYear\UpdateAcademicYear;
use App\Http\Controllers\Controller;
use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\Store\StoreAcademicYearRequest;
use App\Http\Requests\Update\UpdateAcademicYearRequest;
use App\Http\Resources\AcademicYearResource;
use App\Models\AcademicYear;
use App\Queries\AcademicYearList;
use Inertia\Inertia;
use Inertia\Response;
use InertiaUI\Modal\Modal;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Throwable;

class AcademicYearController extends Controller
{
    /**
     * Index.
     *
     * Getting academic years pagination list.
     *
     * @authenticated
     */
    public function index(GetListRequestParams $request, AcademicYearList $action): Response
    {
        $paginatedList = $action->handle($request->validated());

        return Inertia::render('dashboard/academic-years/academic-years', [
            'academicYears' => AcademicYearResource::collection($paginatedList),
        ]);
    }

    /**
     * Create.
     *
     * Create single entry of academic year.
     *
     * @authenticated
     *
     * @throws Throwable
     */
    public function store(StoreAcademicYearRequest $request, CreateAcademicYear $action): RedirectResponse
    {
        $action->handle($request->validated());

        return Inertia::flash(['message' => 'Tahun akademik berhasil disimpan.'])->back();
    }

    /**
     * Show.
     *
     * Get single entry of academic year data to be shown in form.
     *
     * @authenticated
     *
     * @param  AcademicYear  $academicYear  The resolved academic year instance.
     * @return Modal
     */
    public function show(AcademicYear $academicYear)
    {
        return Inertia::modal('dashboard/academic-years/partials/edit-academic-year', [
            'academicYear' => new AcademicYearResource($academicYear),
        ]);
    }

    /**
     * Update.
     *
     * Update single entry of academic year.
     *
     * @authenticated
     *
     * @param  AcademicYear  $academicYear  The resolved academic year instance.
     *
     * @throws Throwable
     */
    public function update(UpdateAcademicYearRequest $request, AcademicYear $academicYear, UpdateAcademicYear $action): RedirectResponse
    {
        $action->handle($request->validated(), $academicYear);

        return Inertia::flash(['message' => 'Tahun akademik berhasil diperbarui.'])->back();
    }

    /**
     * Delete.
     *
     * Delete an entry of academic years.
     *
     * @authenticated
     *
     * @param  AcademicYear  $academicYear  The resolved academic year instance.
     *
     * @throws Throwable
     */
    public function destroy(AcademicYear $academicYear, DeleteAcademicYear $action): RedirectResponse
    {
        $action->handle($academicYear);

        return Inertia::flash(['message' => 'Tahun akademik berhasil dihapus.'])->back();
    }
}
