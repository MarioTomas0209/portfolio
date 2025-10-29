<template>
    <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
            <div>
                <Input v-model="searchLocal" placeholder="Search..." />
            </div>

            <div>
                <Select v-model="perPageLocal">
                    <SelectTrigger>
                        <SelectValue :placeholder="String(perPageLocal)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            v-for="opt in perPageOptions"
                            :key="opt"
                            :value="opt"
                        >
                            {{ opt }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Select v-model="statusLocal">
                    <SelectTrigger>
                        <SelectValue :placeholder="statusPlaceholder" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            v-for="opt in statusOptionsToUse"
                            :key="String(opt.value)"
                            :value="opt.value"
                        >
                            {{ opt.label }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ props.pagination?.total ?? 0 }} {{ props.name ?? 'Items' }}
            </div>
        </div>

        <slot name="actions" />
    </div>
</template>

<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { computed, defineProps, ref, watch } from 'vue';

type StatusOption = { label: string; value: any };

type Props = {
    search?: string;
    perPage?: number | string;
    status?: string | number | null;
    perPageOptions?: (number | string)[];
    statusOptions?: StatusOption[];
    pagination?: {
        total: number;
    };
    name?: string;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'update:search', value: string): void;
    (e: 'update:perPage', value: number | string): void;
    (e: 'update:status', value: any): void;
}>();

// Provide runtime defaults here to avoid Volar typing issues
const searchLocal = ref(props.search ?? '');
const perPageLocal = ref<number | string>(props.perPage ?? 10);
const statusLocal = ref<any>(props.status ?? 'all');

watch(searchLocal, (v) => emit('update:search', v));
watch(perPageLocal, (v) => emit('update:perPage', v));
watch(statusLocal, (v) => emit('update:status', v));

const perPageOptions = computed(
    () => props.perPageOptions ?? [10, 25, 50, 100],
);
const statusOptionsToUse = computed<StatusOption[]>(() => {
    return props.statusOptions && props.statusOptions.length
        ? props.statusOptions
        : [
              { label: 'All', value: 'all' },
              { label: 'Active', value: 1 },
              { label: 'Inactive', value: 0 },
          ];
});

const statusPlaceholder = computed(() => {
    const opt = statusOptionsToUse.value.find(
        (o) => o.value === statusLocal.value,
    );
    if (opt) return opt.label;
    return statusOptionsToUse.value.length
        ? statusOptionsToUse.value[0].label
        : 'All';
});
</script>

<style scoped>
/* small spacing tweaks if needed */
</style>
