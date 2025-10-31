<template>

    <button
        class="cursor-pointer group relative inline-flex items-center justify-center rounded-lg border-2 border-gray-300 p-2.5 text-gray-600 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 hover:scale-105 dark:border-gray-600 dark:text-gray-400 dark:hover:border-blue-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
        @click="toggleTheme"
        :title="getTooltip()"
    >
        <Sun v-if="currentTheme === 'light'" class="w-5 h-5" />
        <Moon v-if="currentTheme === 'dark'" class="w-5 h-5" />
    </button>

</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Moon, Sun } from 'lucide-vue-next';
import { useAppearance } from '@/composables/useAppearance';

const { appearance, updateAppearance } = useAppearance();

// Detecta el tema actual real (si es 'system', resuelve al tema del sistema)
const currentTheme = computed(() => {
    if (appearance.value === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return appearance.value;
});

const getTooltip = () => {
    switch (appearance.value) {
        case 'light':
            return 'Modo Claro';
        case 'dark':
            return 'Modo Oscuro';
        case 'system':
            return 'Modo Automático';
        default:
            return 'Cambiar tema';
    }
};

const toggleTheme = () => {
    // Alterna solo entre light y dark, ignorando 'system'
    const newTheme = appearance.value === 'light' ? 'dark' : 'light';
    updateAppearance(newTheme);
}
</script>