import type { Developer } from '@/types';
import { router } from '@inertiajs/vue3';
import { computed, reactive, ref } from 'vue';
import { toast } from 'vue-sonner';

export function useDeveloperForm(emit?: any) {
    type CreateDeveloper = Omit<Developer, 'id' | 'created_at' | 'updated_at'>;

    // Estado para el developer que se está editando
    const currentDeveloper = ref<Developer | null>(null);

    // Verificar si se está editando un developer
    const isEditMode = computed(() => !!currentDeveloper.value);

    // Estado inicial del formulario para reseteo
    const initialFormState: CreateDeveloper = {
        name: '',
        job: '',
        location: '',
        portfolio: '',
        github: '',
        linkedin: '',
        whatsapp: '',
        email: '',
        facebook: '',
        instagram: '',
        cv: '',
        image: '',
        is_active: true,
    };

    const formData = reactive<CreateDeveloper>({
        ...initialFormState,
    });

    // Validacion y envio del formulario
    // Estado del formulario y modal
    const isOpen = ref(false);
    const isSubmitting = ref(false);
    const validationErrors = ref<Record<string, string>>({});
    const selectedFileName = ref<string>('');
    const currentCvUrl = ref<string>(''); // URL del CV actual
    const removeCv = ref(false); // Flag para indicar si se debe eliminar el CV

    // Función para cargar un developer en el formulario
    function loadDeveloper(developer: Developer | null) {
        if (developer) {
            currentDeveloper.value = developer;
            // Guardar URL del CV solo si es string
            currentCvUrl.value =
                typeof developer.cv === 'string' ? developer.cv : '';
            Object.assign(formData, {
                name: developer.name || '',
                job: developer.job || '',
                location: developer.location || '',
                portfolio: developer.portfolio || '',
                github: developer.github || '',
                linkedin: developer.linkedin || '',
                whatsapp: developer.whatsapp || '',
                email: developer.email || '',
                facebook: developer.facebook || '',
                instagram: developer.instagram || '',
                cv: '', // No asignamos el CV aquí, se maneja por separado
                image: developer.image || '',
                is_active: developer.is_active ?? true,
            });
            isOpen.value = true;
        } else {
            currentDeveloper.value = null;
            currentCvUrl.value = '';
            removeCv.value = false;
            Object.assign(formData, initialFormState);
        }
    }

    // Función para eliminar el CV
    function handleRemoveCv() {
        currentCvUrl.value = '';
        selectedFileName.value = '';
        formData.cv = null;
        removeCv.value = true;
    }

    // Manejo de archivo CV
    function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            formData.cv = file;
            selectedFileName.value = file.name;
            removeCv.value = false; // Ya no queremos eliminar si hay un nuevo archivo
        } else {
            formData.cv = null;
            selectedFileName.value = '';
        }
    }

    // Reglas de validación
    const validationRules = {
        name: (value: string) => {
            if (!value.trim()) return 'Name is required';
            if (value.length < 2) return 'Name must be at least 2 characters';
            return '';
        },
        email: (value: string) => {
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return 'Please enter a valid email';
            }
            return '';
        },
        whatsapp: (value: string) => {
            if (value && !/^\+?[\d\s-]{8,}$/.test(value)) {
                return 'Please enter a valid phone number';
            }
            return '';
        },
    };

    // Validación del formulario
    function validateForm() {
        validationErrors.value = {};
        let isValid = true;

        // Validar campos requeridos y formato
        const errors: Record<string, string> = {};

        // Validar nombre (requerido)
        const nameError = validationRules.name(formData.name);
        if (nameError) {
            errors.name = nameError;
            isValid = false;
        }

        // Validar email (opcional pero con formato)
        if (formData.email) {
            const emailError = validationRules.email(formData.email);
            if (emailError) {
                errors.email = emailError;
                isValid = false;
            }
        }

        // Validar whatsapp (opcional pero con formato)
        if (formData.whatsapp) {
            const whatsappError = validationRules.whatsapp(formData.whatsapp);
            if (whatsappError) {
                errors.whatsapp = whatsappError;
                isValid = false;
            }
        }

        // URLs opcionales pero deben ser válidas si se proporcionan
        const urlFields = [
            'portfolio',
            'github',
            'linkedin',
            'facebook',
            'instagram',
            'image',
        ];
        urlFields.forEach((field) => {
            const url = formData[field as keyof typeof formData];
            if (url && typeof url === 'string' && !url.startsWith('http')) {
                errors[field] =
                    'Please enter a valid URL starting with http:// or https://';
                isValid = false;
            }
        });

        validationErrors.value = errors;
        return isValid;
    }

    // Manejo del submit: envía FormData al backend usando fetch y maneja errores 422
    async function onSubmit() {
        if (isSubmitting.value) return;

        if (!validateForm()) {
            return; // No cerramos el modal si hay errores locales
        }

        try {
            isSubmitting.value = true;

            // Crear FormData para enviar archivos
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                // Saltar el CV aquí, lo manejamos por separado
                if (key === 'cv') return;

                if (value !== null && value !== undefined && value !== '') {
                    if (value instanceof File)
                        formDataToSend.append(key, value);
                    else formDataToSend.append(key, String(value));
                }
            });

            // Manejar CV por separado
            if (formData.cv && formData.cv instanceof File) {
                // Hay un nuevo archivo CV
                formDataToSend.append('cv', formData.cv);
            } else if (removeCv.value && isEditMode.value) {
                // Se marcó para eliminar el CV
                formDataToSend.append('remove_cv', '1');
            }

            // Resolver endpoint y método según si es crear o editar
            const endpoint = isEditMode.value
                ? `/api/developer/${currentDeveloper.value?.id}`
                : '/api/developer';

            if (isEditMode.value) {
                formDataToSend.append('_method', 'PUT');
            }

            // CSRF token (Laravel coloca <meta name="csrf-token" content="...">)
            const csrf =
                document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute('content') || '';

            const res = await fetch(endpoint, {
                method: 'POST', // Siempre POST, Laravel usa _method para PUT
                headers: {
                    'X-CSRF-TOKEN': csrf,
                    // Not setting Content-Type: fetch will set multipart boundary
                },
                body: formDataToSend,
                credentials: 'same-origin',
            });

            if (!res.ok) {
                // Validation error from Laravel
                if (res.status === 422) {
                    const data = await res.json().catch(() => ({}));
                    // Laravel returns { errors: { field: [msg, ...] } }
                    const serverErrors: Record<string, any> = data.errors || {};
                    const mapped: Record<string, string> = {};
                    Object.entries(serverErrors).forEach(([k, v]) => {
                        mapped[k] = Array.isArray(v) ? String(v[0]) : String(v);
                    });
                    validationErrors.value = mapped;
                    toast.error(
                        'Validation failed. Please check the form fields.',
                    );
                    return;
                }

                // Other error
                const text = await res.text().catch(() => '');
                validationErrors.value = {
                    submit: `Server error ${res.status}: ${text}`,
                };
                toast.error(`Server error ${res.status}`);
                return;
            }

            // Success: close modal and reset
            isOpen.value = false;
            const successMessage = isEditMode.value
                ? 'Developer updated successfully'
                : 'Developer created successfully';
            toast.success(successMessage);

            // Emitir evento close si existe
            if (emit) {
                emit('close');
            }

            // Recargar la página actual usando Inertia
            router.visit(window.location.pathname, {
                preserveScroll: true,
                preserveState: false,
                replace: true,
            });
        } catch (error) {
            console.error('Network/API error:', error);
            validationErrors.value = {
                submit: 'Network or server error. Try again.',
            };
            toast.error('Network or server error. Try again.');
        } finally {
            isSubmitting.value = false;
        }
    }

    // Reset del formulario cuando se cierra el modal
    function onOpenChange(open: boolean) {
        if (!open) {
            // Resetear el formulario cuando se cierra el modal
            currentDeveloper.value = null;
            currentCvUrl.value = '';
            removeCv.value = false;
            Object.assign(formData, initialFormState);
            validationErrors.value = {};
            isSubmitting.value = false;
            selectedFileName.value = ''; // Limpiar el nombre del archivo seleccionado

            // Emitir evento close si existe
            if (emit) {
                emit('close');
            }
        }
    }

    return {
        isOpen,
        formData,
        isSubmitting,
        validationErrors,
        selectedFileName,
        currentCvUrl,
        isEditMode,
        handleFileChange,
        handleRemoveCv,
        onSubmit,
        onOpenChange,
        loadDeveloper, // Exponer función para cargar developer
    };
}
