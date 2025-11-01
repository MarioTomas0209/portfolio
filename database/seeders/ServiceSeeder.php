<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'title' => 'Desarrollo Web',
                'description' => 'Creamos sitios web modernos y responsivos que se adaptan a cualquier dispositivo.',
                'icon' => 'fa-solid fa-desktop',
                'features' =>  [
                    "Diseño responsivo",
                    "Optimización SEO",
                    "Carga rápida",
                    "Seguridad avanzada"
                ],
                'color' => 'linear-gradient(to right, #3b82f6, #2563eb)',
                'is_active' => true,
            ],
            [
                'title' => 'Desarrollo Móvil',
                'description' => 'Desarrollamos aplicaciones móviles nativas e híbridas para iOS y Android.',
                'icon' => 'fa-solid fa-mobile-screen-button',
                'features' => [
                    "Apps nativas",
                    "Cross-platform",
                    "UI/UX optimizada",
                    "Integración API"
                ],
                'color' => 'linear-gradient(to right, #22c55e, #16a34a)',
                'is_active' => true,
            ],
            [
                'title' => 'Backend & APIs',
                'description' => 'Construimos APIs robustas y escalables para conectar todos tus sistemas.',
                'icon' => 'fa-solid fa-database',
                'features' => [
                    "APIs RESTful",
                    "Microservicios",
                    "Base de datos",
                    "Autenticación"
                ],
                'color' => 'linear-gradient(to right, #a855f7, #9333ea)',
                'is_active' => true,
            ],
            [
                'title' => 'Diseño UI/UX',
                'description' => 'Diseñamos interfaces intuitivas y experiencias de usuario excepcionales.',
                'icon' => 'fa-solid fa-palette',
                'features' => [
                    "Prototipado",
                    "Diseño de interfaces",
                    "Experiencia de usuario",
                    "Testing de usabilidad"
                ],
                'color' => 'linear-gradient(to right, #6366f1, #4f46e5)',
                'is_active' => true,
            ],
            [
                'title' => 'Integración de Sistemas',
                'description' => 'Conectamos y optimizamos tus sistemas existentes para mayor eficiencia.',
                'icon' => 'fa-solid fa-gear',
                'features' => [
                    "Migración de datos",
                    "Automatización",
                    "Integración de APIs",
                    "Optimización"
                ],
                'color' => 'linear-gradient(to right, #f97316, #ea580c)',
                'is_active' => true,
            ],
            [
                'title' => 'Soluciones Personalizadas',
                'description' => 'Desarrollamos software a medida para resolver problemas específicos de tu negocio.',
                'icon' => 'fa-solid fa-code',
                'features' => [
                    "Análisis de requerimientos",
                    "Desarrollo personalizado",
                    "Testing exhaustivo",
                    "Soporte continuo"
                ],
                'color' => 'linear-gradient(to right, #ec4899, #db2777)',
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
