<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->name('dashboard.')->group(function () {
    Route::inertia('dashboard', 'dashboard/dashboard')->name('index');
});