<?php

declare(strict_types=1);

namespace App\Queries;

use App\Facades\QueryFilter;
use App\Models\ViolationType;

final class SearchViolationType
{
    public function handle(array $validated)
    {
        $query = ViolationType::limit(10)->latest();

        return QueryFilter::make($query)->search($validated['q'])->get();
    }
}
