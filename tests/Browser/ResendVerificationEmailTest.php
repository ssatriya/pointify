<?php

declare(strict_types=1);

use Database\Seeders\DatabaseSeeder;

beforeEach(function (): void {
    $this->seed(DatabaseSeeder::class);
});

it('send new verification email', function(): void {
    $page = visit('/register');

    $page->fill('name', 'Test User')
        ->fill('email', 'test@example.com')
        ->fill('password', 'password')
        ->fill('password_confirmation', 'password')
        ->click('@register-user-button');

    $page->assertPathIs('/email/verify')->assertSee('Kirim ulang email verifikasi');

    $page->click('@resend-email-verification');

    $page->assertSee('A new verification link has been sent to the email address you provided during registration.');
});