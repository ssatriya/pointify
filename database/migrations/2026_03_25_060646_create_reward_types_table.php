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
        Schema::create('reward_types', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('code', 5)->unique();
            $table->string('description', 255);
            $table->integer('points')->default(0);
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
        Schema::dropIfExists('reward_types');
    }
};
