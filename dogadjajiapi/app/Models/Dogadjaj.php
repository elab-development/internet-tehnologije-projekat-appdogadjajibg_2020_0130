<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dogadjaj extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'start_time', 'end_time', 'mesto_id', 'kategorija_id', 'image'
    ];

    public function mesto()
    {
        return $this->belongsTo(Mesto::class);
    }

    public function kategorija()
    {
        return $this->belongsTo(Kategorija::class);
    }
 
}
