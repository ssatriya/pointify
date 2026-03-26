<?php

namespace App\Http\Controllers\AcademicYear;

use App\Http\Controllers\Controller;
use App\Http\Services\AcademicYearService;
use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\store\StoreAcademicYearRequest;
use App\Http\Requests\update\UpdateAcademicYearRequest;
use App\Http\Resources\AcademicYearResource;
use App\Models\AcademicYear;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Throwable;

class AcademicYearController extends Controller
{
    public function __construct(
        protected AcademicYearService $academicYearService
    ) {
    }

    /**
     * Index.
     *
     * Getting academic years pagination list.
     *
     * @authenticated
     *
     * @return Response
     */
    public function index(GetListRequestParams $request): Response
    {
        $paginatedList = $this->academicYearService->index($request->validated());
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
     * @param StoreAcademicYearRequest $request
     * @return RedirectResponse
     * @throws Throwable
     */
    public function store(StoreAcademicYearRequest $request): RedirectResponse
    {
        $this->academicYearService->create($request->validated());
        return Inertia::flash(['message' => 'Tahun akademik berhasil disimpan.'])->back();
    }

    /**
     * Show.
     *
     * Get single entry of academic year data to be shown in form.
     *
     * @authenticated
     *
     * @param AcademicYear $academicYear The resolved academic year instance.
     * @return JsonResponse
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
     * @param AcademicYear $academicYear The resolved academic year instance.
     * @return RedirectResponse
     * @throws Throwable
     */
    public function update(UpdateAcademicYearRequest $request, AcademicYear $academicYear): RedirectResponse
    {
        $this->academicYearService->update($request->validated(), $academicYear);
        return Inertia::flash(['message' => 'Tahun akademik berhasil diperbarui.'])->back();
    }

    /**
     * Delete.
     *
     * Delete an entry of academic years.
     *
     * @authenticated
     *
     * @param AcademicYear $academicYear The resolved academic year instance.
     * @return RedirectResponse
     * @throws Throwable
     */
    public function destroy(AcademicYear $academicYear): RedirectResponse
    {
        $this->academicYearService->delete($academicYear);
        return Inertia::flash(['message' => 'Tahun akademik berhasil dihapus.'])->back();
    }
}
