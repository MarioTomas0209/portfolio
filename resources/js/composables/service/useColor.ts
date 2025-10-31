import { computed, ref } from "vue";

export function useColor() {
    const startColor = ref('#3b82f6');
    const endColor = ref('#2563eb');

    const gradientPreview = computed(() => {
        return `linear-gradient(to right, ${startColor.value}, ${endColor.value})`;
    });

    const presetColors = [
        { name: 'Blue', start: '#3b82f6', end: '#2563eb' },
        { name: 'Green', start: '#22c55e', end: '#16a34a' },
        { name: 'Purple', start: '#a855f7', end: '#9333ea' },
        { name: 'Orange', start: '#f97316', end: '#ea580c' },
        { name: 'Indigo', start: '#6366f1', end: '#4f46e5' },
        { name: 'Pink', start: '#ec4899', end: '#db2777' },
        { name: 'Red', start: '#ef4444', end: '#dc2626' },
        { name: 'Yellow', start: '#eab308', end: '#ca8a04' },
    ];

    const applyPreset = (preset: { start: string; end: string }) => {
        startColor.value = preset.start;
        endColor.value = preset.end;
    };

    return{
        // Propities
        startColor,
        endColor,
        // Methods
        gradientPreview,
        presetColors,
        applyPreset
    }
}
