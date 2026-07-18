<?php

namespace Database\Factories;

use App\Models\PointTransactionGroup;
use App\Models\StudentEnrollment;
use App\Models\User;
use App\Models\Violation;
use App\Models\ViolationType;
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
            'point_transaction_group_id' => PointTransactionGroup::factory(),
            'student_enrollment_id' => StudentEnrollment::factory(),
            'violation_type_id' => ViolationType::factory(),
            'approval_status' => 'approved',
            'created_by' => User::factory(),
        ];
    }
}
