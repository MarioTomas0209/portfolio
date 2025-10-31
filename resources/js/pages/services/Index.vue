<script setup lang="ts">
import FiltersBar from '@/components/table/FiltersBar.vue';
import TablePagination from '@/components/table/TablePagination.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import TableServices from '@/pages/services/TableServices.vue';
import ServiceModal from './ServiceModal.vue';

import { dashboard } from '@/routes';
import type { BreadcrumbItem, Service } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import { watchDebounced } from '@vueuse/core';
import { ref, watch } from 'vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Services',
        href: '/services',
    },
];

// Recicibir los datos de los servicios y filtros desde el controlador
const props = defineProps<{
    services: Service[];
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

// unicializar filtros con los valores del backend
const search = ref(props.filters?.search || '');
const perPage = ref<number | string>(props.filters?.perPage || 10);
const status = ref<'all' | 'active' | 'inactive'>(
    props.filters?.status || 'all',
);

// Funcion para aplicar filtros
function applyFilters(page: number = 1) {
    router.get(
        '/service',
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

// Estado para el servicio seleccionado
const selectedService = ref<Service | null>(null);

// Manejar edicion
function handleEdit(service: Service) {
    selectedService.value = service;
}

// Funcion para cambiar de pagina
const changePage = (page: number) => {
    applyFilters(page);
};

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

<template>
    <Head title="Services" />
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="mt-5 p-2">
            <!-- Filtros -->
            <FiltersBar
                v-model:search="search"
                v-model:perPage="perPage"
                v-model:status="status"
                :pagination="props.pagination"
                name="Services"
            >
                <template #actions>
                    <ServiceModal
                        :service="selectedService"
                        @close="selectedService = null"
                    />
                </template>
            </FiltersBar>

            <!-- Tabla -->
            <TableServices 
                :services="props.services" 
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
