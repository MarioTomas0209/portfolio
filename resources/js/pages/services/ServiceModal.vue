<script setup lang="ts">
import { useServiceForm } from '@/composables/service/useServiceForm';

import Button from '@/components/ui/button/Button.vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import { Spinner } from '@/components/ui/spinner';
import Switch from '@/components/ui/switch/Switch.vue';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import { useColor } from '@/composables/service/useColor';
import { Service } from '@/types';
import { Plus, X } from 'lucide-vue-next';
import { watch } from 'vue';

// Emitir evento cuando se cierre
const emit = defineEmits<{
    close: [];
}>();

const {
    // Propities
    isOpen,
    newFeature,
    formData,
    validationErrors,
    isSubmitting,
    isEditMode,

    // Methods
    addFeature,
    removeFeature,
    onSubmit,
    resetForm,
    loadService,
} = useServiceForm(emit);

const {
    // Propities
    startColor,
    endColor,
    // Methods
    gradientPreview,
    presetColors,
    applyPreset,
} = useColor();

// Recibir el servicio para editar
const props = defineProps<{
    service?: Service | null;
}>();

// Observar cambios en la prop service y cargar los datos
watch(
    () => props.service,
    (newService) => {
        if (newService) {
            loadService(newService);
        }
    },
    { immediate: true },
);
</script>

<template>
    <Dialog v-model:open="isOpen" @update:open="resetForm">
        <DialogTrigger asChild @click="isOpen = true">
            <Button variant="orange">
                <Plus />
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-3xl">
            <DialogTitle>
                {{ isEditMode ? 'Edit Service' : 'Create new Service' }}
            </DialogTitle>
            <DialogDescription>
                Complete the details to {{ isEditMode ? 'edit' : 'create' }} a
                new service.
            </DialogDescription>

            <form @submit.prevent="onSubmit" class="grid gap-4">
                <!-- Title and description -->
                <div class="flex items-start justify-between gap-6">
                    <div class="flex-grow space-y-1">
                        <Label for="name"
                            >Title<span class="font-bold text-red-500"
                                >*</span
                            ></Label
                        >
                        <Input
                            placeholder="Ex: Desarrollo Web"
                            v-model="formData.title"
                            :class="{
                                'border-red-500': validationErrors.title,
                            }"
                            required
                        />
                        <p
                            v-if="validationErrors.title"
                            class="text-sm text-red-500"
                        >
                            {{ validationErrors.title }}
                        </p>
                    </div>
                    <div class="flex items-center pt-5">
                        <Switch id="isActive" v-model="formData.is_active" />
                        <Label for="isActive" class="ml-2">Is Active</Label>
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <!-- Description -->
                    <div class="space-y-1">
                        <Label for="description"
                            >Description<span class="font-bold text-red-500"
                                >*</span
                            ></Label
                        >
                        <Textarea
                            placeholder="Ex: Servicio de desarrollo web a medida"
                            :class="{
                                'border-red-500': validationErrors.description,
                            }"
                            v-model="formData.description"
                            required
                        />
                        <p
                            v-if="validationErrors.description"
                            class="text-sm text-red-500"
                        >
                            {{ validationErrors.description }}
                        </p>
                    </div>
                    <!-- Icon -->
                    <div class="space-y-1">
                        <Label for="icon"
                            >Icon<span class="font-bold text-red-500"
                                >*</span
                            ></Label
                        >
                        <Input
                            placeholder="Ex: fa-solid fa-code"
                            v-model="formData.icon"
                            required
                        />
                        <p
                            v-if="validationErrors.icon"
                            class="text-sm text-red-500"
                        >
                            {{ validationErrors.icon }}
                        </p>
                    </div>
                </div>

                <!-- Color -->
                <div class="space-y-3">
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <!-- Preview de color -->
                        <div class="space-y-2">
                            <div
                                :style="{ background: gradientPreview }"
                                class="h-16 w-full rounded-lg border-2 border-gray-200 shadow-sm"
                            ></div>
                            <p
                                class="font-mono text-xs break-all text-gray-500"
                            >
                                {{ gradientPreview }}
                            </p>
                        </div>

                        <!-- Selectores de color -->
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <Label for="startColor" class="text-sm"
                                    >Start Color</Label
                                >
                                <div class="flex gap-2">
                                    <Input
                                        id="startColor"
                                        type="color"
                                        v-model="startColor"
                                        class="h-10 w-16 cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        v-model="startColor"
                                        placeholder="#3b82f6"
                                        class="flex-1 font-mono text-sm"
                                    />
                                </div>
                            </div>

                            <div class="space-y-2">
                                <Label for="endColor" class="text-sm"
                                    >End Color</Label
                                >
                                <div class="flex gap-2">
                                    <Input
                                        id="endColor"
                                        type="color"
                                        v-model="endColor"
                                        class="h-10 w-16 cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        v-model="endColor"
                                        placeholder="#2563eb"
                                        class="flex-1 font-mono text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="grid grid-cols-1 items-center gap-4 sm:grid-cols-2"
                    >
                        <!-- Colores predefinidos -->
                        <div class="space-y-2">
                            <Label class="text-sm">Quick Presets</Label>
                            <div class="flex flex-wrap gap-2">
                                <button
                                    v-for="preset in presetColors"
                                    :key="preset.name"
                                    type="button"
                                    @click="applyPreset(preset)"
                                    :title="preset.name"
                                    :style="{
                                        background: `linear-gradient(to right, ${preset.start}, ${preset.end})`,
                                    }"
                                    class="h-8 w-8 rounded-md border-2 border-gray-200 shadow-sm transition-all duration-200 hover:scale-110 hover:border-gray-400"
                                ></button>
                            </div>
                        </div>
                        <div>
                            <Label for="color"
                                >Color<span class="font-bold text-red-500"
                                    >*</span
                                ></Label
                            >
                            <Input
                                type="text"
                                placeholder="Ex: linear-gradient(to right, #ec4899, #db2777)"
                                v-model="formData.color"
                                :class="{
                                    'border-red-500': validationErrors.color,
                                }"
                                required
                            />
                        </div>
                    </div>
                    <p
                        v-if="validationErrors.color"
                        class="text-sm text-red-500"
                    >
                        {{ validationErrors.color }}
                    </p>
                </div>

                <!-- Features -->
                <div class="space-y-1">
                    <Label for="features"
                        >Features<span class="font-bold text-red-500"
                            >*</span
                        ></Label
                    >
                    <!-- Input for features -->
                    <div class="flex gap-2">
                        <Input
                            type="text"
                            v-model="newFeature"
                            placeholder="Ex: Diseño responsive"
                            @keypress.enter.prevent="addFeature"
                            :class="{
                                'border-red-500': validationErrors.features,
                            }"
                        />
                        <Button
                            type="button"
                            @click="addFeature"
                            class="shrink-0"
                            variant="blue"
                        >
                            Add
                        </Button>
                    </div>

                    <p
                        v-if="validationErrors.features"
                        class="text-sm text-red-500"
                    >
                        {{ validationErrors.features }}
                    </p>

                    <!-- Features list -->
                    <div v-if="formData.features.length" class="mt-3 space-y-2">
                        <div
                            v-for="(feature, item) in formData.features"
                            :key="item"
                            class="flex items-center justify-between rounded border bg-gray-50 p-2 dark:bg-gray-900"
                        >
                            <span>{{ feature }}</span>
                            <Button
                                type="button"
                                @Click="removeFeature(item)"
                                variant="red"
                            >
                                <X />
                            </Button>
                        </div>
                    </div>
                    <p v-else class="text-sm text-gray-600 dark:text-gray-400">
                        Press 'Enter' or click 'Add' to include the feature.
                    </p>
                </div>

                <div class="mt-5 flex justify-end">
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
