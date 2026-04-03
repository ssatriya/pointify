<?php

namespace App\Http\Controllers;

use App\Facades\QueryFilter;
use App\Http\Requests\SearchQueryRequest;
use App\Http\Resources\SelectOptionResource;
use App\Models\Student;
use App\Models\VocationalProgram;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchUnenrolledStudentController extends Controller
{
    /**
     * Search.
     *
     * Search an unenrolled student from student enrollment table based on vocational program.
     *
     * @authenticated
     */
    public function __invoke(SearchQueryRequest $request, VocationalProgram $vocationalProgram): JsonResponse
    {
        $validated = $request->validated();

        $query = Student::query()->whereDoesntHave('studentEnrollments.academicYear', function ($query) {
            $query->where('is_active', true);
        })->where('vocational_program_id', $vocationalProgram->id)->limit(30)->latest();

        $data = QueryFilter::make($query)->search($validated['q'])->get();

        return response()->json(SelectOptionResource::collection($data));
    }
}
