<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Dogadjaj;
use App\Models\Kategorija;
use App\Models\Mesto;
use App\Models\Uloga;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
 
        $users = User::factory(10)->create();

        // Dodavanje nasumičnih uloga svakom korisniku
        $uloge = Uloga::all();



        // Dodeljivanje nasumičnih uloga korisnicima
        $users->each(function ($user) use ($uloge) {
            $user->uloge()->attach(
                $uloge->random(rand(1, 2))->pluck('id')->toArray()
            );
        });
        Mesto::factory()->count(10)->create();



        Kategorija::create(['name' => 'Kultura i umetnost']);
        Kategorija::create(['name' => 'Muzika i koncerti']);
        Kategorija::create(['name' => 'Festivali']);
        Kategorija::create(['name' => 'Sportski događaji']);
        Kategorija::create(['name' => 'Sajmovi i izložbe']);
        Kategorija::create(['name' => 'Gastronomski događaji']);
        Kategorija::create(['name' => 'Edukativni događaji']);
        Kategorija::create(['name' => 'Zabava i noćni život']);
        


        Dogadjaj::factory()->count(50)->create();



    }
}
