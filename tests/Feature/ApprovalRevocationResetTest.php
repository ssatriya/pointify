<?php

use App\Enums\ApprovalStatus;
use App\Enums\TransactionType;
use App\Models\AcademicYear;
use App\Models\PointThreshold;
use App\Models\PointTransaction;
use App\Models\PointTransactionGroup;
use App\Models\Reward;
use App\Models\RewardType;
use App\Models\StudentEnrollment;
use App\Models\User;
use App\Models\Violation;
use App\Models\ViolationType;
use App\Services\RewardService;
use App\Services\ViolationApprovalService;
use App\Services\ViolationService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);

    $this->academicYear = AcademicYear::factory()->create(['created_by' => $this->user->id]);

    $this->studentEnrollment = StudentEnrollment::factory()->create([
        'academic_year_id' => $this->academicYear->id,
        'initial_points' => 100,
        'created_by' => $this->user->id,
    ]);

    $this->violationType = ViolationType::factory()->create([
        'points' => 20,
        'created_by' => $this->user->id,
    ]);

    PointThreshold::factory()->create([
        'cumulative_points_threshold' => 50,
        'academic_year_id' => $this->academicYear->id,
        'created_by' => $this->user->id,
    ]);
});

// --- APPROVAL TESTS ---

test('approving a violation deducts points and creates transaction', function () {
    $violation = Violation::factory()->create([
        'student_enrollment_id' => $this->studentEnrollment->id,
        'violation_type_id' => $this->violationType->id,
        'approval_status' => ApprovalStatus::PENDING->value,
        'created_by' => $this->user->id,
    ]);

    $service = app(ViolationApprovalService::class);
    $service->update(['status' => ApprovalStatus::APPROVED->value], $violation, $this->user->id);

    $violation->refresh();
    expect($violation->approval_status)->toBe(ApprovalStatus::APPROVED->value);

    $transaction = PointTransaction::where('violation_id', $violation->id)->first();
    expect($transaction->points_change)->toBe(-20);
    expect($transaction->points_before)->toBe(100);
    expect($transaction->points_after)->toBe(80);
});

test('approving an already approved violation does nothing', function () {
    $violation = Violation::factory()->create([
        'student_enrollment_id' => $this->studentEnrollment->id,
        'violation_type_id' => $this->violationType->id,
        'approval_status' => ApprovalStatus::APPROVED->value,
        'approved_by' => $this->user->id,
        'approved_at' => now(),
        'created_by' => $this->user->id,
    ]);

    $service = app(ViolationApprovalService::class);
    $service->update(['status' => ApprovalStatus::APPROVED->value], $violation, $this->user->id);

    expect(PointTransaction::where('violation_id', $violation->id)->count())->toBe(0);
});

test('rejecting a violation sets status without creating transaction', function () {
    $violation = Violation::factory()->create([
        'student_enrollment_id' => $this->studentEnrollment->id,
        'violation_type_id' => $this->violationType->id,
        'approval_status' => ApprovalStatus::PENDING->value,
        'created_by' => $this->user->id,
    ]);

    $service = app(ViolationApprovalService::class);
    $service->update([
        'status' => ApprovalStatus::REJECTED->value,
        'rejection_reason' => 'Invalid evidence',
    ], $violation, $this->user->id);

    $violation->refresh();
    expect($violation->approval_status)->toBe(ApprovalStatus::REJECTED->value);
    expect($violation->rejection_reason)->toBe('Invalid evidence');
    expect(PointTransaction::where('violation_id', $violation->id)->count())->toBe(0);
});

// --- RESET TESTS ---

test('points reset when student reaches zero', function () {
    $violationType = ViolationType::factory()->create([
        'points' => 100,
        'created_by' => $this->user->id,
    ]);

    $violation = Violation::factory()->create([
        'student_enrollment_id' => $this->studentEnrollment->id,
        'violation_type_id' => $violationType->id,
        'approval_status' => ApprovalStatus::PENDING->value,
        'created_by' => $this->user->id,
    ]);

    $service = app(ViolationApprovalService::class);
    $service->update(['status' => ApprovalStatus::APPROVED->value], $violation, $this->user->id);

    $transactions = PointTransaction::where('student_enrollment_id', $this->studentEnrollment->id)
        ->orderBy('created_at')
        ->get();

    // Should have violation transaction + reset transaction
    expect($transactions)->toHaveCount(2);
    expect($transactions[0]->transaction_type)->toBe(TransactionType::VIOLATION->value);
    expect($transactions[0]->points_after)->toBe(0);
    expect($transactions[1]->transaction_type)->toBe(TransactionType::RESET->value);
    expect($transactions[1]->points_change)->toBe(100);
});

test('reset closes the transaction group', function () {
    $violationType = ViolationType::factory()->create([
        'points' => 100,
        'created_by' => $this->user->id,
    ]);

    $violation = Violation::factory()->create([
        'student_enrollment_id' => $this->studentEnrollment->id,
        'violation_type_id' => $violationType->id,
        'approval_status' => ApprovalStatus::PENDING->value,
        'created_by' => $this->user->id,
    ]);

    $service = app(ViolationApprovalService::class);
    $service->update(['status' => ApprovalStatus::APPROVED->value], $violation, $this->user->id);

    $group = PointTransactionGroup::where('student_enrollment_id', $this->studentEnrollment->id)->first();
    expect($group->is_closed)->toBeTruthy();
    expect($group->closed_at)->not->toBeNull();
});

// --- VIOLATION REVOCATION TESTS ---

test('revoking a violation restores points', function () {
    // First approve the violation
    $violation = Violation::factory()->create([
        'student_enrollment_id' => $this->studentEnrollment->id,
        'violation_type_id' => $this->violationType->id,
        'approval_status' => ApprovalStatus::PENDING->value,
        'created_by' => $this->user->id,
    ]);

    $approvalService = app(ViolationApprovalService::class);
    $approvalService->update(['status' => ApprovalStatus::APPROVED->value], $violation, $this->user->id);

    // Now revoke
    $violation->refresh();
    $violationService = app(ViolationService::class);
    $violationService->revokeViolation($violation, ['revoke_reason' => 'Wrong student']);

    $violation->refresh();
    expect($violation->approval_status)->toBe(ApprovalStatus::REVOKED->value);
    expect($violation->revoked_reason)->toBe('Wrong student');

    // Points should be restored: 100 - 20 + 20 = 100
    $this->studentEnrollment->load('pointTransactions');
    expect($this->studentEnrollment->currentPoints)->toBe(100);
});

test('revoking a violation that triggered reset also reverses the reset', function () {
    $violationType = ViolationType::factory()->create([
        'points' => 100,
        'created_by' => $this->user->id,
    ]);

    $violation = Violation::factory()->create([
        'student_enrollment_id' => $this->studentEnrollment->id,
        'violation_type_id' => $violationType->id,
        'approval_status' => ApprovalStatus::PENDING->value,
        'created_by' => $this->user->id,
    ]);

    // Approve (triggers reset)
    $approvalService = app(ViolationApprovalService::class);
    $approvalService->update(['status' => ApprovalStatus::APPROVED->value], $violation, $this->user->id);

    // Revoke
    $violation->refresh();
    $violationService = app(ViolationService::class);
    $violationService->revokeViolation($violation, ['revoke_reason' => 'Error']);

    // Points: 100 -100(violation) +100(reset) +100(revoke violation) -100(revoke reset) = 100
    $this->studentEnrollment->load('pointTransactions');
    expect($this->studentEnrollment->currentPoints)->toBe(100);
});

// --- REWARD REVOCATION TESTS ---

test('revoking a reward subtracts the rewarded points', function () {
    $rewardType = RewardType::create([
        'code' => 'RW01',
        'description' => 'Good behavior',
        'points' => 5,
        'is_active' => true,
        'created_by' => $this->user->id,
    ]);

    $rewardService = app(RewardService::class);
    $reward = $rewardService->create([
        'reward_type_id' => $rewardType->id,
        'notes' => 'Test reward',
    ], $this->studentEnrollment);

    // Points should be 105 after reward
    $this->studentEnrollment->load('pointTransactions');
    expect($this->studentEnrollment->currentPoints)->toBe(105);

    // Revoke
    $rewardService->revokeReward($reward, ['revoke_reason' => 'Mistake']);

    // Points should be back to 100
    $this->studentEnrollment->refresh()->load('pointTransactions');
    expect($this->studentEnrollment->currentPoints)->toBe(100);
    expect($reward->fresh()->approval_status)->toBe(ApprovalStatus::REVOKED->value);
});
