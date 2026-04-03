<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index()
    {
        $users = User::with('roles.permissions', 'permissions')
            ->orderBy('name')
            ->paginate();

        return Inertia::render('dashboard/users/users', [
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Display the specified user.
     */
    public function show(User $user)
    {
        $user->load('roles.permissions', 'permissions');

        return response()->json([
            'data' => new UserResource($user),
        ]);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(User $user)
    {
        $user->load('roles.permissions', 'permissions');

        return Inertia::render('dashboard/users/edit/edit', [
            'user' => new UserResource($user),
            'allPermissions' => Permission::all()->pluck('name'),
            'allRoles' => collect(Role::cases())->map(fn($role) => [
                'value' => $role->value,
                'label' => $role->label(),
            ]),
        ]);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
            'roles' => ['nullable', 'array'],
            'roles.*' => ['string', 'exists:roles,name'],
        ]);

        if ($request->has('permissions')) {
            $user->syncPermissions($request->permissions);
        }

        if ($request->has('roles') && $request->user()->hasRole(Role::SUPER_ADMIN->value)) {
            $user->syncRoles($request->roles);
        }

        return back();
    }
}
