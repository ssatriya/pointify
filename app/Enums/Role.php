<?php

namespace App\Enums;

enum Role: string
{
    case SUPER_ADMIN = 'super-admin';
    case ADMIN = 'admin';
    case PRINCIPAL = 'principal';
    case VICE_PRINCIPAL = 'vice-principal';
    case DUTY_TEACHER = 'duty-teacher';
    case STAFF = 'staff';

    public function label(): string
    {
        return match ($this) {
            self::SUPER_ADMIN => 'Super Admin',
            self::ADMIN => 'Admin',
            self::PRINCIPAL => 'Kepala',
            self::VICE_PRINCIPAL => 'Wakil Kepala',
            self::DUTY_TEACHER => 'Guru Piket',
            self::STAFF => 'Staf',
        };
    }
}
