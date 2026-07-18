<?php

declare(strict_types=1);

namespace App\Queries;

use App\Facades\QueryFilter;
use App\Models\RewardType;

final class SearchRewardType
{
    public function handle(array $validated)
    {
        $query = RewardType::limit(8)->latest();

        return QueryFilter::make($query)->search($validated['q'])->get();
    }
}
