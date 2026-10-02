import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'
import { handleApiRequest } from './server/apiHandler.ts'

function apiMiddlewarePlugin(): Plugin {
  return {
    name: 'skillbridge-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          try {
            const handled = await handleApiRequest(req, res);
            if (handled) return;
          } catch (err) {
            console.error('API middleware error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Internal server error processing request.' }));
            return;
          }
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    apiMiddlewarePlugin(),
  ],
})
