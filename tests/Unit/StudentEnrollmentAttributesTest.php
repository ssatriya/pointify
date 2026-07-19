<?php

use App\Models\PointTransaction;
use App\Models\StudentEnrollment;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);

    $this->enrollment = StudentEnrollment::factory()->create([
        'initial_points' => 100,
        'created_by' => $this->user->id,
    ]);
});

it('computes currentPoints from collection when relationship is loaded', function () {
    PointTransaction::factory()->create([
        'student_enrollment_id' => $this->enrollment->id,
        'transaction_type' => 'violation',
        'points_change' => -20,
        'processed_by' => $this->user->id,
    ]);
    PointTransaction::factory()->create([
        'student_enrollment_id' => $this->enrollment->id,
        'transaction_type' => 'reward',
        'points_change' => 10,
        'processed_by' => $this->user->id,
    ]);

    $this->enrollment->load('pointTransactions');

    expect($this->enrollment->currentPoints)->toBe(90);
});

it('computes currentPoints from DB when relationship is not loaded', function () {
    PointTransaction::factory()->create([
        'student_enrollment_id' => $this->enrollment->id,
        'transaction_type' => 'violation',
        'points_change' => -20,
        'processed_by' => $this->user->id,
    ]);

    expect($this->enrollment->relationLoaded('pointTransactions'))->toBeFalse();
    expect($this->enrollment->currentPoints)->toBe(80);
});

it('computes totalViolationsPoints correctly from both DB and collection', function () {
    PointTransaction::factory()->create([
        'student_enrollment_id' => $this->enrollment->id,
        'transaction_type' => 'violation',
        'points_change' => -20,
        'processed_by' => $this->user->id,
    ]);
    PointTransaction::factory()->create([
        'student_enrollment_id' => $this->enrollment->id,
        'transaction_type' => 'violation',
        'points_change' => -10,
        'processed_by' => $this->user->id,
    ]);
    PointTransaction::factory()->create([
        'student_enrollment_id' => $this->enrollment->id,
        'transaction_type' => 'reward',
        'points_change' => 15,
        'processed_by' => $this->user->id,
    ]);

    // From DB (not loaded)
    expect($this->enrollment->totalViolationsPoints)->toBe(-30);

    // From collection (loaded)
    $this->enrollment->load('pointTransactions');
    expect($this->enrollment->totalViolationsPoints)->toBe(-30);
});

it('computes totalRewardsPoints correctly from both DB and collection', function () {
    PointTransaction::factory()->create([
        'student_enrollment_id' => $this->enrollment->id,
        'transaction_type' => 'reward',
        'points_change' => 15,
        'processed_by' => $this->user->id,
    ]);
    PointTransaction::factory()->create([
        'student_enrollment_id' => $this->enrollment->id,
        'transaction_type' => 'reward',
        'points_change' => 5,
        'processed_by' => $this->user->id,
    ]);
    PointTransaction::factory()->create([
        'student_enrollment_id' => $this->enrollment->id,
        'transaction_type' => 'violation',
        'points_change' => -20,
        'processed_by' => $this->user->id,
    ]);

    expect($this->enrollment->totalRewardsPoints)->toBe(20);

    $this->enrollment->load('pointTransactions');
    expect($this->enrollment->totalRewardsPoints)->toBe(20);
});

it('computes resetCount correctly from both DB and collection', function () {
    PointTransaction::factory()->create([
        'student_enrollment_id' => $this->enrollment->id,
        'transaction_type' => 'reset',
        'points_change' => 100,
        'processed_by' => $this->user->id,
    ]);
    PointTransaction::factory()->create([
        'student_enrollment_id' => $this->enrollment->id,
        'transaction_type' => 'reset',
        'points_change' => 100,
        'processed_by' => $this->user->id,
    ]);

    expect($this->enrollment->resetCount)->toBe(2);

    $this->enrollment->load('pointTransactions');
    expect($this->enrollment->resetCount)->toBe(2);
});
