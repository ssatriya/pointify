<?php

use App\Http\Controllers\AcademicYear\AcademicYearController;
use App\Http\Controllers\SearchVocationalProgramController;
use App\Http\Controllers\StudentClassController;
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
    });