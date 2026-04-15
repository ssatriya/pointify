<?php

namespace Database\Factories;

use App\Models\ViolationType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ViolationType>
 */
class ViolationTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => strtoupper($this->faker->unique()->lexify('??###')),
            'description' => $this->faker->sentence(),
            'points' => $this->faker->numberBetween(5, 50),
            'is_active' => true,
            'created_by' => \App\Models\User::factory(),
            'updated_by' => \App\Models\User::factory(),
        ];
    }
}
