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
        Schema::create('point_transactions', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('student_enrollment_id')->constrained('student_enrollments');
            $table->string('transaction_type');
            $table->foreignUlid('violation_id')->nullable()->constrained('violations');
            $table->foreignUlid('reward_id')->nullable()->constrained('rewards');
            $table->foreignUlid('processed_by')->constrained('users');
            $table->string('description')->nullable();
            $table->integer('points_change'); // Negative for violations, positive for rewards/resets
            $table->integer('intended_points')->nullable(); // For partial deductions
            $table->integer('points_before');
            $table->integer('points_after');

            $table->index(['student_enrollment_id', 'points_change']);
            $table->index(['student_enrollment_id', 'created_at']);
            $table->index(['transaction_type', 'created_at']);
            $table->index(['student_enrollment_id', 'transaction_type']);
            $table->index('processed_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('point_transactions');
    }
};
