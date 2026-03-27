<?php

namespace App\Http\Controllers;

use App\Facades\QueryFilter;
use App\Http\Requests\SearchQueryRequest;
use App\Http\Resources\SelectOptionResource;
use App\Models\StudentEnrollment;
use Illuminate\Http\JsonResponse;

class SearchStudentEnrollmentController extends Controller
{
    /**
     * Search.
     *
     * Search a student enrolment.
     *
     * @authenticated
     *
     * @return JsonResponse
     */
    public function __invoke(SearchQueryRequest $request)
    {
        $validated = $request->validated();

        $query = StudentEnrollment::with('student')->where('is_active', true)->limit(10);

        $data = QueryFilter::make($query)->search($validated['q'])->get();

        return response()->json([
            'data' => SelectOptionResource::collection($data),
        ]);
    }
}
