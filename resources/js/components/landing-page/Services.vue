<script setup lang="ts">
import { Service } from '@/types';

const props = defineProps<{
    services: Service[];
}>();
console.log(props.services);

</script>

<template>
    <section class="w-full mt-5">
        <div class="mx-auto max-w-7xl">

            <div class="mb-12 text-center">
                <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                    Nuestros servicios
                </h2>
                <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                    Ofrecemos soluciones tecnológicas completas para impulsar tu negocio hacia el futuro digital
                </p>
            </div>

            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="service in props.services" :key="service.id"
                    class="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-gray-800">
                    <div :style="{ background: service.color }"
                        class="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-5">
                    </div>

                    <div :style="{ background: service.color }"
                        class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r text-white shadow-lg">
                        <i :class="`${service.icon} text-xl`"></i>
                    </div>

                    <div class="relative z-10">
                        <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                            {{ service.title }}
                        </h3>

                        <p class="mb-4 text-gray-600 dark:text-gray-300">
                            {{ service.description }}
                        </p>

                        <ul class="space-y-2">
                            <li v-for="feature in service.features" :key="feature"
                                class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <div :style="{ background: service.color }"
                                    class="mr-2 h-1.5 w-1.5 rounded-full bg-gradient-to-r"></div>
                                {{ feature }}
                            </li>
                        </ul>

                    </div>


                    <div :style="{ background: service.color }"
                        class="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100">
                    </div>

                </div>
            </div>

        </div>
    </section>
</template>