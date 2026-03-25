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
        Schema::create('violations', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('point_transaction_group_id')->nullable()->constrained('point_transaction_groups');
            $table->foreignUlid('student_enrollment_id')->constrained('student_enrollments');
            $table->foreignUlid('violation_type_id')->constrained('violation_types');
            $table->enum('approval_status', ['pending', 'approved', 'rejected', 'revoked']);
            $table->foreignUlid('approved_by')->nullable()->constrained('users');
            $table->timestamp('approved_at')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->foreignUlid('revoked_by')->nullable()->constrained('users');
            $table->timestamp('revoked_at')->nullable();
            $table->text('revoked_reason')->nullable();
            $table->foreignUlid('created_by')->constrained('users');
            $table->string('student_signature_path');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('violations');
    }
};
