import '../css/app.css';
// Importamos los estilos para el toaster
import 'vue-sonner/style.css';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { initializeTheme } from './composables/useAppearance';
// 
import createToaster, { Toaster } from 'vue-sonner';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        // Render both the Inertia App and the Toaster so the toast container is always present
    const vueApp = createApp({ render: () => h('div', [h(App, props), h(Toaster, { position: 'top-right' })]) });
        vueApp.use(plugin);
        // Register Sonner toaster plugin
        vueApp.use(createToaster);
        vueApp.mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on page load...
initializeTheme();
