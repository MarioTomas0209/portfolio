<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\DeveloperSeeder;
use Database\Seeders\ServiceSeeder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Mario Tomas',
                'email' => 'tmario291@gmail.com',
                'password' => Hash::make('Mario2025*'),
            ],
            [
                'name' => 'Virbes Francisco',
                'email' => 'francisco.virbes.457@gmail.com',
                'password' => Hash::make('Virbes2025*'),
            ],
            [
                'name' => 'Miguel Santiz',
                'email' => 'mangel20sr@gmail.com',
                'password' => Hash::make('Miguel2025*'),
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }

        $this->call([
            DeveloperSeeder::class,
            ServiceSeeder::class,
        ]);
    }
}

// V3^rp|xz;F8H
