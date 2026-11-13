import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(import.meta.dirname, 'index.html'),
          about: path.resolve(import.meta.dirname, 'about.html'),
          blog: path.resolve(import.meta.dirname, 'blog.html'),
          contact: path.resolve(import.meta.dirname, 'contact.html'),
          penetrationTesting: path.resolve(import.meta.dirname, 'services/penetration-testing.html'),
          securityAudits: path.resolve(import.meta.dirname, 'services/security-audits.html'),
          socMonitoring: path.resolve(import.meta.dirname, 'services/soc-monitoring.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
