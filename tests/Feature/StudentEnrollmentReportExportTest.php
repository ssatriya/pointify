<?php

use App\Exports\StudentEnrollmentReportExport;
use App\Models\AcademicYear;
use App\Models\PointTransaction;
use App\Models\StudentClass;
use App\Models\StudentEnrollment;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);

    $this->academicYear = AcademicYear::factory()->create(['created_by' => $this->user->id, 'is_active' => true]);
    $this->studentClass = StudentClass::factory()->create(['created_by' => $this->user->id]);
});

it('has correct headings', function () {
    $export = new StudentEnrollmentReportExport($this->studentClass->id);

    expect($export->headings())->toBe([
        'No',
        'Nama Siswa',
        'Poin Awal',
        'Total Dikurangkan',
        'Jumlah Reset',
        'Poin Saat Ini',
    ]);
});

it('exports student with violations and no resets', function () {
    $enrollment = StudentEnrollment::factory()->create([
        'student_class_id' => $this->studentClass->id,
        'academic_year_id' => $this->academicYear->id,
        'initial_points' => 100,
        'created_by' => $this->user->id,
    ]);

    PointTransaction::factory()->create([
        'student_enrollment_id' => $enrollment->id,
        'transaction_type' => 'violation',
        'points_change' => -20,
        'processed_by' => $this->user->id,
    ]);
    PointTransaction::factory()->create([
        'student_enrollment_id' => $enrollment->id,
        'transaction_type' => 'violation',
        'points_change' => -10,
        'processed_by' => $this->user->id,
    ]);

    $export = new StudentEnrollmentReportExport($this->studentClass->id);
    $collection = $export->collection();

    expect($collection)->toHaveCount(1);

    $mapped = $export->map($collection->first());
    expect($mapped[0])->toBe(1); // No
    expect($mapped[2])->toBe(100); // Poin Awal
    expect($mapped[3])->toBe(-30); // Total Dikurangkan (negative)
    expect($mapped[4])->toBe(0); // Jumlah Reset
    expect($mapped[5])->toBe(70); // Poin Saat Ini
});

it('exports student with a reset', function () {
    $enrollment = StudentEnrollment::factory()->create([
        'student_class_id' => $this->studentClass->id,
        'academic_year_id' => $this->academicYear->id,
        'initial_points' => 100,
        'created_by' => $this->user->id,
    ]);

    // Violations that trigger reset
    PointTransaction::factory()->create([
        'student_enrollment_id' => $enrollment->id,
        'transaction_type' => 'violation',
        'points_change' => -80,
        'processed_by' => $this->user->id,
    ]);
    PointTransaction::factory()->create([
        'student_enrollment_id' => $enrollment->id,
        'transaction_type' => 'violation',
        'points_change' => -20,
        'processed_by' => $this->user->id,
    ]);
    PointTransaction::factory()->create([
        'student_enrollment_id' => $enrollment->id,
        'transaction_type' => 'reset',
        'points_change' => 100,
        'processed_by' => $this->user->id,
    ]);
    // Violation after reset
    PointTransaction::factory()->create([
        'student_enrollment_id' => $enrollment->id,
        'transaction_type' => 'violation',
        'points_change' => -15,
        'processed_by' => $this->user->id,
    ]);

    $export = new StudentEnrollmentReportExport($this->studentClass->id);
    $collection = $export->collection();

    expect($collection)->toHaveCount(1);

    $mapped = $export->map($collection->first());
    expect($mapped[2])->toBe(100); // Poin Awal
    expect($mapped[3])->toBe(-15); // Total Dikurangkan: 100 - 85 = 15, negative
    expect($mapped[4])->toBe(1); // Jumlah Reset
    expect($mapped[5])->toBe(85); // Poin Saat Ini: 100 - 100 + 100 - 15 = 85
});

it('exports multiple students', function () {
    $enrollment1 = StudentEnrollment::factory()->create([
        'student_class_id' => $this->studentClass->id,
        'academic_year_id' => $this->academicYear->id,
        'initial_points' => 100,
        'created_by' => $this->user->id,
    ]);
    $enrollment2 = StudentEnrollment::factory()->create([
        'student_class_id' => $this->studentClass->id,
        'academic_year_id' => $this->academicYear->id,
        'initial_points' => 100,
        'created_by' => $this->user->id,
    ]);

    PointTransaction::factory()->create([
        'student_enrollment_id' => $enrollment1->id,
        'transaction_type' => 'violation',
        'points_change' => -10,
        'processed_by' => $this->user->id,
    ]);
    PointTransaction::factory()->create([
        'student_enrollment_id' => $enrollment2->id,
        'transaction_type' => 'reward',
        'points_change' => 5,
        'processed_by' => $this->user->id,
    ]);

    $export = new StudentEnrollmentReportExport($this->studentClass->id);
    $rows = $export->collection()->toArray();

    expect($rows)->toHaveCount(2);
});

it('excludes enrollments from inactive academic years', function () {
    $inactiveYear = AcademicYear::factory()->create(['created_by' => $this->user->id, 'is_active' => false]);

    StudentEnrollment::factory()->create([
        'student_class_id' => $this->studentClass->id,
        'academic_year_id' => $this->academicYear->id,
        'initial_points' => 100,
        'created_by' => $this->user->id,
    ]);
    StudentEnrollment::factory()->create([
        'student_class_id' => $this->studentClass->id,
        'academic_year_id' => $inactiveYear->id,
        'initial_points' => 100,
        'created_by' => $this->user->id,
    ]);

    $export = new StudentEnrollmentReportExport($this->studentClass->id);
    $rows = $export->collection()->toArray();

    expect($rows)->toHaveCount(1);
});

it('excludes enrollments from other classes', function () {
    $otherClass = StudentClass::factory()->create(['created_by' => $this->user->id]);

    StudentEnrollment::factory()->create([
        'student_class_id' => $this->studentClass->id,
        'academic_year_id' => $this->academicYear->id,
        'initial_points' => 100,
        'created_by' => $this->user->id,
    ]);
    StudentEnrollment::factory()->create([
        'student_class_id' => $otherClass->id,
        'academic_year_id' => $this->academicYear->id,
        'initial_points' => 100,
        'created_by' => $this->user->id,
    ]);

    $export = new StudentEnrollmentReportExport($this->studentClass->id);
    $rows = $export->collection()->toArray();

    expect($rows)->toHaveCount(1);
});

it('excludes inactive enrollments', function () {
    StudentEnrollment::factory()->create([
        'student_class_id' => $this->studentClass->id,
        'academic_year_id' => $this->academicYear->id,
        'initial_points' => 100,
        'is_active' => true,
        'created_by' => $this->user->id,
    ]);
    StudentEnrollment::factory()->create([
        'student_class_id' => $this->studentClass->id,
        'academic_year_id' => $this->academicYear->id,
        'initial_points' => 100,
        'is_active' => false,
        'created_by' => $this->user->id,
    ]);

    $export = new StudentEnrollmentReportExport($this->studentClass->id);
    $rows = $export->collection()->toArray();

    expect($rows)->toHaveCount(1);
});

it('handles student with no transactions', function () {
    $enrollment = StudentEnrollment::factory()->create([
        'student_class_id' => $this->studentClass->id,
        'academic_year_id' => $this->academicYear->id,
        'initial_points' => 100,
        'created_by' => $this->user->id,
    ]);

    $export = new StudentEnrollmentReportExport($this->studentClass->id);
    $collection = $export->collection();

    expect($collection)->toHaveCount(1);

    $mapped = $export->map($collection->first());
    expect($mapped[2])->toBe(100); // Poin Awal
    expect($mapped[3])->toBe(0); // Total Dikurangkan
    expect($mapped[4])->toBe(0); // Jumlah Reset
    expect($mapped[5])->toBe(100); // Poin Saat Ini
});
