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
        $roleName = $this->getRoleNames()->first();
        $roleEnum = Role::from($roleName);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => [
                'value' => $roleEnum->value,
                'label' => $roleEnum->label(),
            ],
            'permissions' => $this->getPermissionsViaRoles()->pluck('name'),
            'email_verified_at' => $this->email_verified_at,
        ];
    }
}
