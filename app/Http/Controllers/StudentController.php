<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetListRequestParams;
use App\Http\Requests\Store\StoreStudentRequest;
use App\Http\Requests\Update\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use App\Http\Resources\VocationalProgramResource;
use App\Http\Services\StudentService;
use App\Models\Student;
use App\Models\VocationalProgram;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class StudentController extends Controller
{
    public function __construct(
        protected StudentService $studentService
    ) {
    }

    /**
     * Index.
     *
     * Getting students pagination list.
     *
     * @authenticated
     *
     * @return Response
     */
    public function index(GetListRequestParams $request)
    {
        $paginatedList = $this->studentService->index($request->validated());

        return Inertia::render('dashboard/students/students', [
            'students' => StudentResource::collection($paginatedList),
            'vocationalPrograms' => VocationalProgram::all(['id', 'name', 'abbreviation']),
        ]);
    }

    /**
     * @throws Throwable
     */
    public function store(StoreStudentRequest $request)
    {
        $this->studentService->create($request->validated());

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
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $this->studentService->update($request->validated(), $student);

        return Inertia::flash(['message' => 'Data siswa berhasil diperbarui.'])->back();
    }


    /**
     * @throws Throwable
     */
    public function destroy(Student $student)
    {
        // if (!Gate::allows(Permission::STUDENTS_DELETE->value, $student)) {
        //     throw new AuthorizationException(ErrorMessage::UNAUTHORIZED_DELETE->value);
        // }

        $this->studentService->delete($student);

        return Inertia::flash(['message' => 'Data siswa berhasil dihapus.'])->back();
    }
}
