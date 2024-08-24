import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/scripts/app.css', 'resources/scripts/index.tsx'],
            refresh: true,
        }),
        react(),
    ],
});
