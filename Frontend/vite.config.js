import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const targetDomain = env.VITE_BACKEND_URL || 'http://localhost:3200';

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/v1': {
          target: targetDomain,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  };
});
