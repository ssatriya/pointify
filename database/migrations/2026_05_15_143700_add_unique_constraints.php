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
        Schema::table('point_transactions', function (Blueprint $table) {
            $table->unique(['violation_id', 'transaction_type']);
            $table->unique(['reward_id', 'transaction_type']);
        });

        Schema::table('violation_letters', function (Blueprint $table) {
            $table->unique(['student_enrollment_id', 'point_transaction_group_id', 'point_threshold_id'], 'violation_letters_enrollment_group_threshold_unique');
        });

        Schema::table('point_transaction_groups', function (Blueprint $table) {
            $table->unique(['student_enrollment_id', 'sequence']);
        });

        Schema::table('student_classes', function (Blueprint $table) {
            $table->unique('name');
        });

        Schema::table('vocational_programs', function (Blueprint $table) {
            $table->unique('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('point_transactions', function (Blueprint $table) {
            $table->dropUnique(['violation_id', 'transaction_type']);
            $table->dropUnique(['reward_id', 'transaction_type']);
        });

        Schema::table('violation_letters', function (Blueprint $table) {
            $table->dropUnique('violation_letters_enrollment_group_threshold_unique');
        });

        Schema::table('point_transaction_groups', function (Blueprint $table) {
            $table->dropUnique(['student_enrollment_id', 'sequence']);
        });

        Schema::table('student_classes', function (Blueprint $table) {
            $table->dropUnique(['name']);
        });

        Schema::table('vocational_programs', function (Blueprint $table) {
            $table->dropUnique(['name']);
        });
    }
};
