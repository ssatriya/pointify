<?php

namespace Database\Factories;

use App\Models\PointThreshold;
use App\Models\PointTransactionGroup;
use App\Models\StudentEnrollment;
use App\Models\ViolationLetter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ViolationLetter>
 */
class ViolationLetterFactory extends Factory
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
            'point_transaction_group_id' => PointTransactionGroup::factory(),
            'point_threshold_id' => PointThreshold::factory(),
            'cumulative_points_when_sent' => 30,
            'current_remaining_points' => 70,
        ];
    }
}
