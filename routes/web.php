<?php

use App\Http\Controllers\AcademicYear\AcademicYearController;
use App\Http\Controllers\PointThresholdController;
use App\Http\Controllers\RewardTypeController;
use App\Http\Controllers\SearchVocationalProgramController;
use App\Http\Controllers\StudentClassController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\ViolationTypeController;
use App\Http\Controllers\VocationalProgramController;
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
            Route::get('/search', \App\Http\Controllers\SearchAcademicYearController::class)->name('search');
            Route::get('/{academicYear}', [AcademicYearController::class, 'show'])->name('show');
            Route::put('/{academicYear}', [AcademicYearController::class, 'update'])->name('update');
            Route::delete('/{academicYear}', [AcademicYearController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('vocational-programs')->name('vocational-programs.')->group(function () {
            Route::get('/', [VocationalProgramController::class, 'index'])->name('index');
            Route::post('/', [VocationalProgramController::class, 'store'])->name('store');
            Route::get('/{vocationalProgram}', [VocationalProgramController::class, 'show'])->name('show');
            Route::put('/{vocationalProgram}', [VocationalProgramController::class, 'update'])->name('update');
            Route::delete('/{vocationalProgram}', [VocationalProgramController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('classes')->name('student-classes.')->group(function () {
            Route::get('/', [StudentClassController::class, 'index'])->name('index');
            Route::post('/', [StudentClassController::class, 'store'])->name('store');

            Route::get('/search', SearchVocationalProgramController::class)->name('search');

            Route::get('/{studentClass}', [StudentClassController::class, 'show'])->name('show');
            Route::put('/{studentClass}', [StudentClassController::class, 'update'])->name('update');
            Route::delete('/{studentClass}', [StudentClassController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('students')->name('students.')->group(function () {
            Route::get('/', [StudentController::class, 'index'])->name('index');
            Route::post('/', [StudentController::class, 'store'])->name('store');
            Route::get('/{student}', [StudentController::class, 'show'])->name('show');
            Route::put('/{student}', [StudentController::class, 'update'])->name('update');
            Route::delete('/{student}', [StudentController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('point-thresholds')->name('point-thresholds.')->group(function () {
            Route::get('/', [PointThresholdController::class, 'index'])->name('index');
            Route::post('/', [PointThresholdController::class, 'store'])->name('store');
            Route::get('/{pointThreshold}', [PointThresholdController::class, 'show'])->name('show');
            Route::put('/{pointThreshold}', [PointThresholdController::class, 'update'])->name('update');
        });

        Route::prefix('violation-types')->name('violation-types.')->group(function () {
            Route::get('/', [ViolationTypeController::class, 'index'])->name('index');
            Route::post('/', [ViolationTypeController::class, 'store'])->name('store');
            Route::get('/{violationType}', [ViolationTypeController::class, 'show'])->name('show');
            Route::put('/{violationType}', [ViolationTypeController::class, 'update'])->name('update');
            Route::delete('/{violationType}', [ViolationTypeController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('reward-types')->name('reward-types.')->group(function () {
            Route::get('/', [RewardTypeController::class, 'index'])->name('index');
            Route::post('/', [RewardTypeController::class, 'store'])->name('store');
            Route::get('/{rewardType}', [RewardTypeController::class, 'show'])->name('show');
            Route::put('/{rewardType}', [RewardTypeController::class, 'update'])->name('update');
            Route::delete('/{rewardType}', [RewardTypeController::class, 'destroy'])->name('destroy');
        });
    });