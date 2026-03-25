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
        Schema::create('students', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('student_number', 20)->unique();
            $table->string('name', 100);
            $table->foreignUlid('vocational_program_id')->constrained('vocational_programs');
            $table->boolean('is_active')->default(true);
            $table->foreignUlid('created_by')->constrained('users');
            $table->foreignUlid('updated_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
