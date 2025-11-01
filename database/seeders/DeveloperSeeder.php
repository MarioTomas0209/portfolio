<?php

namespace Database\Seeders;

use App\Models\Developer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeveloperSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $developers = [
            [
                'name' => 'Miguel Santiz',
                'job' => 'Desarrollador Full Stack',
                'location' => 'Comitan Chiapas, México',
                'portfolio' => null,
                'github' => 'https://github.com/mProyectosWeb',
                'linkedin' => 'https://www.linkedin.com/in/miguel-santiz-22',
                'whatsapp' => null,
                'email' => null,
                'facebook' => null,
                'instagram' => null,
                'image' => 'https://github.com/mProyectosWeb.png',
                'is_active' => true,
            ],
            [
                'name' => 'Jorge Garcia',
                'job' => 'Desarrollador Full Stack',
                'location' => 'Comitan Chiapas, México',
                'portfolio' => null,
                'github' => 'https://github.com/Dev-JGarcia',
                'linkedin' => 'https://www.linkedin.com/in/jorge-garcia-dev',
                'whatsapp' => null,
                'email' => null,
                'facebook' => null,
                'instagram' => null,
                'image' => 'https://github.com/Dev-JGarcia.png',
                'is_active' => false,
            ],
            [
                'name' => 'Virbes Francisco',
                'job' => 'Desarrollador Full Stack',
                'location' => 'Comitan Chiapas, México',
                'portfolio' => null,
                'github' => 'https://github.com/Virbes',
                'linkedin' => 'https://www.linkedin.com/in/virbes',
                'whatsapp' => null,
                'email' => null,
                'facebook' => null,
                'instagram' => null,
                'image' => 'https://github.com/virbes.png',
                'is_active' => true,
            ],
            [
                'name' => 'Mario Tomas',
                'job' => 'Desarrollador Full Stack',
                'location' => 'Comitan Chiapas, México',
                'portfolio' => null,
                'github' => 'https://github.com/MarioTomas0209',
                'linkedin' => 'https://www.linkedin.com/in/mario-tr',
                'whatsapp' => '+529632525351',
                'email' => 'tmario291@gmail.com',
                'facebook' => 'https://www.facebook.com/marioadolfo.tomas',
                'instagram' => 'https://www.instagram.com/mariotomas02',
                'image' => 'https://github.com/MarioTomas0209.png',
                'is_active' => true,
            ],
        ];

        foreach ($developers as $developer) {
            Developer::create($developer);
        }
        
    }
}
