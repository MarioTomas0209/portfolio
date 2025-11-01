<template>
    <Card class="w-80 border-3 border-blue-500 p-2">
        <CardHeader>
            <CardTitle>
                <img :src="props.developer.image" alt="Developer Image"
                    class="mx-auto h-40 w-40 rounded-full border-3 border-blue-500">
                <h1 class="text-center text-xl font-bold">{{ props.developer.name }}</h1>
                <p class="flex items-center justify-center gap-2 text-center text-sm font-normal">
                    <BriefcaseBusiness class="h-4 w-4 text-blue-500" />
                    {{ props.developer.job }}
                </p>
                <p
                    class="mt-1 flex items-center justify-center gap-2 text-center text-xs font-normal text-muted-foreground">
                    <MapPin class="h-4 w-4 text-yellow-500" />
                    {{ props.developer.location }}
                </p>
            </CardTitle>
        </CardHeader>

        <CardContent>
            <!-- Redes sociales -->
            <div class="flex items-center justify-center gap-3 flex-wrap">
                <a v-for="network in socialNetworks" :key="network.name" :href="network.href" target="_blank"
                    rel="noopener noreferrer" :title="network.name"
                    class="transition-transform duration-200 hover:scale-110">
                    <component :is="network.icon" :class="['h-5 w-5', network.color]" />
                </a>
            </div>
            <!-- CV y portafolio -->
            <div class="mt-4 flex flex-col items-center justify-center gap-2">
                <a v-if="props.developer.cv" :href="props.developer.cv as string" target="_blank"
                    rel="noopener noreferrer"
                    class="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 flex items-center justify-center gap-1 w-full text-center">
                    <FileText class="h-4 w-4 text-white" />
                    Ver CV
                </a>
                <a v-if="props.developer.portfolio" :href="props.developer.portfolio as string" target="_blank"
                    rel="noopener noreferrer"
                    class="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 flex items-center justify-center gap-1 w-full text-center">
                    <BriefcaseBusiness class="h-4 w-4 text-white" />
                    Ver portafolio
                </a>
            </div>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
    BriefcaseBusiness,
    Github,
    Linkedin,
    Facebook,
    Instagram,
    Mail,
    MessageCircle,
    MapPin,
    Globe,
    FileText
} from 'lucide-vue-next';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Developer } from '@/types';

const props = defineProps<{
    developer: Developer;
}>();

// Computed que obtiene todas las redes sociales que el desarrollador tiene
const socialNetworks = computed(() => {
    const networks = [];
    const dev = props.developer;

    // Añadir cada red social solo si existe (truthy)
    if (dev.github) {
        networks.push({
            name: 'GitHub',
            icon: Github,
            href: dev.github,
            color: 'text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white'
        });
    }

    if (dev.linkedin) {
        networks.push({
            name: 'LinkedIn',
            icon: Linkedin,
            href: dev.linkedin,
            color: 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
        });
    }

    if (dev.facebook) {
        networks.push({
            name: 'Facebook',
            icon: Facebook,
            href: dev.facebook,
            color: 'text-blue-700 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400'
        });
    }

    if (dev.instagram) {
        networks.push({
            name: 'Instagram',
            icon: Instagram,
            href: dev.instagram,
            color: 'text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300'
        });
    }

    if (dev.email) {
        networks.push({
            name: 'Email',
            icon: Mail,
            href: `mailto:${dev.email}`,
            color: 'text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300'
        });
    }

    if (dev.whatsapp) {
        networks.push({
            name: 'WhatsApp',
            icon: MessageCircle,
            href: `https://wa.me/${dev.whatsapp.replace(/\D/g, '')}`, // Limpia el formato del teléfono
            color: 'text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300'
        });
    }

    if (dev.portfolio) {
        networks.push({
            name: 'Portfolio',
            icon: Globe,
            href: dev.portfolio,
            color: 'text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300'
        });
    }

    return networks;
});

</script>