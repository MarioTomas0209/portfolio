import { Service } from '@/types';
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import { router } from '@inertiajs/vue3';

export function useDeleteService() {
    const isDeleting = ref(false);
    const showDeleteDialog = ref(false);
    const serviceToDelete = ref<Service | null>(null);

    // Abrir el dialog de confirmacion
    const confirmDelete = (service: Service) => {
        serviceToDelete.value = service;
        showDeleteDialog.value = true;
    };

    //todo: Cancelar la eliminicion
    const cancelDelete = () => {
        serviceToDelete.value = null;
        showDeleteDialog.value = false;
    };

    //todo: Ejecutar la eliminacion
    const executeDelete = async () => {
        if (!serviceToDelete.value || isDeleting.value) return;

        try {
            isDeleting.value = true;

            const serviceId = serviceToDelete.value.id;
            const endpoint = `/api/service/${serviceId}`;

            const csrf =
                document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute('content') || '';

            const res = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrf,
                    Accept: 'application/json',
                },
                credentials: 'same-origin',
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                toast.error(data.message || 'Error deleting service');
                return;
            }

            toast.success('Service deleted successfully');
            showDeleteDialog.value = false;
            serviceToDelete.value = null;

            router.visit(window.location.pathname + window.location.search, {
                preserveScroll: true,
                preserveState: false,
                replace: true,
            });

        } catch (error) {
            console.error('Error delting service:', error);
            toast.error('Network error. Please try again');
        } finally {
            isDeleting.value = false;
        }
    };

    return {
        // Propities
        isDeleting,
        showDeleteDialog,
        serviceToDelete,

        // Methods
        confirmDelete,
        cancelDelete,
        executeDelete,
    };
}
