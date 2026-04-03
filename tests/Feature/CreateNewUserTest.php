<?php

use App\Actions\Fortify\CreateNewUser;
use App\Models\User;
use App\Enums\Role;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(RoleAndPermissionSeeder::class);
});

test('first registered user is assigned super-admin role', function () {
    $creator = new CreateNewUser();

    $user = $creator->create([
        'name' => 'First User',
        'email' => 'first@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    expect($user->hasRole(Role::SUPER_ADMIN->value))->toBeTrue();
    expect(User::count())->toBe(1);
});

test('subsequent registered users are assigned duty-teacher role', function () {
    $creator = new CreateNewUser();

    // Create first user
    $creator->create([
        'name' => 'First User',
        'email' => 'first@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    // Create second user
    $user2 = $creator->create([
        'name' => 'Second User',
        'email' => 'second@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    expect($user2->hasRole(Role::DUTY_TEACHER->value))->toBeTrue();
    expect($user2->hasRole(Role::SUPER_ADMIN->value))->toBeFalse();
    expect(User::count())->toBe(2);
});
