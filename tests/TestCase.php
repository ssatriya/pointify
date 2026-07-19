<?php

namespace Tests;

use App\Models\AcademicYear;
use App\Models\PointTransactionGroup;
use App\Models\StudentEnrollment;
use App\Models\User;
use App\Models\ViolationType;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected ?User $user = null;

    protected ?AcademicYear $academicYear = null;

    protected ?StudentEnrollment $studentEnrollment = null;

    protected ?StudentEnrollment $enrollment = null;

    protected ?ViolationType $violationType = null;

    protected ?PointTransactionGroup $group = null;

    protected mixed $service = null;
}
