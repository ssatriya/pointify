<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $role = $this->roles->first();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $role?->name,
            'role_label' => \App\Enums\Role::tryFrom($role?->name)?->label() ?? $role?->name,
            'permissions' => $this->getAllPermissions()->pluck('name'),
            'role_permissions' => $this->getPermissionsViaRoles()->pluck('name'),
            'direct_permissions' => $this->getDirectPermissions()->pluck('name'),
            'avatar' => $this->avatar_path
                ? asset('storage/' . $this->avatar_path)
                : "https://ui-avatars.com/api/?name=" . urlencode($this->name) . "&color=7F9CF5&background=EBF4FF",
            'email_verified_at' => $this->email_verified_at,
            'created_at' => $this->created_at?->format('d M Y'),
        ];
    }
}
