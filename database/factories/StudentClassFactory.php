<?php

namespace Database\Factories;

use App\Models\StudentClass;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<StudentClass>
 */
class StudentClassFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->word;
        return [
            'name' => $name,
            'grade_level' => $this->faker->randomElement([10, 11, 12]),
            'section' => strtoupper($this->faker->lexify('?')),
            'slug' => \Illuminate\Support\Str::slug($name),
            'order' => $this->faker->numberBetween(1, 100),
            'vocational_program_id' => \App\Models\VocationalProgram::factory(),
            'created_by' => \App\Models\User::factory(),
            'updated_by' => \App\Models\User::factory(),
        ];
    }
}
