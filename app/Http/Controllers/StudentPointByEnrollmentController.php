<?php

namespace App\Http\Controllers;

use App\Http\Resources\PointTransactionGroupResource;
use App\Models\PointTransactionGroup;
use App\Models\StudentEnrollment;

class PointController extends Controller
{
    public function indexByStudentEnrollment(StudentEnrollment $studentEnrollment)
    {
        $groups = PointTransactionGroup::with([
            'studentEnrollment.student',
            'violations',
            'rewards',
            'violations.pointTransaction' => fn($q) => $q->with([
                'studentEnrollment.student',
                'violation' => fn($v) => $v->with(['violationType', 'createdBy']),
                'reward' => fn($r) => $r->with(['rewardType', 'createdBy']),
            ]),
            'rewards.pointTransaction' => fn($q) => $q->with([
                'studentEnrollment.student',
                'violation' => fn($v) => $v->with(['violationType', 'createdBy']),
                'reward' => fn($r) => $r->with(['rewardType', 'createdBy']),
            ]),
            'violationLetters',
        ])
            ->withExists(['violationLetters as has_letter'])
            ->where('student_enrollment_id', $studentEnrollment->id)
            ->orderBy('sequence')
            ->get();

        return response()->json([
            'data' => PointTransactionGroupResource::collection($groups),
        ]);
    }
}
