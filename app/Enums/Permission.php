<?php

namespace App\Enums;

enum Permission: string
{
    // Dashboard
    case DASHBOARD_VIEW = 'dashboard.view';

    // Academic years
    case ACADEMIC_YEARS_VIEW = 'academic-years.view';
    case ACADEMIC_YEARS_CREATE = 'academic-years.create';
    case ACADEMIC_YEARS_UPDATE = 'academic-years.update';
    case ACADEMIC_YEARS_DELETE = 'academic-years.delete';

    // Vocational programs
    case VOCATIONAL_PROGRAMS_VIEW = 'vocational-programs.view';
    case VOCATIONAL_PROGRAMS_CREATE = 'vocational-programs.create';
    case VOCATIONAL_PROGRAMS_UPDATE = 'vocational-programs.update';
    case VOCATIONAL_PROGRAMS_DELETE = 'vocational-programs.delete';

    // Student classes
    case STUDENT_CLASSES_VIEW = 'student-classes.view';
    case STUDENT_CLASSES_CREATE = 'student-classes.create';
    case STUDENT_CLASSES_UPDATE = 'student-classes.update';
    case STUDENT_CLASSES_DELETE = 'student-classes.delete';

    // Students
    case STUDENTS_VIEW = 'students.view';
    case STUDENTS_CREATE = 'students.create';
    case STUDENTS_UPDATE = 'students.update';
    case STUDENTS_DELETE = 'students.delete';

    // Student enrollments
    case STUDENT_ENROLLMENTS_VIEW = 'student-enrollments.view';
    case STUDENT_ENROLLMENTS_CREATE = 'student-enrollments.create';
    case STUDENT_ENROLLMENTS_UPDATE = 'student-enrollments.update';
    case STUDENT_ENROLLMENTS_DELETE = 'student-enrollments.delete';

    // Violation Types
    case VIOLATION_TYPES_VIEW = 'violation-types.view';
    case VIOLATION_TYPES_CREATE = 'violation-types.create';
    case VIOLATION_TYPES_UPDATE = 'violation-types.update';
    case VIOLATION_TYPES_DELETE = 'violation-types.delete';

    // Reward Types
    case REWARD_TYPES_VIEW = 'reward-types.view';
    case REWARD_TYPES_CREATE = 'reward-types.create';
    case REWARD_TYPES_UPDATE = 'reward-types.update';
    case REWARD_TYPES_DELETE = 'reward-types.delete';

    // Reward Types
    case POINT_THRESHOLDS_VIEW = 'point-thresholds.view';
    case POINT_THRESHOLDS_CREATE = 'point-thresholds.create';
    case POINT_THRESHOLDS_UPDATE = 'point-thresholds.update';
    case POINT_THRESHOLDS_DELETE = 'point-thresholds.delete';

    // Violations
    case VIOLATIONS_VIEW = 'violations.view';
    case VIOLATIONS_CREATE = 'violations.create';
    case VIOLATIONS_REVOKE = 'violations.revoke';

    // Violation Approvals
    case VIOLATION_APPROVALS_VIEW = 'violation-approvals.view';

    // Rewards
    case REWARDS_VIEW = 'rewards.view';
    case REWARDS_CREATE = 'rewards.create';
    case REWARDS_REVOKE = 'rewards.revoke';

    // Violation letters
    case VIOLATION_LETTERS_GENERATE = 'violation-letters.generate';

    // Role management
    case ROLES_VIEW = 'roles.view';
    case ROLES_CREATE = 'roles.create';
    case ROLES_UPDATE = 'roles.update';
    case ROLES_DELETE = 'roles.delete';

    // Permission management
    case PERMISSIONS_VIEW = 'permissions.view';
    case PERMISSIONS_CREATE = 'permissions.create';
    case PERMISSIONS_UPDATE = 'permissions.update';
    case PERMISSIONS_DELETE = 'permissions.delete';
}
