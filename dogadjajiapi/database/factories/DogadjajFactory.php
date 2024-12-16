<?php

namespace Database\Factories;

use App\Models\Kategorija;
use App\Models\Mesto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dogadjaj>
 */
class DogadjajFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'image' => $this->faker->imageUrl(), 
            'start_time' => $this->faker->dateTimeBetween('-1 week', '+1 week'),
            'end_time' => $this->faker->dateTimeBetween('+1 week', '+2 weeks'),
            'mesto_id' => Mesto::inRandomOrder()->first()->id,
            'kategorija_id' => Kategorija::inRandomOrder()->first()->id,
        ];
    }
}
