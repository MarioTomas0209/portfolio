<template>
    <header class="mb-8 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-6xl">
        <nav class="flex items-center justify-between">
            <!-- Logo y nombre de la empresa -->
            <div class="animate-fade-in flex items-center gap-3">
                <div class="flex items-center justify-center">
                    <img src="https://github.com/shadcn.png" class="h-15 w-15 rounded-full border-3 border-blue-500"
                        alt="Logo" />
                </div>
                <div class="">
                    <h2
                        class="bg-gradient-to-r from-blue-600 to-gray-600 dark:to-white bg-clip-text text-lg font-bold text-transparent">
                        Desarrollo Digital
                    </h2>
                </div>
            </div>

            <!-- Botones de navegación -->
            <div class="flex items-center gap-3">
                <ThemeToggle />
                <Link v-if="$page.props.auth.user" :href="dashboard()"
                    class="group relative inline-block rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl">
                <span class="relative z-10 flex items-center gap-2">
                    <LayoutGrid class="w-4 h-4" /> Dashboard
                </span>
                </Link>
                <template v-else>
                    <Link :href="login()"
                        class="group relative inline-block rounded-lg border-2 border-blue-500 px-6 py-2.5 text-sm font-medium text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:text-white hover:shadow-lg dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white">
                    Iniciar sesión
                    </Link>
                </template>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { dashboard, login, register } from '@/routes';
import { Link } from '@inertiajs/vue3';
import { LayoutGrid } from 'lucide-vue-next';
import ThemeToggle from '../ui/themeToggle.vue';
</script>