<template>
    <div
        class="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
        <main class="flex flex-col items-center justify-center gap-8">
            <div class="animate-slide-up flex flex-col items-center justify-center gap-4 text-center">
                <div class="relative">
                    <h1
                        class="animate-gradient bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                        Conoce a nuestros desarrolladores
                    </h1>
                    <div
                        class="absolute -inset-1 animate-pulse rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-30 blur">
                    </div>
                </div>
                <p class="max-w-2xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    Somos un equipo de desarrolladores apasionados
                    que nos dedicamos a crear
                    <span class="font-semibold text-blue-600">
                        soluciones digitales innovadoras
                    </span>
                    para nuestros clientes.
                </p>
                <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div class="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                    <span>Disponibles para nuevos proyectos</span>
                </div>
            </div>

            <!-- Carrusel de desarrolladores -->
             <div class="animate-fade-in-delayed">
                <ProfileCarousel :developers="props.developers" />
             </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import ProfileCarousel from '../ui/profileCarousel.vue';
import { Developer } from '@/types';

const props = defineProps<{
    developers: Developer[];
}>();

</script>