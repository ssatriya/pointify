<?php

namespace Database\Factories;

use App\Models\Student;
use App\Models\User;
use App\Models\VocationalProgram;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_number' => $this->faker->unique()->numerify('##########'),
            'name' => $this->faker->name(),
            'vocational_program_id' => VocationalProgram::factory(),
            'is_active' => true,
            'created_by' => User::factory(),
            'updated_by' => User::factory(),
        ];
    }
}
