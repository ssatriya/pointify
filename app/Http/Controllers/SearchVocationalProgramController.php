<?php

namespace App\Http\Controllers;

use App\Facades\QueryFilter;
use App\Http\Requests\SearchQueryRequest;
use App\Http\Resources\SelectOptionResource;
use App\Models\VocationalProgram;
use Illuminate\Http\JsonResponse;

class SearchVocationalProgramController extends Controller
{
    /**
     * Search.
     *
     * Search an entry of vocational program.
     *
     * @authenticated
     */
    public function __invoke(SearchQueryRequest $request): JsonResponse
    {
        $query = VocationalProgram::query()->limit(10)->latest();

        $data = QueryFilter::make($query)->search($request->validated('q'))->get();

        return response()->json(SelectOptionResource::collection($data));
    }
}
