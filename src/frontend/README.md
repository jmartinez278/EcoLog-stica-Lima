# Frontend Sprint 1

Interfaz React, TypeScript y Vite para login, vehículos, pedidos y conductores. El token se mantiene solo en memoria; al recargar la página se solicita ingresar nuevamente.

Desde `src/frontend`, ejecutar `npm ci`, `npm run dev`, `npm test` y `npm run build`. El servidor Vite envía `/api` al backend configurado mediante `VITE_API_PROXY_TARGET` (por defecto `http://localhost:8000`; Compose usa `http://backend:8000`). La interfaz local está en `http://localhost:5173`.
