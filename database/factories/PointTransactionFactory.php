<?php

namespace Database\Factories;

use App\Models\PointTransaction;
use App\Models\StudentEnrollment;
use App\Models\User;
use App\Models\Violation;
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
            'student_enrollment_id' => StudentEnrollment::factory(),
            'transaction_type' => 'violation',
            'violation_id' => Violation::factory(),
            'processed_by' => User::factory(),
            'points_change' => -10,
            'intended_points' => -10,
            'points_before' => 100,
            'points_after' => 90,
        ];
    }
}
