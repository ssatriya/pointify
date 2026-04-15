<?php

namespace Database\Factories;

use App\Models\StudentEnrollment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<StudentEnrollment>
 */
class StudentEnrollmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => \App\Models\Student::factory(),
            'student_class_id' => \App\Models\StudentClass::factory(),
            'academic_year_id' => \App\Models\AcademicYear::factory(),
            'initial_points' => 100,
            'is_repeating' => false,
            'is_active' => true,
            'created_by' => \App\Models\User::factory(),
            'updated_by' => \App\Models\User::factory(),
        ];
    }
}
