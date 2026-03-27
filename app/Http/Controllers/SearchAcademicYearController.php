<?php

namespace App\Http\Controllers;

use App\Facades\QueryFilter;
use App\Http\Requests\SearchQueryRequest;
use App\Http\Resources\SelectOptionResource;
use App\Models\AcademicYear;
use Illuminate\Http\JsonResponse;

class SearchAcademicYearController extends Controller
{
    /**
     * Search.
     *
     * Search an entry of academic year.
     *
     * @authenticated
     */
    public function __invoke(SearchQueryRequest $request): JsonResponse
    {
        $query = AcademicYear::query()->limit(10)->latest();

        $data = QueryFilter::make($query)->search($request->validated('q'))->get();

        return response()->json(SelectOptionResource::collection($data));
    }
}
