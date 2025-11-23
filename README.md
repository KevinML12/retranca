# Directorio de Empleados - Full Stack

Aplicación Monorepo (NestJS + React) para gestión de personal.
Base de datos: SQLite (No requiere instalación externa).

## Instrucciones de Ejecución

### 1. Clonar e Instalar

Solo necesitas ejecutar estos comandos en la raíz:

```bash
git clone https://github.com/KevinML12/retranca.git
cd retranca
npm install
npm run install:all
```

### 2. Ejecutar el Proyecto

Este comando levanta Backend y Frontend simultáneamente:

```bash
npm run start:all
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Guía de Evaluación (15 Pts)

Para verificar los puntos del examen rápidamente:

### 1. Backend (5 pts)

- **Estado:** Funcional en puerto 3000.
- **BD:** Usa SQLite + TypeORM. El archivo database.sqlite se genera automáticamente al iniciar.
- **Validación:** El backend rechaza datos vacíos (Error 400 Bad Request).

### 2. Frontend (5 pts)

- **UI:** Ingrese a http://localhost:5173.
- **Stack:** React + Vite + TailwindCSS.
- **Componentes:** Formulario validado y lista de tarjetas responsive.

### 3. Integración y Persistencia (5 pts)

Prueba rápida de funcionamiento:

1. Ingrese un "Nombre" y "Cargo" en el formulario.
2. Haga clic en Guardar.
3. Verá una notificación verde de éxito.
4. El empleado aparece en la lista inmediatamente.
5. Presione F5 (Recargar página).
6. El empleado permanece en la lista (Persistencia exitosa).

## Tecnologías Utilizadas

### Backend

- NestJS (Framework)
- TypeORM (Manejo de BD)
- SQLite (Base de datos embebida)
- Class-Validator (Seguridad de datos)

### Frontend

- React + Vite
- Tailwind CSS (Estilos)
- Axios (Conexión HTTP)
- React Hook Form (Manejo de formularios)
