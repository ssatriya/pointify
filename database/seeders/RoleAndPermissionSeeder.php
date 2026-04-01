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
                Permission::DASHBOARD_VIEW,
                Permission::VOCATIONAL_PROGRAMS_VIEW,
                Permission::VOCATIONAL_PROGRAMS_CREATE,
                Permission::VOCATIONAL_PROGRAMS_UPDATE,
                Permission::STUDENT_CLASSES_VIEW,
                Permission::STUDENT_CLASSES_CREATE,
                Permission::STUDENT_CLASSES_UPDATE,
                Permission::STUDENTS_VIEW,
                Permission::STUDENTS_CREATE,
                Permission::STUDENTS_UPDATE,
                Permission::STUDENT_ENROLLMENTS_VIEW,
                Permission::STUDENT_ENROLLMENTS_CREATE,
                Permission::STUDENT_ENROLLMENTS_UPDATE,
                Permission::VIOLATION_TYPES_VIEW,
                Permission::REWARD_TYPES_VIEW,
                Permission::VIOLATION_TYPES_CREATE,
                Permission::VIOLATION_TYPES_UPDATE,
                Permission::VIOLATIONS_VIEW,
                Permission::VIOLATIONS_CREATE,
                Permission::REWARDS_VIEW,
                Permission::REWARDS_CREATE,
            ],

            Role::PRINCIPAL->value => [
                Permission::DASHBOARD_VIEW,
                Permission::VIOLATIONS_VIEW,
                Permission::VIOLATION_APPROVALS_VIEW,
                Permission::VIOLATION_LETTERS_GENERATE,
            ],

            Role::VICE_PRINCIPAL->value => [
                Permission::DASHBOARD_VIEW,
                Permission::VIOLATIONS_VIEW,
                Permission::VIOLATION_APPROVALS_VIEW,
                Permission::VIOLATION_LETTERS_GENERATE,
                Permission::REWARDS_VIEW,
                Permission::REWARDS_CREATE,
            ],

            Role::DUTY_TEACHER->value => [
                Permission::DASHBOARD_VIEW,
                Permission::VIOLATIONS_VIEW,
                Permission::VIOLATIONS_CREATE,
                Permission::VIOLATION_LETTERS_GENERATE,
            ],

            Role::STAFF->value => [
                Permission::DASHBOARD_VIEW,
                Permission::VIOLATIONS_VIEW,
                Permission::VIOLATIONS_CREATE,
                Permission::VIOLATION_LETTERS_GENERATE,
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
