<?php

namespace App\Http\Controllers;

use App\Models\StudentEnrollment;
use App\Models\ViolationLetter;
use Barryvdh\DomPDF\Facade\Pdf;

class ViolationLetterController extends Controller
{
    public function __invoke(StudentEnrollment $studentEnrollment, int $sequence)
    {
        $letter = ViolationLetter::with(
            [
                'transactionGroup.violations',
                'transactionGroup.violations.violationType',
                'transactionGroup.violations.createdBy',
                'transactionGroup.violations.pointTransaction',
                'studentEnrollment.student',
                'studentEnrollment.studentClass',
                'studentEnrollment.academicYear',
            ]
        )
            ->where('student_enrollment_id', $studentEnrollment->id)
            ->whereHas('transactionGroup', function ($query) use ($sequence) {
                $query->where('sequence', $sequence);
            })
            ->latest()->first();

        $pdf = Pdf::loadView('pdf.violation_letter', [
            'letter' => $letter,
        ]);

        // return $pdf->
        return $pdf->stream('letter.pdf');
    }
}
