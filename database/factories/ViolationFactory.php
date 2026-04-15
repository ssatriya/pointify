<?php

namespace Database\Factories;

use App\Models\Violation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Violation>
 */
class ViolationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'point_transaction_group_id' => \App\Models\PointTransactionGroup::factory(),
            'student_enrollment_id' => \App\Models\StudentEnrollment::factory(),
            'violation_type_id' => \App\Models\ViolationType::factory(),
            'approval_status' => 'approved',
            'created_by' => \App\Models\User::factory(),
            'student_signature_path' => 'signatures/dummy.png',
        ];
    }
}
