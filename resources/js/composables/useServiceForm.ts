import type { Service } from '@/types';
import { reactive, ref } from 'vue';
import { toast } from 'vue-sonner';

export function useServiceForm(emit?: any) {
    type CreateService = Omit<Service, 'id' | 'created_at' | 'updated_at'>;

    const isSubmitting = ref(false);

    // Estado para controlar la visibilidad del formulario
    const isOpen = ref(false);
    const validationErrors = ref<Record<string, string>>({});

    // Estado inicial del formulario
    const initialFormState: CreateService = {
        title: '',
        description: '',
        icon: '',
        color: '',
        features: [],
        is_active: true,
    };

    const formData = reactive<CreateService>({
        ...initialFormState,
    });

    /**
     * Validaciones del formulario
     */
    // Reglas de validación
    const validationRules = {
        title: (value: string) => {
            if (!value.trim()) return 'Title is required.';
            if (value.length < 2) return 'Title must be at least 2 characters.';
            return '';
        },
        description: (value: string) => {
            if (!value.trim()) return 'Description is required.';
            if (value.length < 10)
                return 'Description must be at least 10 characters.';
            return '';
        },
        icon: (value: string) => {
            if (!value.trim()) return 'Icon is required.';
            return '';
        },
        color: (value: string) => {
            if (!value.trim()) return 'Color is required.';
            return '';
        },
        features: (value: string[]) => {
            if (value.length < 1) return 'At least one feature is required.';
            return '';
        },
    };

    // Validación en el formulario
    function validateForm() {
        validationErrors.value = {};
        let isValid = true;

        const errors: Record<string, string> = {};

        // Validar title
        const titleError = validationRules.title(formData.title);
        if (titleError) {
            errors.title = titleError;
            isValid = false;
        }

        // Validar description
        const descriptionError = validationRules.description(
            formData.description,
        );
        if (descriptionError) {
            errors.description = descriptionError;
            isValid = false;
        }

        // validar icon
        const iconError = validationRules.icon(formData.icon);
        if (iconError) {
            errors.icon = iconError;
            isValid = false;
        }

        // Validar color
        const colorError = validationRules.color(formData.color);
        if (colorError) {
            errors.color = colorError;
            isValid = false;
        }

        // Validar features
        const featuresError = validationRules.features(formData.features);
        if (featuresError) {
            errors.features = featuresError;
            isValid = false;
        }

        validationErrors.value = errors;
        return isValid;
    }

    /**
     * Manejo del submit del formulario y reseteo del formulario
     */

    async function onSubmit() {
        if (isSubmitting.value) return;

        if (!validateForm()) return;

        try {
            isSubmitting.value = true;

            const endpoint = '/api/service';
            const csrf =
                document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute('content') || '';

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrf,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'same-origin',
            });

            if (!res.ok) {
                // Validacion en el servidor
                if (res.status === 422) {
                    const data = await res.json().catch(() => ({}));
                    const serverErrors: Record<string, string> =
                        data.errors || {};
                    const mapped: Record<string, string> = {};
                    Object.entries(serverErrors).forEach(([key, message]) => {
                        mapped[key] = Array.isArray(message)
                            ? String(message[0])
                            : String(message);
                    });
                    validationErrors.value = mapped;
                    toast.error('Please fix the errors in the form.');
                    return;
                }

                const text = await res.text().catch(() => '');
                validationErrors.value = {
                    submit: `Server error: ${res.status} ${res.statusText} ${text}`,
                };
                toast.error('Please fix the errors in the form.');
                return;
            }

            // Si todo va bien

            // 1. Cerramos el modal
            isOpen.value = false;
            // 2. Mostrar mensaje de exito
            toast.success('Service created successfully!');
            // 3. Resetear
            resetForm();

            if (emit) {
                emit('close');
            }

            // router.visit(window.location.pathname, {
            //     preserveScroll: true,
            //     preserveState: false,
            //     replace: true,
            // });
        } catch (error) {
            console.error('Error submitting the form:', error);
            validationErrors.value = {
                submit: 'An error occurred while submitting the form. Please try again.',
            };
            toast.error(
                'An error occurred while submitting the form. Please try again.',
            );
        } finally {
            isSubmitting.value = false;
        }
    }

    // Reset del formulario cuando se cierra el modal
    function onOpenChange(open: boolean) {
        if (!open) {
        }
    }

    function resetForm() {
        Object.assign(formData, initialFormState);
        formData.features = [];
        validationErrors.value = {};
    }

    /**
     * logica para manejar las características del servicio
     */

    const newFeature = ref('');

    const addFeature = () => {
        const value = newFeature.value.trim();

        if (!value) return;

        if (formData.features.includes(value)) {
            validationErrors.value.features = 'Feature already exists.';
            return;
        }

        formData.features.push(value);
        newFeature.value = '';

        if (validationErrors.value.features) {
            delete validationErrors.value.features;
        }
    };

    const removeFeature = (index: number) => {
        formData.features.splice(index, 1);

        if (formData.features.length > 0 && validationErrors.value.features) {
            delete validationErrors.value.features;
        }
    };

    return {
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
    };
}
