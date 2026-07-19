<?php

use App\Actions\Reward\CreateReward;
use App\Actions\Reward\RevokeReward;
use App\Actions\Violation\RevokeViolation;
use App\Actions\ViolationApproval\ApproveViolation;
use App\Enums\ApprovalStatus;
use App\Enums\TransactionType;
use App\Models\AcademicYear;
use App\Models\PointThreshold;
use App\Models\PointTransaction;
use App\Models\PointTransactionGroup;
use App\Models\RewardType;
use App\Models\StudentEnrollment;
use App\Models\User;
use App\Models\Violation;
use App\Models\ViolationType;

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

    $act3 = app(ApproveViolation::class);
    $act3->handle(['status' => ApprovalStatus::APPROVED->value], $violation, $this->user->id);

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

    $act = app(ApproveViolation::class);
    $act->handle(['status' => ApprovalStatus::APPROVED->value], $violation, $this->user->id);

    expect(PointTransaction::where('violation_id', $violation->id)->count())->toBe(0);
});

test('rejecting a violation sets status without creating transaction', function () {
    $violation = Violation::factory()->create([
        'student_enrollment_id' => $this->studentEnrollment->id,
        'violation_type_id' => $this->violationType->id,
        'approval_status' => ApprovalStatus::PENDING->value,
        'created_by' => $this->user->id,
    ]);

    $action = app(ApproveViolation::class);
    $action->handle([
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

    $act4 = app(ApproveViolation::class);
    $act4->handle(['status' => ApprovalStatus::APPROVED->value], $violation, $this->user->id);

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

    $act2 = app(ApproveViolation::class);
    $act2->handle(['status' => ApprovalStatus::APPROVED->value], $violation, $this->user->id);

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

    $approvalAction = app(ApproveViolation::class);
    $approvalAction->handle(['status' => ApprovalStatus::APPROVED->value], $violation, $this->user->id);

    // Now revoke
    $violation->refresh();
    $revokeAction = app(RevokeViolation::class);
    $revokeAction->handle($violation, ['revoke_reason' => 'Wrong student']);

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
    $approvalAction = app(ApproveViolation::class);
    $approvalAction->handle(['status' => ApprovalStatus::APPROVED->value], $violation, $this->user->id);

    // Revoke
    $violation->refresh();
    $revokeAction = app(RevokeViolation::class);
    $revokeAction->handle($violation, ['revoke_reason' => 'Error']);

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

    $createReward = app(CreateReward::class);
    $reward = $createReward->handle([
        'reward_type_id' => $rewardType->id,
        'notes' => 'Test reward',
    ], $this->studentEnrollment);

    // Points should be 105 after reward
    $this->studentEnrollment->load('pointTransactions');
    expect($this->studentEnrollment->currentPoints)->toBe(105);

    // Revoke
    $revokeReward = app(RevokeReward::class);
    $revokeReward->handle($reward, ['revoke_reason' => 'Mistake']);

    // Points should be back to 100
    $this->studentEnrollment->refresh()->load('pointTransactions');
    expect($this->studentEnrollment->currentPoints)->toBe(100);
    expect($reward->fresh()->approval_status)->toBe(ApprovalStatus::REVOKED->value);
});

test('revoking a violation reopens its own group and merges newer open groups', function () {
    // Group A: violation with 100 points → triggers reset → Group A closed
    $violationA = Violation::factory()->create([
        'student_enrollment_id' => $this->studentEnrollment->id,
        'violation_type_id' => ViolationType::factory()->create(['points' => 100, 'created_by' => $this->user->id])->id,
        'approval_status' => ApprovalStatus::PENDING->value,
        'created_by' => $this->user->id,
    ]);
    app(ApproveViolation::class)->handle(['status' => ApprovalStatus::APPROVED->value], $violationA, $this->user->id);
    $violationA->refresh();
    $groupA = PointTransactionGroup::find($violationA->point_transaction_group_id);

    // Group B: small violation → no reset → Group B stays open
    $violationB = Violation::factory()->create([
        'student_enrollment_id' => $this->studentEnrollment->id,
        'violation_type_id' => ViolationType::factory()->create(['points' => 5, 'created_by' => $this->user->id])->id,
        'approval_status' => ApprovalStatus::PENDING->value,
        'created_by' => $this->user->id,
    ]);
    app(ApproveViolation::class)->handle(['status' => ApprovalStatus::APPROVED->value], $violationB, $this->user->id);
    $violationB->refresh();
    $groupB = PointTransactionGroup::find($violationB->point_transaction_group_id);

    expect($groupA->is_closed)->toBe(1);
    expect($groupB->is_closed)->toBe(0);
    expect($groupB->sequence)->toBeGreaterThan($groupA->sequence);

    // Revoke violation A → Group A reopened, Group B merged into A and deleted
    $violationA->refresh();
    app(RevokeViolation::class)->handle($violationA, ['revoke_reason' => 'Error']);

    $groupA->refresh();
    expect($groupA->is_closed)->toBe(0);
    expect($violationB->refresh()->point_transaction_group_id)->toBe($groupA->id);
    expect(PointTransactionGroup::find($groupB->id))->toBeNull();
});
