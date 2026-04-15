<?php

namespace Database\Factories;

use App\Models\PointTransactionGroup;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PointTransactionGroup>
 */
class PointTransactionGroupFactory extends Factory
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
            'sequence' => 1,
            'is_closed' => false,
        ];
    }
}
