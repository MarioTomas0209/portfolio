<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import CardProfile from './cardProfile.vue';
import { Developer } from '@/types';
import Button from './button/Button.vue';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-vue-next';

const props = defineProps<{
    developers: Developer[];
}>();

const currentIndex = ref(0);
const isPlaying = ref(true);
let intervalId: ReturnType<typeof setInterval> | null = null;

const startAutoPlay = () => {
    if (intervalId) return;
    intervalId = setInterval(nextSlide, 4000);
}

const stopAutoPlay = () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

const togglePlayPause = () => {
    isPlaying.value = !isPlaying.value;
};

const nextSlide = () => {
    const newIndex = currentIndex.value === props.developers.length - 1 ? 0 : currentIndex.value + 1;
    currentIndex.value = newIndex;
}

const prevSlide = () => {
    const newIndex = currentIndex.value === 0 ? props.developers.length - 1 : currentIndex.value - 1;
    currentIndex.value = newIndex;
}

const goToSlide = (index: number) => {
    currentIndex.value = index;
}

watch(isPlaying, (newIsPlaying) => {
    if (newIsPlaying) {
        startAutoPlay();
    } else {
        stopAutoPlay();
    }
}, { immediate: true });

onUnmounted(() => {
    stopAutoPlay();
});
</script>

<template>
    <div class="relative w-full max-w-md mx-auto">
        <!-- Carrusel container -->
        <div class="relative overflow-hidden rounded-lg">
            <div :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
                class="flex transition-transform duration-500 ease-in-out">
                <div v-for="developer in props.developers" :key="developer.id"
                    class="w-full flex-shrink-0 flex justify-center">
                    <!-- Card de perfil -->
                    <CardProfile :developer="developer" />
                </div>
            </div>
        </div>

        <!-- Controles de navegación -->
        <div class="flex justify-center items-center mt-6 gap-4">
            <Button variant="outline" size="sm" class="flex items-center gap-2 text-black dark:text-white"
                @click="prevSlide">
                <ChevronLeft class="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" class="flex items-center gap-2 text-black dark:text-white"
                @click="togglePlayPause">
                <Pause v-if="isPlaying" class="w-4 h-4" />
                <Play v-else class="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" class="flex items-center gap-2 text-black dark:text-white"
                @click="nextSlide">
                <ChevronRight class="w-4 h-4" />
            </Button>
        </div>

        <!-- Indicadores de posición -->
        <div class="flex justify-center gap-2 mt-4">
            <button v-for="(_, index) in props.developers.length" :key="index" :class="[
                'w-3 h-3 rounded-full transition-colors',
                index === currentIndex ? 'bg-blue-500 dark:bg-blue-400' : 'bg-gray-300 hover:bg-gray-400'
            ]" @click="goToSlide(index)" />
        </div>
    </div>
</template>
