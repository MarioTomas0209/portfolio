<template>
    <div
        class="flex w-full items-center justify-center opacity-100 lg:grow">
        <main class="flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-4 sm:gap-8 sm:px-6">
            <div class="flex w-full flex-col items-center justify-center gap-3 text-center sm:gap-4">
                <div class="relative w-full">
                    <h1
                        class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
                        Conoce a nuestros desarrolladores
                    </h1>
                </div>
                <p class="max-w-2xl text-base leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg">
                    Somos un equipo de desarrolladores apasionados
                    que nos dedicamos a crear
                    <span class="font-semibold text-blue-600 dark:text-blue-400">
                        soluciones digitales innovadoras
                    </span>
                    para nuestros clientes.
                </p>
                <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                    <div class="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                    <span>Disponibles para nuevos proyectos</span>
                </div>
            </div>

            <!-- Carrusel de desarrolladores -->
             <div class="w-full">
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