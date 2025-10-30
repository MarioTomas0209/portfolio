<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Service } from '@/types';
import { Edit, Trash2 } from 'lucide-vue-next';

// Recibir los datos de los servicios enviados desde el compoenente padre
const props = defineProps<{
    services: Array<Service>;
}>();
</script>

<template>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Color</TableHead>
                <TableHead class="text-center">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="service in services" :key="service.id">
                <TableCell class="font-bold">{{ service.id }}</TableCell>
                <TableCell>
                    <span>
                        <span
                            class="mr-1 inline-flex h-2 w-2 rounded-full"
                            :class="{
                                'bg-green-500': service.is_active,
                                'bg-red-500': !service.is_active,
                            }"
                        >
                        </span>
                        {{ service.is_active ? 'Active' : 'Inactive' }}
                    </span>
                </TableCell>
                <TableCell>
                    <p class="text-xs">{{ service.title }}</p>
                </TableCell>
                <TableCell>
                    <p
                        class="max-w-xs truncate text-sm"
                        :title="service.description"
                    >
                        {{ service.description }}
                    </p>
                </TableCell>
                <TableCell>
                    <span
                        class="cursor-help text-sm text-gray-600"
                        :title="service.features.join(', ')"
                    >
                        {{ service.features.length }} feature{{
                            service.features.length !== 1 ? 's' : ''
                        }}
                    </span>
                </TableCell>
                <TableCell>
                    <i :class="`${service.icon} text-xl`"></i>
                </TableCell>
                <TableCell>
                    <span
                        :class="`block h-6 w-6 rounded-full bg-gradient-to-r ${service.color}`"
                    ></span>
                </TableCell>
                <TableCell class="text-center">
                    <div class="flex items-center justify-center gap-2">
                        <Button
                            variant="yellow"
                            size="sm"
                            title="Edit"
                            aria-label="Edit Service"
                        >
                            <Edit />
                        </Button>
                        <Button
                            variant="red"
                            size="sm"
                            title="Delete"
                            aria-label="Delete Service"
                        >
                            <Trash2 />
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>
