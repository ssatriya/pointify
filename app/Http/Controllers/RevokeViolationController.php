<?php

namespace App\Http\Controllers;

use App\Actions\Violation\RevokeViolation;
use App\Http\Requests\RevokeReasonRequest;
use App\Models\Violation;
use Inertia\Inertia;

class RevokeViolationController extends Controller
{
    public function __invoke(RevokeReasonRequest $request, Violation $violation, RevokeViolation $action)
    {
        $action->handle($violation, $request->validated());

        return Inertia::flash(['message' => 'Poin pelanggaran berhasil dibatalkan.'])->back();
    }
}
