<?php

use App\Http\Controllers\AcademicYear\AcademicYearController;
use App\Http\Controllers\ActiveAcademicYearController;
use App\Http\Controllers\PointThresholdController;
use App\Http\Controllers\RevokeRewardController;
use App\Http\Controllers\RevokeViolationController;
use App\Http\Controllers\RewardController;
use App\Http\Controllers\RewardTypeController;
use App\Http\Controllers\SearchAcademicYearController;
use App\Http\Controllers\SearchUnenrolledStudentController;
use App\Http\Controllers\SearchRewardTypeController;
use App\Http\Controllers\SearchViolationTypeController;
use App\Http\Controllers\SearchVocationalProgramController;
use App\Http\Controllers\ReorderStudentClassController;
use App\Http\Controllers\SearchStudentEnrollmentController;
use App\Http\Controllers\StudentClassController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentImportController;
use App\Http\Controllers\StudentEnrollmentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ViolationApprovalController;
use App\Http\Controllers\ViolationController;
use App\Http\Controllers\ViolationTypeController;
use App\Http\Controllers\ViolationLetterController;
use App\Http\Controllers\VocationalProgramController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

require __DIR__ . '/settings.php';

Route::middleware(['auth', 'verified'])
    ->prefix('dashboard')
    ->name('dashboard.')
    ->group(function () {
        Route::inertia('/', 'dashboard/dashboard')->name('index');

        Route::prefix('academic-years')->name('academic-years.')->group(function () {
            Route::get('/active', ActiveAcademicYearController::class)->name('active');
            Route::get('/', [AcademicYearController::class, 'index'])->name('index');
            Route::post('/', [AcademicYearController::class, 'store'])->name('store');
            Route::get('/search', SearchAcademicYearController::class)->name('search');
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
            Route::put('/reorder', ReorderStudentClassController::class)->name('reorder');

            Route::get('/search', SearchVocationalProgramController::class)->name('search');

            Route::get('/{studentClass}', [StudentClassController::class, 'show'])->name('show');
            Route::put('/{studentClass}', [StudentClassController::class, 'update'])->name('update');
            Route::delete('/{studentClass}', [StudentClassController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('student-enrollments')->name('student-enrollments.')->controller(StudentEnrollmentController::class)->group(function () {
            Route::get('/search', SearchStudentEnrollmentController::class)->name('search');

            Route::get('/{studentEnrollment}', 'show')->name('show')->whereNumber('studentEnrollment');
            Route::put('/{studentEnrollment}', 'update')->name('update')->whereNumber('studentEnrollment');
            Route::delete('/{studentEnrollment}', 'destroy')->name('destroy')->whereNumber('studentEnrollment');
            Route::get('/{studentEnrollment}/sequence/{sequence}', ViolationLetterController::class)->name('generateLetter');

            Route::prefix('{studentClass:slug}')->name('class.')->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('/', 'store')->name('store');

                Route::get('/reports', 'reports')->name('reports');

                Route::get('/{studentEnrollment}', 'studentByEnrollment')->name('student-detail');
            });
        });

        //         Route::prefix('letter')->group(function () {
        //     Route::get('/{student_enrollment}/{sequence}', [ViolationLetterController::class, 'generate']);
        // });
    
        Route::prefix('students')->name('students.')->group(function () {
            Route::get('/select-unenrolled/{vocational_program}', SearchUnenrolledStudentController::class)->name('selectUnenrolled');
            Route::get('/download-template', [StudentImportController::class, 'downloadTemplate'])->name('download-template');
            Route::post('/import', [StudentImportController::class, 'import'])->name('import');

            Route::get('/', [StudentController::class, 'index'])->name('index');
            Route::post('/', [StudentController::class, 'store'])->name('store');
            Route::get('/{student}', [StudentController::class, 'show'])->name('show');
            Route::put('/{student}', [StudentController::class, 'update'])->name('update');
            Route::delete('/{student}', [StudentController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/', [UserController::class, 'index'])->name('index');
            Route::get('/{user}', [UserController::class, 'show'])->name('show');
            Route::get('/{user}/edit', [UserController::class, 'edit'])->name('edit');
            Route::put('/{user}', [UserController::class, 'update'])->name('update');
        });

        Route::prefix('point-thresholds')->name('point-thresholds.')->group(function () {
            Route::get('/', [PointThresholdController::class, 'index'])->name('index');
            Route::post('/', [PointThresholdController::class, 'store'])->name('store');
            Route::get('/{pointThreshold}', [PointThresholdController::class, 'show'])->name('show');
            Route::put('/{pointThreshold}', [PointThresholdController::class, 'update'])->name('update');
        });

        Route::prefix('violation-types')->name('violation-types.')->group(function () {
            Route::get('/search', SearchViolationTypeController::class)->name('search');

            Route::get('/', [ViolationTypeController::class, 'index'])->name('index');
            Route::post('/', [ViolationTypeController::class, 'store'])->name('store');
            Route::get('/{violationType}', [ViolationTypeController::class, 'show'])->name('show');
            Route::put('/{violationType}', [ViolationTypeController::class, 'update'])->name('update');
            Route::delete('/{violationType}', [ViolationTypeController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('reward-types')->name('reward-types.')->group(function () {
            Route::get('/search', SearchRewardTypeController::class)->name('search');

            Route::get('/', [RewardTypeController::class, 'index'])->name('index');
            Route::post('/', [RewardTypeController::class, 'store'])->name('store');
            Route::get('/{rewardType}', [RewardTypeController::class, 'show'])->name('show');
            Route::put('/{rewardType}', [RewardTypeController::class, 'update'])->name('update');
            Route::delete('/{rewardType}', [RewardTypeController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('violations')->name('violations.')->group(function () {
            Route::get('/approval', [ViolationApprovalController::class, 'index'])->name('approval.index');
            Route::get('/approval/{violation}', [ViolationApprovalController::class, 'show'])->name('approval.show');
            Route::put('/approval/{violation}', [ViolationApprovalController::class, 'update'])->name('approval.update');
            Route::put('/revoke/{violation}', RevokeViolationController::class)->name('revoke');

            Route::post('/', ViolationController::class)->name('store');
        });

        Route::prefix('rewards')->name('rewards.')->group(function () {
            Route::post('/revoke/{reward}', RevokeRewardController::class)->name('revoke');

            Route::post('/', RewardController::class)->name('store');
        });


    });