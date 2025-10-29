<![CDATA[<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const props = defineProps<{
    isOpen: boolean;
    pdfUrl: string;
    title?: string;
}>();

const emit = defineEmits<{
    'update:isOpen': [value: boolean]
}>();

const updateOpen = (value: boolean) => {
    emit('update:isOpen', value);
};
</script>]]>

<![CDATA[<template>
    <Dialog :open="isOpen" @update:open="updateOpen">
        <DialogContent class="sm:max-w-[90vw] sm:h-[90vh]">
            <DialogHeader>
                <DialogTitle>{{ title || 'View PDF' }}</DialogTitle>
            </DialogHeader>
            <div class="h-full">
                <iframe
                    :src="pdfUrl"
                    class="w-full h-[calc(90vh-80px)]"
                    frameborder="0"
                />
            </div>
        </DialogContent>
    </Dialog>
</template>]]>