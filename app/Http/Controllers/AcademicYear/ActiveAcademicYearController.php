<?php

namespace App\Http\Controllers\AcademicYear;

use App\Http\Controllers\Controller;
use App\Http\Resources\SelectOptionResource;
use App\Models\AcademicYear;
use Illuminate\Http\JsonResponse;

class ActiveAcademicYearController extends Controller
{
    /**
     * Active.
     *
     * Get an active record of academic year.
     *
     * @authenticated
     */
    public function __invoke(): JsonResponse
    {
        $data = AcademicYear::where('is_active', true)->first();

        abort_if(!$data, 404, 'Tahun akademik aktif tidak ditemukan');

        return response()->json(
            [
                'data' => new SelectOptionResource($data),
            ]
        );
    }
}
