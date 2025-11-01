<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Header from '@/components/landing-page/Header.vue';
import Introduction from '@/components/landing-page/Introduction.vue';
import { Developer, Service } from '@/types';
import Services from '@/components/landing-page/Services.vue';

const props = defineProps<{
    developers: Developer[];
    services: Service[];
}>();

</script>

<template>

    <Head title="Welcome">
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
    <div
        class="flex min-h-screen flex-col items-center bg-gradient-to-br from-[#FDFDFC] via-blue-50 to-indigo-100 p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:from-[#0a0a0a] dark:via-gray-900 dark:to-blue-900">

        <Header />

        <Introduction :developers="props.developers" />

        <Services :services="props.services" />

    </div>
</template>
