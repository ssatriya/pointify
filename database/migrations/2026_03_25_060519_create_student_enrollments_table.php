<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_enrollments', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('student_id')->constrained('students');
            $table->foreignUlid('student_class_id')->constrained('student_classes');
            $table->foreignUlid('academic_year_id')->constrained('academic_years');
            $table->boolean('is_repeating')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('initial_points')->default(100);
            $table->foreignUlid('created_by')->constrained('users');
            $table->foreignUlid('updated_by')->nullable()->constrained('users');
            $table->timestamps();

            $table->unique(['student_id', 'academic_year_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_enrollments');
    }
};
