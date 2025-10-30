<template>
    <Head title="Developers" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="mt-5 p-2">
            <FiltersBar
                v-model:search="search"
                v-model:perPage="perPage"
                v-model:status="status"
                :pagination="props.pagination"
                name="Developers"
            >
                <template #actions>
                    <DeveloperModal
                        :developer="selectedDeveloper"
                        @close="selectedDeveloper = null"
                    />
                </template>
            </FiltersBar>

            <!-- Table -->
            <TableDevelopers
                :developers="props.developers"
                @edit="handleEdit"
            />

            <!-- Pagination -->
            <TablePagination
                :pagination="pagination"
                @change-page="changePage"
            />
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import FiltersBar from '@/components/table/FiltersBar.vue';
import TablePagination  from '@/components/table/TablePagination.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import TableDevelopers from '@/pages/developers/TableDevelopers.vue';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, Developer } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';
import DeveloperModal from './DeveloperModal.vue';

import { watchDebounced } from '@vueuse/core';

// Use defineOptions to declare component options when using <script setup>
defineOptions({ name: 'DevelopersIndex' });

// Recibir los datos de los desarrolladores y filtros desde el controlador
const props = defineProps<{
    developers: Developer[];
    pagination?: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
        from: number;
        to: number;
    };
    filters?: {
        search: string;
        perPage: number | string;
        status: 'all' | 'active' | 'inactive';
    };
}>();

// Estado para el developer seleccionado
const selectedDeveloper = ref<Developer | null>(null);

// Manejar la edicion
function handleEdit(developer: Developer) {
    selectedDeveloper.value = developer;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Developers',
        href: '/developers',
    },
];

// Inicializar filtros con los valores del backend
const search = ref(props.filters?.search || '');
const perPage = ref<number | string>(props.filters?.perPage || 10);
const status = ref<'all' | 'active' | 'inactive'>(
    props.filters?.status || 'all',
);

// Función para aplicar filtros
function applyFilters(page: number = 1) {
    router.get(
        '/developer',
        {
            search: search.value,
            perPage: perPage.value,
            status: status.value,
            page: page,
        },
        {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        },
    );
}

// Función para cambiar de página
function changePage(page: number) {
    applyFilters(page);
}

// Watch con debounce para search (espera 500ms después de que el usuario deje de escribir)
watchDebounced(
    search,
    () => {
        applyFilters(1);
    },
    { debounce: 500 },
);

// Watch inmediato para perPage y status
watch([perPage, status], () => {
    applyFilters(1);
});
</script>
