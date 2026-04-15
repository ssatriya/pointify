<?php

namespace Database\Factories;

use App\Models\PointTransaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PointTransaction>
 */
class PointTransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_enrollment_id' => \App\Models\StudentEnrollment::factory(),
            'transaction_type' => 'violation',
            'violation_id' => \App\Models\Violation::factory(),
            'processed_by' => \App\Models\User::factory(),
            'points_change' => -10,
            'intended_points' => -10,
            'points_before' => 100,
            'points_after' => 90,
        ];
    }
}
