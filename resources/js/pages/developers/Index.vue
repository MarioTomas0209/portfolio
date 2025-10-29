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
            <div
                v-if="pagination && pagination.last_page > 1"
                class="mt-6 flex items-center justify-between"
            >
                <!-- Pagination Controls -->
                <Pagination
                    :total="pagination.total"
                    :itemsPerPage="pagination.per_page"
                    :page="pagination.current_page"
                    :sibling-count="1"
                    show-edges
                    @update:page="changePage"
                >
                    <PaginationContent>
                        <PaginationFirst />
                        <PaginationPrevious />

                        <template
                            v-for="(item, index) in paginationItems"
                            :key="index"
                        >
                            <PaginationItem
                                v-if="item.type === 'page'"
                                :value="item.value"
                                as-child
                            >
                                <Button
                                    :variant="
                                        item.value === pagination.current_page
                                            ? 'default'
                                            : 'outline'
                                    "
                                    size="icon"
                                >
                                    {{ item.value }}
                                </Button>
                            </PaginationItem>
                            <PaginationEllipsis v-else :index="index" />
                        </template>

                        <PaginationNext />
                        <PaginationLast />
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import FiltersBar from '@/components/table/FiltersBar.vue';
import Button from '@/components/ui/button/Button.vue';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationFirst,
    PaginationItem,
    PaginationLast,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
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

// Generar items de paginación
const paginationItems = computed(() => {
    if (!props.pagination) return [];

    const items: Array<{ type: 'page' | 'ellipsis'; value: number }> = [];
    const current = props.pagination.current_page;
    const last = props.pagination.last_page;
    const siblingCount = 1;

    // Siempre mostrar la primera página
    items.push({ type: 'page', value: 1 });

    // Calcular rango de páginas a mostrar
    const leftSibling = Math.max(current - siblingCount, 2);
    const rightSibling = Math.min(current + siblingCount, last - 1);

    // Agregar ellipsis izquierda si es necesario
    if (leftSibling > 2) {
        items.push({ type: 'ellipsis', value: -1 });
    }

    // Agregar páginas del medio
    for (let i = leftSibling; i <= rightSibling; i++) {
        items.push({ type: 'page', value: i });
    }

    // Agregar ellipsis derecha si es necesario
    if (rightSibling < last - 1) {
        items.push({ type: 'ellipsis', value: -2 });
    }

    // Siempre mostrar la última página (si hay más de una)
    if (last > 1) {
        items.push({ type: 'page', value: last });
    }

    return items;
});

// Watch con debounce para search (espera 500ms después de que el usuario deje de escribir)
watchDebounced(
    search,
    () => {
        applyFilters(1); // Resetear a página 1 al buscar
    },
    { debounce: 500 },
);

// Watch inmediato para perPage y status
watch([perPage, status], () => {
    applyFilters(1); // Resetear a página 1 al cambiar filtros
});
</script>
