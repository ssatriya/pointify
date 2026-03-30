<?php

namespace App\Http\Controllers;

use App\Facades\QueryFilter;
use App\Http\Requests\SearchQueryRequest;
use App\Http\Resources\SelectOptionResource;
use App\Models\RewardType;
use Illuminate\Http\JsonResponse;

class SearchRewardTypeController extends Controller
{
    /**
     * Search.
     *
     * Search an entry of reward type.
     *
     * @authenticated
     *
     * @param SearchQueryRequest $request
     * @return JsonResponse
     */
    public function __invoke(SearchQueryRequest $request): JsonResponse
    {
        $query = RewardType::query()->limit(10)->latest();

        $data = QueryFilter::make($query)->search($request->validated('q'))->get();

        return response()->json(SelectOptionResource::collection($data));
    }
}
