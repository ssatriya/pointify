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
        Schema::create('violation_letters', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('student_enrollment_id')->constrained('student_enrollments');
            $table->foreignUlid('point_transaction_group_id')->constrained('point_transaction_groups');
            $table->foreignUlid('point_threshold_id')->constrained('point_thresholds');
            $table->integer('cumulative_points_when_sent'); // cumulative violation points when sent (this will be represented as - (minus))
            $table->integer('current_remaining_points');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('violation_letters');
    }
};
