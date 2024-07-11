<?php

namespace App\Http\Resources;

use App\Models\Uloga;
use App\Models\UserUloga;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    { // Dohvaćanje svih uloga iz baze
        $allRoles = Uloga::all();

        // Dohvaćanje svih zapisa iz pivot tabele user_uloge za korisnika
        $userRoleIds = UserUloga::where('user_id', $this->id)->pluck('uloga_id')->toArray();

        // Filtriranje uloga koje pripadaju korisniku
        $filteredRoles = $allRoles->filter(function ($role) use ($userRoleIds) {
            return in_array($role->id, $userRoleIds);
        });
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'roles' => UlogaResource::collection($filteredRoles),
        ];
    }
}
