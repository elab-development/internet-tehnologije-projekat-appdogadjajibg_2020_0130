<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserUloga extends Model
{
    use HasFactory;

    protected $table = 'user_uloge';

    protected $fillable = ['user_id', 'uloga_id'];
}

/*
 * Klasa UserUloga predstavlja pivot klasu u Eloquent ORM-u Laravel-a.
 * Pivot klasa je posebna klasa koja služi za uspostavljanje mnogi-na-mnoge odnosa između dva modela.
 * U ovom slučaju, ona povezuje modele User i Uloga kroz tabelu 'user_uloge'.
 * 
 * Pivot tabela sadrži samo strance ključeve (foreign keys) koji referenciraju identifikatore (ID) korisnika (User)
 * i uloge (Uloga). Ovo omogućava korisnicima da imaju više uloga i ulogama da budu dodeljene različitim korisnicima.
 * 
 * Na primer, jedan korisnik može biti i admin i običan korisnik, a više korisnika može imati ulogu admina.
 * 
 * Eloquent automatski koristi pivot klasu kada se koristi metoda belongsToMany u definisanju odnosa između modela.
 */