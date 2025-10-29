<template>
    <Dialog v-model:open="isOpen" @update:open="onOpenChange">
        <DialogTrigger asChild @click="isOpen = true">
            <Button variant="orange">
                <Plus />
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-3xl">
            <!-- Mensaje de error general si existe -->
            <p v-if="validationErrors.submit" class="mb-4 text-sm text-red-500">
                {{ validationErrors.submit }}
            </p>
            <DialogTitle>
                {{ isEditMode ? 'Edit Developer' : 'Create New Developer' }}
            </DialogTitle>
            <DialogDescription>
                Fill in the details to create a new developer profile.
            </DialogDescription>

            <form @submit.prevent="onSubmit" class="grid gap-4">
                <!-- Name and Job Inputs -->
                <div class="mb-1 grid gap-4 md:grid-cols-2">
                    <div>
                        <div class="flex items-center gap-1">
                            <Label for="name" class="label">Name</Label>
                            <span class="font-bold text-red-500">*</span>
                        </div>
                        <Input
                            placeholder="ex: Mario Tomas"
                            class="input w-full"
                            :class="{ 'border-red-500': validationErrors.name }"
                            v-model="formData.name"
                            required
                        />
                        <p
                            v-if="validationErrors.name"
                            class="mt-1 text-sm text-red-500"
                        >
                            {{ validationErrors.name }}
                        </p>
                    </div>
                    <div>
                        <Label for="job" class="label mb-2">Job</Label>
                        <Input
                            placeholder="ex: Software Engineer"
                            class="input w-full"
                            v-model="formData.job"
                        />
                    </div>
                </div>
                <!-- Location and Portfolio Inputs -->
                <div class="mb-1 grid gap-4 md:grid-cols-2">
                    <div>
                        <Label for="location" class="label">Location</Label>
                        <Input
                            v-model="formData.location"
                            placeholder="ex: San Francisco"
                            class="input"
                        />
                    </div>
                    <div>
                        <Label for="portfolio" class="label">Portfolio</Label>
                        <Input
                            v-model="formData.portfolio"
                            placeholder="ex: https://github.com/username"
                            class="input"
                            :class="{
                                'border-red-500': validationErrors.portfolio,
                            }"
                        />
                        <p
                            v-if="validationErrors.portfolio"
                            class="mt-1 text-sm text-red-500"
                        >
                            {{ validationErrors.portfolio }}
                        </p>
                    </div>
                </div>
                <!-- GitHub and LinkedIn Inputs -->
                <div class="mb-1 grid gap-4 md:grid-cols-2">
                    <div>
                        <Label for="github" class="label">GitHub</Label>
                        <Input
                            v-model="formData.github"
                            placeholder="ex: https://github.com/username"
                            class="input w-full"
                            :class="{
                                'border-red-500': validationErrors.github,
                            }"
                        />
                        <p
                            v-if="validationErrors.github"
                            class="mt-1 text-sm text-red-500"
                        >
                            {{ validationErrors.github }}
                        </p>
                    </div>
                    <div>
                        <Label for="linkedin" class="label">LinkedIn</Label>
                        <Input
                            v-model="formData.linkedin"
                            placeholder="ex: https://linkedin.com/in/username"
                            class="input w-full"
                            :class="{
                                'border-red-500': validationErrors.linkedin,
                            }"
                        />
                        <p
                            v-if="validationErrors.linkedin"
                            class="mt-1 text-sm text-red-500"
                        >
                            {{ validationErrors.linkedin }}
                        </p>
                    </div>
                </div>
                <!-- WhatsApp and email Inputs -->
                <div class="mb-1 grid gap-4 md:grid-cols-2">
                    <div>
                        <Label for="whatsapp" class="label">WhatsApp</Label>
                        <Input
                            v-model="formData.whatsapp"
                            placeholder="ex: +1234567890"
                            class="input w-full"
                            :class="{
                                'border-red-500': validationErrors.whatsapp,
                            }"
                        />
                        <p
                            v-if="validationErrors.whatsapp"
                            class="mt-1 text-sm text-red-500"
                        >
                            {{ validationErrors.whatsapp }}
                        </p>
                    </div>
                    <div>
                        <Label for="email" class="label">Email</Label>
                        <Input
                            v-model="formData.email"
                            placeholder="ex: user@example.com"
                            class="input w-full"
                            :class="{
                                'border-red-500': validationErrors.email,
                            }"
                        />
                        <p
                            v-if="validationErrors.email"
                            class="mt-1 text-sm text-red-500"
                        >
                            {{ validationErrors.email }}
                        </p>
                    </div>
                </div>
                <!-- Facebook and Instagram Inputs -->
                <div class="mb-1 grid gap-4 md:grid-cols-2">
                    <div>
                        <Label for="facebook" class="label">Facebook</Label>
                        <Input
                            v-model="formData.facebook"
                            placeholder="ex: https://facebook.com/username"
                            class="input w-full"
                            :class="{
                                'border-red-500': validationErrors.facebook,
                            }"
                        />
                        <p
                            v-if="validationErrors.facebook"
                            class="mt-1 text-sm text-red-500"
                        >
                            {{ validationErrors.facebook }}
                        </p>
                    </div>
                    <div>
                        <Label for="instagram" class="label">Instagram</Label>
                        <Input
                            v-model="formData.instagram"
                            placeholder="ex: https://instagram.com/username"
                            class="input w-full"
                            :class="{
                                'border-red-500': validationErrors.instagram,
                            }"
                        />
                        <p
                            v-if="validationErrors.instagram"
                            class="mt-1 text-sm text-red-500"
                        >
                            {{ validationErrors.instagram }}
                        </p>
                    </div>
                </div>
                <!-- cv and isActive Inputs -->
                <div class="mb-1 grid gap-4 md:grid-cols-2">
                    <div>
                        <Label for="image" class="label">Image</Label>
                        <Input
                            v-model="formData.image"
                            placeholder="ex: https://github.com/username.png"
                            class="input"
                            :class="{
                                'border-red-500': validationErrors.image,
                            }"
                        />
                        <p
                            v-if="validationErrors.image"
                            class="mt-1 text-sm text-red-500"
                        >
                            {{ validationErrors.image }}
                        </p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <Switch id="isActive" v-model="formData.is_active" />
                        <Label for="isActive">Is Active</Label>
                    </div>
                </div>
                <!-- cv Inputs -->
                <div class="">
                    <Label for="cv" class="label">CV</Label>
                    
                    <!-- Mostrar CV actual si existe -->
                    <div v-if="currentCvUrl && !selectedFileName" class="mb-2 flex items-center gap-2 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
                        <FileText class="h-5 w-5 text-green-500" />
                        <a 
                            :href="currentCvUrl" 
                            target="_blank"
                            class="flex-1 text-sm text-blue-600 hover:underline"
                        >
                            Ver CV actual
                        </a>
                        <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            @click="handleRemoveCv"
                        >
                            <Trash2 class="h-4 w-4" />
                        </Button>
                    </div>

                    <!-- Input para subir nuevo CV -->
                    <Input
                        type="file"
                        accept=".pdf,application/pdf"
                        class="input"
                        @change="handleFileChange"
                    />
                    <p
                        v-if="selectedFileName"
                        class="mt-1 text-sm text-green-600"
                    >
                        Nuevo archivo seleccionado: {{ selectedFileName }}
                    </p>
                    <p v-else-if="!currentCvUrl" class="mt-1 text-xs text-gray-500">
                        PDF file, max 2MB
                    </p>
                </div>

                <div class="flex justify-end gap-2">
                    <Button
                        type="submit"
                        variant="orange"
                        :disabled="isSubmitting"
                    >
                        {{ isSubmitting ? 'Saving...' : 'Save' }}
                        <Spinner v-if="isSubmitting" />
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import Switch from '@/components/ui/switch/Switch.vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useDeveloperForm } from '@/composables/useDeveloperForm';
import { Plus, FileText, Trash2 } from 'lucide-vue-next';
import type { Developer } from '@/types';
import { watch } from 'vue';
import { Spinner } from "@/components/ui/spinner";

// Recibir el developer para editar
const props = defineProps<{
    developer?: Developer | null;
}>();

// Emitir evento cuando se cierre
const emit = defineEmits<{
    close: []
}>();

const {
    isOpen,
    formData,
    isSubmitting,
    validationErrors,
    selectedFileName,
    currentCvUrl,
    isEditMode,
    onSubmit,
    handleFileChange,
    handleRemoveCv,
    onOpenChange,
    loadDeveloper,
} = useDeveloperForm(emit);

// Observar cambios en la prop developer y cargar los datos
watch(() => props.developer, (newDeveloper) => {
    if (newDeveloper) {
        loadDeveloper(newDeveloper);
    }
}, { immediate: true });

</script>
