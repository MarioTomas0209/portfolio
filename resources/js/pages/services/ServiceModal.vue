<script setup lang="ts">
import { useServiceForm } from '@/composables/useServiceForm';

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
import Switch from '@/components/ui/switch/Switch.vue';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import { Plus, X } from 'lucide-vue-next';
import { Spinner } from "@/components/ui/spinner"

const {
    // Propities
    isOpen,
    newFeature,
    formData,
    validationErrors,
    isSubmitting,

    // Methods
    addFeature,
    removeFeature,
    onSubmit,
    resetForm,
} = useServiceForm();
</script>

<template>
    <Dialog v-model:open="isOpen" @update:open="resetForm">
        <DialogTrigger>
            <Button variant="orange">
                <Plus />
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-3xl">
            <DialogTitle> Create new Service </DialogTitle>
            <DialogDescription>
                Complete the details to create a new service.
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
                <!-- Icon and Color -->
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    <div class="space-y-1">
                        <Label for="color"
                            >Color<span class="font-bold text-red-500"
                                >*</span
                            ></Label
                        >
                        <Input
                            type="text"
                            placeholder="Ex: from-blue-500 to-blue-600"
                            v-model="formData.color"
                            :class="{ 'border-red-500': validationErrors.color }"
                            required
                        />
                        <p
                            v-if="validationErrors.color"
                            class="text-sm text-red-500"
                        >
                            {{ validationErrors.color }}
                        </p>
                    </div>
                </div>
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
                            :class="{ 'border-red-500': validationErrors.features }"
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

                    <p v-if="validationErrors.features" class="text-sm text-red-500">
                        {{ validationErrors.features }}
                    </p>

                    <!-- Features list -->
                    <div v-if="formData.features.length" class="mt-3 space-y-2">
                        <div
                            v-for="(feature, item) in formData.features"
                            :key="item"
                            class="flex items-center justify-between rounded border bg-gray-50 dark:bg-gray-900 p-2"
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
                        {{  isSubmitting ? 'Saving...' : 'Save'  }}
                        <Spinner v-if="isSubmitting" />
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
</template>
