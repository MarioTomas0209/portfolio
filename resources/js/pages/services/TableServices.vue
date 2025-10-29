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
import { Edit, Trash2 } from 'lucide-vue-next';
</script>

<template>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Color</TableHead>
                <TableHead class="text-center">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell class="font-bold">1</TableCell>
                <TableCell>
                    <span>
                        <span
                            class="mr-1 inline-flex h-2 w-2 rounded-full bg-green-500"
                        >
                        </span>
                        Active
                    </span>
                </TableCell>
                <TableCell>Desarrollo Web</TableCell>
                <TableCell>
                    <p
                        class="text-sm"
                        title="Creamos sitios web modernos y responsivos que se adaptan a cualquier dispositivo."
                    >
                        Creamos sitios web modernos y...
                    </p>
                </TableCell>
                <TableCell>
                    <i class="fa-solid fa-circle-check text-xl"></i>
                </TableCell>
                <TableCell>
                    <ul class="list-disc space-y-1 pl-4">
                        <li class="text-sm">list1</li>
                        <li class="text-sm">list2</li>
                        <li class="text-sm">list3</li>
                        <li class="text-sm">list4</li>
                    </ul>
                </TableCell>
                <TableCell>
                    <span
                        class="block h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
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
