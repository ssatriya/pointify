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
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'roles' => $this->roles->pluck('name'),
            'role_labels' => $this->roles->pluck('name')->map(fn($name) => \App\Enums\Role::tryFrom($name)?->label() ?? $name),
            'permissions' => $this->getAllPermissions()->pluck('name'),
            'role_permissions' => $this->getPermissionsViaRoles()->pluck('name'),
            'direct_permissions' => $this->getDirectPermissions()->pluck('name'),
            'email_verified_at' => $this->email_verified_at,
            'created_at' => $this->created_at?->format('d M Y'),
        ];
    }
}
