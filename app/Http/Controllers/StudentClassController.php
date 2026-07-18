<?php

namespace App\Http\Controllers;

use App\Actions\StudentClass\CreateStudentClass;
use App\Actions\StudentClass\DeleteStudentClass;
use App\Actions\StudentClass\UpdateStudentClass;
use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\Store\StoreStudentClassRequest;
use App\Http\Requests\Update\UpdateStudentClassRequest;
use App\Http\Resources\StudentClassResource;
use App\Models\StudentClass;
use App\Queries\StudentClassList;
use Inertia\Inertia;
use Inertia\Response;
use InertiaUI\Modal\Modal;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Throwable;

class StudentClassController extends Controller
{
    /**
     * Index.
     *
     * Getting student classes pagination list.
     *
     * @authenticated
     */
    public function index(GetListRequestParams $request, StudentClassList $query): Response
    {
        $paginatedList = $query->handle($request->validated());

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
     * @throws Throwable
     */
    public function store(StoreStudentClassRequest $request, CreateStudentClass $action): RedirectResponse
    {
        $action->handle($request->validated());

        return Inertia::flash(['message' => 'Data kelas berhasil disimpan.'])->back();
    }

    /**
     * Show.
     *
     * Get single entry of student class data to be shown in form.
     *
     * @authenticated
     *
     * @param  StudentClass  $studentClass  The resolved student class instance.
     * @return Modal
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
     * @param  StudentClass  $studentClass  The resolved academic year instance.
     * @return RedirectResponse
     *
     * @throws Throwable
     */
    public function update(UpdateStudentClassRequest $request, StudentClass $studentClass, UpdateStudentClass $action)
    {
        $action->handle($request->validated(), $studentClass);

        return Inertia::flash(['message' => 'Data kelas berhasil diperbarui.'])->back();
    }

    /**
     * Delete.
     *
     * Delete an entry of student class.
     *
     * @authenticated
     *
     * @param  StudentClass  $studentClass  The resolved student class instance.
     *
     * @throws Throwable
     */
    public function destroy(StudentClass $studentClass, DeleteStudentClass $action): RedirectResponse
    {
        $action->handle($studentClass);

        return Inertia::flash(['message' => 'Data kelas berhasil dihapus.'])->back();
    }
}
