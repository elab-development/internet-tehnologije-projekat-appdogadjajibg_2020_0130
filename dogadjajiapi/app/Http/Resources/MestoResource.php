<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MestoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
           // 'dogadjaji' => DogadjajResource::collection($this->whenLoaded('dogadjaji')),
        ];
    }
}