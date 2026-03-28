<?php

namespace Database\Seeders;

use App\Enums\Permission;
use App\Enums\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission as PermissionModel;
use Spatie\Permission\Models\Role as RoleModel;
use Spatie\Permission\PermissionRegistrar;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        foreach (Permission::cases() as $permission) {
            PermissionModel::firstOrCreate([
                'name' => $permission->value,
                'guard_name' => 'web',
            ]);
        }

        foreach (Role::cases() as $role) {
            RoleModel::firstOrCreate([
                'name' => $role->value,
                'guard_name' => 'web',
            ]);
        }

        $this->assignPermissionsToRoles();

        app()[PermissionRegistrar::class]->forgetCachedPermissions();
    }

    private function assignPermissionsToRoles(): void
    {
        $rolePermissions = [
            Role::SUPER_ADMIN->value => Permission::cases(),

            Role::ADMIN->value => [
                Permission::VIEW_DASHBOARD,
                Permission::VIEW_VOCATIONAL_PROGRAMS,
                Permission::CREATE_VOCATIONAL_PROGRAMS,
                Permission::UPDATE_VOCATIONAL_PROGRAMS,
                Permission::VIEW_STUDENT_CLASSES,
                Permission::CREATE_STUDENT_CLASSES,
                Permission::UPDATE_STUDENT_CLASSES,
                Permission::VIEW_STUDENTS,
                Permission::CREATE_STUDENTS,
                Permission::UPDATE_STUDENTS,
                Permission::VIEW_STUDENT_ENROLLMENTS,
                Permission::CREATE_STUDENT_ENROLLMENTS,
                Permission::UPDATE_STUDENT_ENROLLMENTS,
                Permission::VIEW_VIOLATION_TYPES,
                Permission::VIEW_REWARD_TYPES,
                Permission::CREATE_VIOLATION_TYPES,
                Permission::UPDATE_VIOLATION_TYPES,
                Permission::VIEW_VIOLATIONS,
                Permission::CREATE_VIOLATIONS,
                Permission::VIEW_REWARDS,
                Permission::CREATE_REWARDS,
            ],

            Role::PRINCIPAL->value => [
                Permission::VIEW_DASHBOARD,
                Permission::VIEW_VIOLATIONS,
                Permission::GENERATE_VIOLATION_LETTERS,
            ],

            Role::VICE_PRINCIPAL->value => [
                Permission::VIEW_DASHBOARD,
                Permission::VIEW_VIOLATIONS,
                Permission::GENERATE_VIOLATION_LETTERS,
                Permission::VIEW_REWARDS,
                Permission::CREATE_REWARDS,
            ],

            Role::DUTY_TEACHER->value => [
                Permission::VIEW_DASHBOARD,
                Permission::VIEW_VIOLATIONS,
                Permission::CREATE_VIOLATIONS,
                Permission::GENERATE_VIOLATION_LETTERS,
            ],

            Role::STAFF->value => [
                Permission::VIEW_DASHBOARD,
                Permission::VIEW_VIOLATIONS,
                Permission::CREATE_VIOLATIONS,
                Permission::GENERATE_VIOLATION_LETTERS,
            ],
        ];

        // Sync permissions to each role
        foreach ($rolePermissions as $roleName => $permissions) {
            $role = RoleModel::findByName($roleName);
            $permissionValues = array_map(fn($p) => $p instanceof Permission ? $p->value : $p, $permissions);
            $role->syncPermissions($permissionValues);
        }
    }
}
