<?php

use App\Http\Services\PointThresholdService;
use App\Models\AcademicYear;
use App\Models\PointThreshold;
use App\Models\PointTransaction;
use App\Models\PointTransactionGroup;
use App\Models\StudentEnrollment;
use App\Models\User;
use App\Models\Violation;
use App\Models\ViolationLetter;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->service = new PointThresholdService();
    $this->user = User::factory()->create();

    // Setup base data using factories
    $this->academicYear = AcademicYear::factory()->create(['created_by' => $this->user->id]);
    
    $this->studentEnrollment = StudentEnrollment::factory()->create([
        'academic_year_id' => $this->academicYear->id,
        'initial_points' => 100,
        'created_by' => $this->user->id,
    ]);

    $this->group = PointTransactionGroup::factory()->create([
        'student_enrollment_id' => $this->studentEnrollment->id,
        'sequence' => 1,
        'is_closed' => false,
    ]);

    // Create Thresholds
    PointThreshold::factory()->create(['cumulative_points_threshold' => 30, 'academic_year_id' => $this->academicYear->id, 'created_by' => $this->user->id]);
    PointThreshold::factory()->create(['cumulative_points_threshold' => 50, 'academic_year_id' => $this->academicYear->id, 'created_by' => $this->user->id]);
    PointThreshold::factory()->create(['cumulative_points_threshold' => 70, 'academic_year_id' => $this->academicYear->id, 'created_by' => $this->user->id]);
});

/**
 * Helper to simulate a violation and its transaction using factories
 */
function simulateViolation($enrollmentId, $groupId, $intendedPoints, $userId) {
    $violation = Violation::factory()->create([
        'student_enrollment_id' => $enrollmentId,
        'point_transaction_group_id' => $groupId,
        'created_by' => $userId,
        'approved_by' => $userId,
    ]);

    PointTransaction::factory()->create([
        'student_enrollment_id' => $enrollmentId,
        'violation_id' => $violation->id,
        'transaction_type' => 'violation',
        'points_change' => $intendedPoints, 
        'intended_points' => $intendedPoints,
        'points_before' => 100,
        'points_after' => 100 + $intendedPoints,
        'processed_by' => $userId,
    ]);
}

test('it issues 30-point letter when violation hits 30', function () {
    simulateViolation($this->studentEnrollment->id, $this->group->id, -30, $this->user->id);

    $this->service->checkProgressiveThresholds($this->studentEnrollment->id, $this->group->id);

    $letters = ViolationLetter::where('student_enrollment_id', $this->studentEnrollment->id)->get();
    
    expect($letters)->toHaveCount(1);
    expect($letters->first()->cumulative_points_when_sent)->toBe(30);
});

test('it does not regress to lower thresholds if skipped to higher one', function () {
    // 1. Skip straight to a 60 point violation (crossing the 50-point threshold)
    simulateViolation($this->studentEnrollment->id, $this->group->id, -60, $this->user->id);
    $this->service->checkProgressiveThresholds($this->studentEnrollment->id, $this->group->id);

    $letters = ViolationLetter::where('student_enrollment_id', $this->studentEnrollment->id)->get();
    expect($letters)->toHaveCount(1);
    
    $threshold50 = PointThreshold::where('cumulative_points_threshold', 50)->first();
    expect($letters->first()->point_threshold_id)->toBe($threshold50->id);

    // 2. Add an additional small violation (Total 65)
    simulateViolation($this->studentEnrollment->id, $this->group->id, -5, $this->user->id);
    $this->service->checkProgressiveThresholds($this->studentEnrollment->id, $this->group->id);

    // It should STILL only have 1 letter, because it shouldn't "go back" to issue 30
    $lettersAfter = ViolationLetter::where('student_enrollment_id', $this->studentEnrollment->id)->get();
    expect($lettersAfter)->toHaveCount(1);
});

test('it issues 70-point letter when jumping from 50 to 75', function () {
    // 1. Reach 50 points
    simulateViolation($this->studentEnrollment->id, $this->group->id, -50, $this->user->id);
    $this->service->checkProgressiveThresholds($this->studentEnrollment->id, $this->group->id);
    
    expect(ViolationLetter::count())->toBe(1);

    // 2. Jump to 75 total points (+25)
    simulateViolation($this->studentEnrollment->id, $this->group->id, -25, $this->user->id);
    $this->service->checkProgressiveThresholds($this->studentEnrollment->id, $this->group->id);

    $letters = ViolationLetter::where('student_enrollment_id', $this->studentEnrollment->id)
        ->orderBy('cumulative_points_when_sent')
        ->get();
    
    expect($letters)->toHaveCount(2); // One for 50, one for 70
    expect($letters[0]->cumulative_points_when_sent)->toBe(50);
    expect($letters[1]->cumulative_points_when_sent)->toBe(75);
});
