<?php

namespace App\Http\Controllers;

use App\Http\Requests\RevokeReasonRequest;
use App\Http\Services\ViolationService;
use App\Models\Violation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RevokeViolationController extends Controller
{
    public function __construct(
        protected ViolationService $violationService
    ) {
    }

    public function __invoke(RevokeReasonRequest $request, Violation $violation)
    {
        $this->violationService->revokeViolation($violation, $request->validated());

        return Inertia::flash(['message' => 'Poin pelanggaran berhasil dibatalkan.'])->back();
    }
}
