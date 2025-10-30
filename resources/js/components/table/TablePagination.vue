<script setup lang="ts">
import { computed } from 'vue';
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
import { Button } from '@/components/ui/button';

interface PaginationData {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from?: number;
    to?: number;
}

interface Props {
    pagination?: PaginationData; // ✅ Hacer opcional con ?
    siblingCount?: number;
    showEdges?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    siblingCount: 1,
    showEdges: true,
});

const emit = defineEmits<{
    changePage: [page: number];
}>();

// ✅ Verificar que pagination existe
const paginationItems = computed(() => {
    if (!props.pagination) return [];
    
    const items = [];
    const { current_page, last_page } = props.pagination;
    const { siblingCount } = props;

    // ... resto del código igual
    const leftSiblingIndex = Math.max(current_page - siblingCount, 1);
    const rightSiblingIndex = Math.min(current_page + siblingCount, last_page);

    const shouldShowLeftEllipsis = leftSiblingIndex > 2;
    const shouldShowRightEllipsis = rightSiblingIndex < last_page - 1;

    if (props.showEdges) {
        items.push({ type: 'page', value: 1 });
    }

    if (shouldShowLeftEllipsis) {
        items.push({ type: 'ellipsis', value: 'left-ellipsis' });
    } else if (!props.showEdges && leftSiblingIndex > 1) {
        for (let i = 1; i < leftSiblingIndex; i++) {
            items.push({ type: 'page', value: i });
        }
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        if (i !== 1 && i !== last_page) {
            items.push({ type: 'page', value: i });
        }
    }

    if (shouldShowRightEllipsis) {
        items.push({ type: 'ellipsis', value: 'right-ellipsis' });
    } else if (!props.showEdges && rightSiblingIndex < last_page) {
        for (let i = rightSiblingIndex + 1; i < last_page; i++) {
            items.push({ type: 'page', value: i });
        }
    }

    if (props.showEdges && last_page > 1) {
        items.push({ type: 'page', value: last_page });
    }

    return items;
});

const changePage = (page: number) => {
    if (!props.pagination) return; // ✅ Guard
    
    if (page !== props.pagination.current_page && page >= 1 && page <= props.pagination.last_page) {
        emit('changePage', page);
    }
};

const paginationInfo = computed(() => {
    if (!props.pagination) return ''; // ✅ Guard
    
    const { from, to, total } = props.pagination;
    if (from && to) {
        return `Showing ${from} to ${to} of ${total} results`;
    }
    return `Total: ${total} results`;
});
</script>

<template>
    <!-- ✅ Verificar que pagination existe -->
    <div
        v-if="pagination && pagination.last_page > 1"
        class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
        <!-- Info text -->
        <p class="text-sm text-gray-600 hidden">
            {{ paginationInfo }}
        </p>

        <!-- Pagination Controls -->
        <Pagination
            :total="pagination.total"
            :itemsPerPage="pagination.per_page"
            :page="pagination.current_page"
            :sibling-count="siblingCount"
            :show-edges="showEdges"
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
                        :value="Number(item.value)"
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
</template>