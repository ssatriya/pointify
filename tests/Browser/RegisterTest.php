<?php

declare(strict_types=1);

use App\Models\User;
use Database\Seeders\DatabaseSeeder;

beforeEach(function (): void {
    $this->seed(DatabaseSeeder::class);
});

it('validates the password confirmation', function (): void {
    $page = visit('/register');

    $page->fill('name', 'Test User')
        ->fill('email', 'test@example.com')
        ->fill('password', 'password')
        ->fill('password_confirmation', 'different-password')
        ->click('@register-user-button')
        ->assertPresent('@input-error')
        ->assertPathIs('/register');

    expect(User::query()->count())->toBe(0);
});

it('validates a unique email', function (): void {
    User::factory()->create(['email' => 'test@example.com']);

    $page = visit('/register');

    $page->fill('name', 'Test User')
        ->fill('email', 'test@example.com')
        ->fill('password', 'password')
        ->fill('password_confirmation', 'password')
        ->click('@register-user-button')
        ->assertPresent('@input-error')
        ->assertPathIs('/register');

    expect(User::query()->count())->toBe(1);
});

it('registers a new account', function (): void {
    $page = visit('/register');

    $page->fill('name', 'Test User')
        ->fill('email', 'test@example.com')
        ->fill('password', 'password')
        ->fill('password_confirmation', 'password')
        ->click('@register-user-button');

    expect(User::query()->where('email', 'test@example.com')->exists())->toBeTrue();
});

it('redirected into verification email page', function (): void {
    $page = visit('/register');

    $page->fill('name', 'Test User')
        ->fill('email', 'test@example.com')
        ->fill('password', 'password')
        ->fill('password_confirmation', 'password')
        ->click('@register-user-button');

    $page->assertPathIs('/email/verify')->assertSee('Kirim ulang email verifikasi');
});
