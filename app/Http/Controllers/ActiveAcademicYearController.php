<?php

namespace App\Http\Controllers;

use App\Http\Resources\SelectOptionResource;
use App\Models\AcademicYear;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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

        return response()->json(new SelectOptionResource($data));
    }
}
