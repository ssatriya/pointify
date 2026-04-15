<?php

namespace Database\Factories;

use App\Models\VocationalProgram;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<VocationalProgram>
 */
class VocationalProgramFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'abbreviation' => strtoupper($this->faker->lexify('???')),
            'created_by' => \App\Models\User::factory(),
            'updated_by' => \App\Models\User::factory(),
        ];
    }
}
