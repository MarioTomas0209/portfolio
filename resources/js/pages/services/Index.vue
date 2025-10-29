<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import ServiceModal from './ServiceModal.vue';
import TableServices from '@/pages/services/TableServices.vue';
import FiltersBar from '@/components/table/FiltersBar.vue';

import { dashboard } from '@/routes';
import type { BreadcrumbItem, Service } from '@/types';
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';

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

                    />
                </template>
            </FiltersBar>

            <!-- Tabla -->
             <TableServices />
        </div>
    </AppLayout>
</template>
