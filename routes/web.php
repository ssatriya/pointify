<?php

use App\Http\Controllers\AcademicYear\AcademicYearController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])
    ->prefix('dashboard')
    ->name('dashboard.')
    ->group(function () {
        Route::inertia('/', 'dashboard/dashboard')->name('index');

        Route::prefix('academic-years')->name('academic-years.')->group(function () {
            Route::get('/', [AcademicYearController::class, 'index'])->name('index');
            Route::post('/', [AcademicYearController::class, 'store'])->name('store');
            Route::get('/{academicYear}', [AcademicYearController::class, 'show'])->name('show');
            Route::put('/{academicYear}', [AcademicYearController::class, 'update'])->name('update');
            Route::delete('/{academicYear}', [AcademicYearController::class, 'destroy'])->name('destroy');
        });
    });