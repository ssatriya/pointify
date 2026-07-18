<?php

use App\Actions\AcademicYear\CreateAcademicYear;
use App\Models\User;

test('create a first academic year with is_active flag as true', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $service = app(CreateAcademicYear::class);
    $data = [
        'name' => '2024/2025',
        'start_date' => '2024-01-01',
        'end_date' => '2025-01-01',
        'is_active' => true,
        'created_by' => $user->id,
    ];

    $academicYear = $service->handle($data);

    expect($academicYear->hasAttribute('is_active'))->toBeTrue();
    expect($academicYear->name)->toBe('2024/2025');
    $this->assertDatabaseHas('academic_years', [
        'id' => $academicYear->id,
        'is_active' => true,
        'created_by' => $user->id,
    ]);
});

test('example', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
