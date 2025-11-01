<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, User, MessageCircle } from 'lucide-vue-next';

const formData = ref({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
});

const isSubmitting = ref(false);

const handleSubmit = async (e: Event) => {
    e.preventDefault();
    isSubmitting.value = true;
    
    // Simular envío
    setTimeout(() => {
        console.log('Form data:', formData.value);
        isSubmitting.value = false;
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        // Reset form
        formData.value = {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
        };
    }, 1000);
};
</script>

<template>
    <section class="w-full mt-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Header -->
            <div class="mb-12 text-center">
                <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                    Contáctanos
                </h2>
                <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                    ¿Tienes un proyecto en mente? Estamos listos para ayudarte a hacerlo realidad
                </p>
            </div>

            <!-- Form Container -->
            <div class="mx-auto max-w-2xl">
                <div class="overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
                    <!-- Decorative Header -->
                    <div class="relative h-32 overflow-hidden bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600">
                        <!-- Decorative circles -->
                        <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
                        <div class="absolute -bottom-5 -left-5 h-32 w-32 rounded-full bg-white/10"></div>
                        <div class="absolute right-20 top-10 h-20 w-20 rounded-full bg-white/10"></div>
                        
                        <div class="relative flex h-full items-center justify-center">
                            <div class="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                                <Mail class="h-12 w-12 text-white" />
                            </div>
                        </div>
                    </div>

                    <!-- Form Content -->
                    <form @submit="handleSubmit" class="p-8 sm:p-12">
                        <div class="space-y-6">
                            <!-- Nombre -->
                            <div class="group relative">
                                <div class="absolute left-3 top-[2.1rem] z-10 transition-all duration-300 group-focus-within:text-blue-600">
                                    <User class="h-5 w-5 text-gray-400" />
                                </div>
                                <Label for="name" class="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    Nombre completo
                                </Label>
                                <Input
                                    id="name"
                                    v-model="formData.name"
                                    type="text"
                                    required
                                    placeholder="Ej: Juan Pérez"
                                    class="pl-11 transition-all duration-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <!-- Email y Teléfono en grid responsive -->
                            <div class="grid gap-6 sm:grid-cols-2">
                                <!-- Email -->
                                <div class="group relative">
                                    <div class="absolute left-3 top-[2.1rem] z-10 transition-all duration-300 group-focus-within:text-blue-600">
                                        <Mail class="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Label for="email" class="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Correo electrónico
                                    </Label>
                                    <Input
                                        id="email"
                                        v-model="formData.email"
                                        type="email"
                                        required
                                        placeholder="ejemplo@correo.com"
                                        class="pl-11 transition-all duration-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <!-- Teléfono -->
                                <div class="group relative">
                                    <div class="absolute left-3 top-[2.1rem] z-10 transition-all duration-300 group-focus-within:text-blue-600">
                                        <Phone class="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Label for="phone" class="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Teléfono
                                    </Label>
                                    <Input
                                        id="phone"
                                        v-model="formData.phone"
                                        type="tel"
                                        placeholder="+52 123 456 7890"
                                        class="pl-11 transition-all duration-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <!-- Asunto -->
                            <div class="group relative">
                                <Label for="subject" class="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    Asunto
                                </Label>
                                <Input
                                    id="subject"
                                    v-model="formData.subject"
                                    type="text"
                                    required
                                    placeholder="¿En qué podemos ayudarte?"
                                    class="transition-all duration-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <!-- Mensaje -->
                            <div class="group relative">
                                <div class="absolute left-3 top-[3.5rem] z-10 transition-all duration-300 group-focus-within:text-blue-600">
                                    <MessageCircle class="h-5 w-5 text-gray-400" />
                                </div>
                                <Label for="message" class="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    Mensaje
                                </Label>
                                <Textarea
                                    id="message"
                                    v-model="formData.message"
                                    required
                                    placeholder="Cuéntanos más sobre tu proyecto..."
                                    rows="6"
                                    class="min-h-[120px] pl-11 transition-all duration-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <!-- Submit Button -->
                            <div class="pt-4">
                                <Button
                                    type="submit"
                                    :disabled="isSubmitting"
                                    class="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <span v-if="!isSubmitting" class="relative z-10 flex items-center justify-center gap-2">
                                        Enviar mensaje
                                        <Mail class="h-5 w-5" />
                                    </span>
                                    <span v-else class="relative z-10">Enviando...</span>
                                    <!-- Animated gradient background -->
                                    <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></span>
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>