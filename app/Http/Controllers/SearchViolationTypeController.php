<?php

namespace App\Http\Controllers;

use App\Facades\QueryFilter;
use App\Http\Requests\SearchQueryRequest;
use App\Http\Resources\SelectOptionResource;
use App\Models\ViolationType;
use Illuminate\Http\JsonResponse;

class SearchViolationTypeController extends Controller
{
    /**
     * Search.
     *
     * Search an entry of violation type.
     *
     * @authenticated
     *
     * @param SelectOptionResource $request
     * @return JsonResponse
     */
    public function __invoke(SearchQueryRequest $request): JsonResponse
    {
        $query = ViolationType::query()->limit(10)->latest();

        $data = QueryFilter::make($query)->search($request->validated('q'))->get();

        return response()->json(SelectOptionResource::collection($data));
    }
}
