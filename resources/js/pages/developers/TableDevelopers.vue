<script setup lang="ts">
import Avatar from '@/components/ui/avatar/Avatar.vue';
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue';
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue';
import Button from '@/components/ui/button/Button.vue';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getInitials } from '@/composables/useInitials';
import { useDeleteDeveloper } from '@/composables/useDeleteDeveloper';
import { Developer } from '@/types';
import {
    BriefcaseBusiness,
    Facebook,
    FileText,
    Github,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    Edit,
    Trash2,
} from 'lucide-vue-next';
import { ref } from 'vue';

// Recibir los datos de los desarrolladores enviados desde el componente padre
const props = defineProps<{
    developers: Array<Developer>;
}>();

// Emit para comunicarse con el padre
const emit = defineEmits<{
    edit: [developer: Developer] 
}>();

// Estado para el visor de PDF
const isPdfViewerOpen = ref(false);
const currentPdfUrl = ref('');

// Composable para eliminar
const {
    isDeleting,
    showDeleteDialog,
    developerToDelete,
    confirmDelete,
    cancelDelete,
    executeDelete,
} = useDeleteDeveloper();

// Interfaces para los tipos de contacto
interface ContactInfo {
    type:
        | 'email'
        | 'facebook'
        | 'github'
        | 'linkedin'
        | 'whatsapp'
        | 'instagram';
    value: string;
    icon: any;
    href: string;
}

// Función para obtener la información de contacto formateada
const getContactInfo = (developer: Developer): ContactInfo[] => {
    const contacts: ContactInfo[] = [];

    if (developer.email) {
        contacts.push({
            type: 'email',
            value: developer.email,
            icon: Mail,
            href: `mailto:${developer.email}`,
        });
    }

    if (developer.whatsapp) {
        contacts.push({
            type: 'whatsapp',
            value: developer.whatsapp,
            icon: Phone,
            href: `https://wa.me/${developer.whatsapp.replace(/\D/g, '')}`,
        });
    }

    if (developer.facebook) {
        contacts.push({
            type: 'facebook',
            value: developer.facebook,
            icon: Facebook,
            href: developer.facebook,
        });
    }

    if (developer.github) {
        contacts.push({
            type: 'github',
            value: developer.github,
            icon: Github,
            href: developer.github,
        });
    }

    if (developer.linkedin) {
        contacts.push({
            type: 'linkedin',
            value: developer.linkedin,
            icon: Linkedin,
            href: developer.linkedin,
        });
    }

    if (developer.instagram) {
        contacts.push({
            type: 'instagram',
            value: developer.instagram,
            icon: Instagram,
            href: developer.instagram,
        });
    }

    return contacts;
};

</script>

<template>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contacts</TableHead>
                <TableHead>Portfolio</TableHead>
                <TableHead class="text-center">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="developer in developers" :key="developer.id">
                <TableCell class="font-bold"> {{ developer.id }} </TableCell>
                <TableCell>
                    <span>
                        <span
                            class="mr-1 inline-flex h-2 w-2 rounded-full"
                            :class="{
                                'bg-green-500': developer.is_active,
                                'bg-red-500': !developer.is_active,
                            }"
                        ></span>
                        {{ developer.is_active ? 'Active' : 'Inactive' }}
                    </span>
                </TableCell>
                <TableCell>
                    <Avatar class="h-8 w-8 overflow-hidden">
                        <AvatarImage
                            v-if="developer.image"
                            :src="developer.image"
                            :alt="developer.name"
                        />
                        <AvatarFallback
                            class="bg-neutral-200 font-semibold text-black dark:bg-neutral-700 dark:text-white"
                        >
                            {{ getInitials(developer.name) }}
                        </AvatarFallback>
                    </Avatar>
                </TableCell>
                <TableCell>{{ developer.name }}</TableCell>
                <TableCell>{{ developer.job ? developer.job : '-' }}</TableCell>
                <TableCell>
                    {{ developer.location ? developer.location : '-' }}
                </TableCell>
                <TableCell>
                    <div
                        v-if="getContactInfo(developer).length"
                        class="grid grid-cols-3 gap-1"
                    >
                        <span
                            v-for="contact in getContactInfo(developer)"
                            :key="contact.type"
                        >
                            <a
                                :href="contact.href"
                                class="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                                :title="contact.value"
                            >
                                <component :is="contact.icon" class="h-4 w-4" />
                            </a>
                        </span>
                    </div>
                    <span v-else>-</span>
                </TableCell>
                <TableCell>
                    <a
                        v-if="developer.portfolio"
                        :href="developer.portfolio"
                        class="text-blue-600 hover:underline flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <BriefcaseBusiness class="h-4 w-4 text-amber-950" /> Portfolio
                    </a>
                    <button
                        v-if="developer.cv"
                        class="flex cursor-pointer items-center gap-1 text-blue-600 hover:underline"
                        @click="
                            () => {
                                currentPdfUrl = developer.cv as string;
                                isPdfViewerOpen = true;
                            }
                        "
                    >
                        <FileText class="h-4 w-4 text-green-500" />
                        <span>View CV</span>
                    </button>
                </TableCell>
                <TableCell class="text-center">
                    <div class="flex items-center justify-center gap-2">
                        <Button
                            aria-label="Edit developer"
                            title="Edit"
                            size="sm"
                            variant="yellow"
                            @click="emit('edit', developer)"
                        >
                            <Edit class="h-4 w-4" />
                        </Button>

                        <Button
                            aria-label="Delete developer"
                            title="Delete"
                            size="sm"
                            variant="red"
                            @click="confirmDelete(developer)"
                        >
                            <Trash2 class="h-4 w-4" />
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>

    <!-- PDF Viewer -->
    <Dialog :open="isPdfViewerOpen" @update:open="isPdfViewerOpen = $event">
        <DialogContent class="max-w-6xl max-h-[90vh]">
            <div class="aspect-video w-full h-full">
                <iframe
                    :src="currentPdfUrl"
                    class="w-full h-full"
                    frameborder="0"
                />
            </div>
        </DialogContent>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <Dialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
        <DialogContent class="sm:max-w-md">
            <DialogTitle>Delete Developer</DialogTitle>
            <DialogDescription>
                Are you sure you want to delete <strong>{{ developerToDelete?.name }}</strong>?
                This action cannot be undone.
            </DialogDescription>
            
            <div class="mt-6 flex justify-end gap-3">
                <Button
                    variant="outline"
                    @click="cancelDelete"
                    :disabled="isDeleting"
                >
                    Cancel
                </Button>
                <Button
                    variant="destructive"
                    @click="executeDelete"
                    :disabled="isDeleting"
                >
                    {{ isDeleting ? 'Deleting...' : 'Delete' }}
                </Button>
            </div>
        </DialogContent>
    </Dialog>
</template>
