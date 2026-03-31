<?php

namespace App\Enums;

enum Permission: string
{
// Dashboard
    case VIEW_DASHBOARD = 'dashboard.view';

    // Academic years
    case VIEW_ACADEMIC_YEARS = 'academic-years.view';
    case CREATE_ACADEMIC_YEARS = 'academic-years.create';
    case UPDATE_ACADEMIC_YEARS = 'academic-years.update';
    case DELETE_ACADEMIC_YEARS = 'academic-years.delete';

    // Vocational programs
    case VIEW_VOCATIONAL_PROGRAMS = 'vocational-programs.view';
    case CREATE_VOCATIONAL_PROGRAMS = 'vocational-programs.create';
    case UPDATE_VOCATIONAL_PROGRAMS = 'vocational-programs.update';
    case DELETE_VOCATIONAL_PROGRAMS = 'vocational-programs.delete';

    // Student classes
    case VIEW_STUDENT_CLASSES = 'student-classes.view';
    case CREATE_STUDENT_CLASSES = 'student-classes.create';
    case UPDATE_STUDENT_CLASSES = 'student-classes.update';
    case DELETE_STUDENT_CLASSES = 'student-classes.delete';

    // Students
    case VIEW_STUDENTS = 'students.view';
    case CREATE_STUDENTS = 'students.create';
    case UPDATE_STUDENTS = 'students.update';
    case DELETE_STUDENTS = 'students.delete';

    // Student enrollments
    case VIEW_STUDENT_ENROLLMENTS = 'student-enrollments.view';
    case CREATE_STUDENT_ENROLLMENTS = 'student-enrollments.create';
    case UPDATE_STUDENT_ENROLLMENTS = 'student-enrollments.update';
    case DELETE_STUDENT_ENROLLMENTS = 'student-enrollments.delete';

    // Violation Types
    case VIEW_VIOLATION_TYPES = 'violation-types.view';
    case CREATE_VIOLATION_TYPES = 'violation-types.create';
    case UPDATE_VIOLATION_TYPES = 'violation-types.update';
    case DELETE_VIOLATION_TYPES = 'violation-types.delete';

    // Reward Types
    case VIEW_REWARD_TYPES = 'reward-types.view';
    case CREATE_REWARD_TYPES = 'reward-types.create';
    case UPDATE_REWARD_TYPES = 'reward-types.update';
    case DELETE_REWARD_TYPES = 'reward-types.delete';

    // Reward Types
    case VIEW_POINT_THRESHOLDS = 'point-thresholds.view';
    case CREATE_POINT_THRESHOLDS = 'point-thresholds.create';
    case UPDATE_POINT_THRESHOLDS = 'point-thresholds.update';
    case DELETE_POINT_THRESHOLDS = 'point-thresholds.delete';

    // Violations
    case VIEW_VIOLATIONS = 'violations.view';
    case CREATE_VIOLATIONS = 'violations.create';
    case APPROVE_VIOLATIONS = 'violations.approve';

    // Rewards
    case VIEW_REWARDS = 'rewards.view';
    case CREATE_REWARDS = 'rewards.create';

    // Violation letters
    case GENERATE_VIOLATION_LETTERS = 'violation-letters.generate';

    // Role management
    case VIEW_ROLES = 'roles.view';
    case CREATE_ROLES = 'roles.create';
    case UPDATE_ROLES = 'roles.update';
    case DELETE_ROLES = 'roles.delete';

    // Permission management
    case VIEW_PERMISSIONS = 'permissions.view';
    case CREATE_PERMISSIONS = 'permissions.create';
    case UPDATE_PERMISSIONS = 'permissions.update';
    case DELETE_PERMISSIONS = 'permissions.delete';
}
