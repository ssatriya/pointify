<?php

namespace Database\Factories;

use App\Models\AcademicYear;
use App\Models\PointThreshold;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PointThreshold>
 */
class PointThresholdFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'academic_year_id' => AcademicYear::factory(),
            'cumulative_points_threshold' => $this->faker->randomElement([30, 50, 70, 100]),
            'description' => $this->faker->sentence(),
            'is_active' => true,
            'created_by' => User::factory(),
            'updated_by' => User::factory(),
        ];
    }
}
