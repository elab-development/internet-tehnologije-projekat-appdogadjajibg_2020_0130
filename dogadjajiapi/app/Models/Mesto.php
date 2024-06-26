<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mesto extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'address'];

    public function dogadjaji()
    {
        return $this->hasMany(Dogadjaj::class);
    }
}
