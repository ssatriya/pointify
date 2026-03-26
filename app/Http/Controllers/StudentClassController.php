<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\Store\StoreStudentClassRequest;
use App\Http\Requests\Update\UpdateStudentClassRequest;
use App\Http\Resources\SelectOptionResource;
use App\Http\Resources\StudentClassResource;
use App\Http\Services\StudentClassService;
use App\Models\StudentClass;
use App\Models\VocationalProgram;
use App\Http\Resources\VocationalProgramResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Throwable;

class StudentClassController extends Controller
{
    public function __construct(
        protected StudentClassService $studentClassService
    ) {
    }

    /**
     * Index.
     *
     * Getting student classes pagination list.
     *
     * @authenticated
     *
     * @return Response
     */
    public function index(GetListRequestParams $request): Response
    {
        $paginatedList = $this->studentClassService->index($request->validated());

        return Inertia::render('dashboard/classes/classes', [
            'classes' => StudentClassResource::collection($paginatedList),
        ]);
    }

    /**
     * Store.
     *
     * Store a single entry of student class.
     *
     * @authenticated
     *
     * @return RedirectResponse
     * @throws Throwable
     */
    public function store(StoreStudentClassRequest $request): RedirectResponse
    {
        $this->studentClassService->create($request->validated());
        return Inertia::flash(['message' => 'Data kelas berhasil disimpan.'])->back();
    }

    /**
     * Show.
     *
     * Get single entry of student class data to be shown in form.
     *
     * @authenticated
     *
     * @param StudentClass $studentClass The resolved student class instance.
     * @return Response
     */
    public function show(StudentClass $studentClass)
    {
        return Inertia::modal('dashboard/classes/partials/edit-class', [
            'class' => new StudentClassResource($studentClass),
        ]);
    }

    /**
     * Update.
     *
     * Update s single entry of academic year.
     *
     * @authenticated
     *
     * @param StudentClass $studentClass The resolved academic year instance.
     * @return RedirectResponse
     * @throws Throwable
     */
    public function update(UpdateStudentClassRequest $request, StudentClass $studentClass)
    {
        $this->studentClassService->update($request->validated(), $studentClass);

        return Inertia::flash(['message' => 'Data kelas berhasil diperbarui.'])->back();
    }

    /**
     * Delete.
     *
     * Delete an entry of student class.
     *
     * @authenticated
     *
     * @param StudentClass $studentClass The resolved student class instance.
     * @return RedirectResponse
     * @throws Throwable
     */
    public function destroy(StudentClass $studentClass): RedirectResponse
    {
        $this->studentClassService->delete($studentClass);

        return Inertia::flash(['message' => 'Data kelas berhasil dihapus.'])->back();
    }
}
