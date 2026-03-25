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
        Schema::create('point_thresholds', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('academic_year_id')->constrained('academic_years');
            $table->integer('cumulative_points_threshold');
            $table->string('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->foreignUlid('created_by')->constrained('users');
            $table->foreignUlid('updated_by')->nullable()->constrained('users');
            $table->timestamps();

            $table->unique(['academic_year_id', 'cumulative_points_threshold']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('point_thresholds');
    }
};
