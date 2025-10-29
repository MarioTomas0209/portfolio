import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';
import type { Developer } from '@/types';

export function useDeleteDeveloper() {
    const isDeleting = ref(false);
    const showDeleteDialog = ref(false);
    const developerToDelete = ref<Developer | null>(null);

    // Abrir el dialog de confirmación
    function confirmDelete(developer: Developer) {
        developerToDelete.value = developer;
        showDeleteDialog.value = true;
    }

    // Cancelar la eliminación
    function cancelDelete() {
        developerToDelete.value = null;
        showDeleteDialog.value = false;
    }

    // Ejecutar la eliminación
    async function executeDelete() {
        if (!developerToDelete.value || isDeleting.value) return;

        try {
            isDeleting.value = true;

            const developerId = developerToDelete.value.id;
            const endpoint = `/api/developer/${developerId}`;

            // CSRF token
            const csrf = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content') || '';

            const res = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrf,
                    'Accept': 'application/json',
                },
                credentials: 'same-origin',
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                toast.error(data.message || 'Error deleting developer');
                return;
            }

            // Success
            toast.success('Developer deleted successfully');
            showDeleteDialog.value = false;
            developerToDelete.value = null;

            // Recargar la página actual
            router.visit(window.location.pathname + window.location.search, {
                preserveScroll: true,
                preserveState: false,
                replace: true,
            });
        } catch (error) {
            console.error('Error deleting developer:', error);
            toast.error('Network error. Please try again.');
        } finally {
            isDeleting.value = false;
        }
    }

    return {
        isDeleting,
        showDeleteDialog,
        developerToDelete,
        confirmDelete,
        cancelDelete,
        executeDelete,
    };
}

