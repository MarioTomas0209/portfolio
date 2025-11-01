<template>
    <header class="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
        <nav class="flex items-center justify-between">
            <!-- Logo y nombre de la empresa -->
            <div class="animate-fade-in flex items-center gap-2 sm:gap-3">
                <div class="flex items-center justify-center">
                    <img src="https://github.com/shadcn.png" 
                        class="h-10 w-10 rounded-full border-2 border-blue-500 sm:h-12 sm:w-12 sm:border-3"
                        alt="Logo" />
                </div>
                <div class="">
                    <h2
                        class="bg-gradient-to-r from-blue-600 to-gray-600 dark:to-white bg-clip-text text-base font-bold text-transparent sm:text-lg">
                        Desarrollo Digital
                    </h2>
                </div>
            </div>

            <!-- Menú desktop -->
            <div class="hidden items-center gap-2 sm:flex sm:gap-3">
                <ThemeToggle />
                <Link v-if="$page.props.auth.user" :href="dashboard()"
                    class="group relative inline-block rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl">
                <span class="relative z-10 flex items-center gap-2">
                    <LayoutGrid class="w-4 h-4" /> 
                    <span>Dashboard</span>
                </span>
                </Link>
                <template v-else>
                    <Link :href="login()"
                        class="group relative inline-block rounded-lg border-2 border-blue-500 px-6 py-2.5 text-sm font-medium text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:text-white hover:shadow-lg dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white">
                    <span>Iniciar sesión</span>
                    </Link>
                </template>
            </div>

            <!-- Botón hamburguesa móvil -->
            <div class="flex items-center gap-2 sm:hidden">
                <ThemeToggle />
                <button 
                    @click="toggleMenu"
                    class="relative inline-flex items-center justify-center rounded-lg border-2 border-blue-500 p-2 text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                    aria-label="Toggle menu"
                >
                    <X v-if="isMenuOpen" class="h-6 w-6" />
                    <Menu v-else class="h-6 w-6" />
                </button>
            </div>
        </nav>

        <!-- Menú móvil desplegable -->
        <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <div v-if="isMenuOpen" 
                class="mt-4 flex flex-col gap-3 rounded-lg border-2 border-blue-200 bg-white p-4 shadow-lg dark:border-blue-800 dark:bg-gray-900 sm:hidden">
                <Link v-if="$page.props.auth.user" 
                    :href="dashboard()"
                    @click="closeMenu"
                    class="group relative inline-block rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl">
                    <span class="relative z-10 flex items-center justify-center gap-2">
                        <LayoutGrid class="w-4 h-4" /> 
                        <span>Dashboard</span>
                    </span>
                </Link>
                <template v-else>
                    <Link :href="login()"
                        @click="closeMenu"
                        class="group relative inline-block rounded-lg border-2 border-blue-500 px-6 py-2.5 text-sm font-medium text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:text-white hover:shadow-lg dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white">
                        <span>Iniciar sesión</span>
                    </Link>
                </template>
            </div>
        </transition>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dashboard, login, register } from '@/routes';
import { Link } from '@inertiajs/vue3';
import { LayoutGrid, Menu, X } from 'lucide-vue-next';
import ThemeToggle from '../ui/themeToggle.vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
    isMenuOpen.value = false;
};
</script>