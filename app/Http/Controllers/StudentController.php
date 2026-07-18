<?php

namespace App\Http\Controllers;

use App\Actions\Student\CreateStudent;
use App\Actions\Student\DeleteStudent;
use App\Actions\Student\UpdateStudent;
use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\Store\StoreStudentRequest;
use App\Http\Requests\Update\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use App\Models\VocationalProgram;
use App\Queries\StudentList;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class StudentController extends Controller
{
    /**
     * Index.
     *
     * Getting students pagination list.
     *
     * @authenticated
     *
     * @return Response
     */
    public function index(GetListRequestParams $request, StudentList $query)
    {
        $paginatedList = $query->handle($request->validated());

        return Inertia::render('dashboard/students/students', [
            'students' => StudentResource::collection($paginatedList),
            'vocationalPrograms' => VocationalProgram::all(['id', 'name', 'abbreviation']),
        ]);
    }

    /**
     * @throws Throwable
     */
    public function store(StoreStudentRequest $request, CreateStudent $action)
    {
        $action->handle($request->validated());

        return Inertia::flash(['message' => 'Data siswa berhasil disimpan.'])->back();
    }

    public function show(Student $student)
    {
        return Inertia::modal('dashboard/students/partials/edit-student', [
            'student' => new StudentResource($student->loadMissing('vocationalProgram')),
        ]);
    }

    /**
     * @throws Throwable
     */
    public function update(UpdateStudentRequest $request, Student $student, UpdateStudent $action)
    {
        $action->handle($request->validated(), $student);

        return Inertia::flash(['message' => 'Data siswa berhasil diperbarui.'])->back();
    }

    /**
     * @throws Throwable
     */
    public function destroy(Student $student, DeleteStudent $action)
    {
        // if (!Gate::allows(Permission::STUDENTS_DELETE->value, $student)) {
        //     throw new AuthorizationException(ErrorMessage::UNAUTHORIZED_DELETE->value);
        // }

        $action->handle($student);

        return Inertia::flash(['message' => 'Data siswa berhasil dihapus.'])->back();
    }
}
