import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 3333,
        proxy: {
            '/auth-api': {
                target: 'https://calculator-backend-f7th.onrender.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/auth-api/, '')
            },
            '/transaction-api': {
                target: 'https://calculator-backend-f7th.onrender.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/transaction-api/, '')
            }
        }
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: true
    },
    define: {
        'process.env': {}
    }
})
