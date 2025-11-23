# Employee Directory - Guia de Ejecucion

Sistema de gestión de empleados con arquitectura monorepo.

## Requisitos

- Node.js 18+
- npm 9+

## Instalacion y Ejecucion

### 1. Clonar repositorio

```bash
git clone <repository-url>
cd retranca
```

### 2. Instalar dependencias

```bash
npm run install:all
```

Este comando instala las dependencias en:
- Raiz del proyecto
- Carpeta backend
- Carpeta frontend

### 3. Ejecutar el proyecto

Opcion A - Ejecutar todo junto (recomendado):

```bash
npm run start:all
```

Esto inicia en paralelo:
- Backend en http://localhost:3000
- Frontend en http://localhost:5173

Opcion B - Ejecutar en terminales separadas:

```bash
# Terminal 1
cd backend
npm run start:dev

# Terminal 2
cd frontend
npm run dev
```

## Verificacion del Funcionamiento

### Backend (5 pts - BD conecta, Endpoints responden)

1. Abre terminal y ejecuta:
```bash
curl http://localhost:3000/employees
```

Deberia devolver un array JSON vacio: `[]`

2. Crear un empleado:
```bash
curl -X POST http://localhost:3000/employees \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Juan Perez","role":"Developer"}'
```

Deberia devolver el empleado creado con id.

3. Verificar persistencia:
```bash
curl http://localhost:3000/employees
```

Deberia devolver el empleado creado.

### Frontend (5 pts - Renderiza y gestiona estado)

1. Abre http://localhost:5173 en el navegador
2. Deberias ver:
   - Formulario con campos "Nombre Completo" y "Cargo"
   - Seccion de empleados (vacia inicialmente)
   - Checkbox "Empleado Activo"
   - Boton "Agregar Empleado"

3. Ingresa datos en el formulario:
   - Nombre: Juan Perez
   - Cargo: Developer
   - Mantén checkbox activo

4. Haz clic en "Agregar Empleado"
   - Deberias ver un toast verde de exito
   - El formulario se limpiara
   - El empleado aparecera en la lista

### Integracion (5 pts - Frontend consume API, datos persisten)

1. Crea varios empleados desde el formulario
2. Actualiza el navegador (F5)
3. Los empleados deberan seguir visible en la lista
4. Abre DevTools (F12) -> Console
5. No deberia haber errores de CORS
6. Abre DevTools -> Network
7. Al cargar la pagina deberia haber una request GET a /employees

## Estructura del Proyecto

```
retranca/
├── backend/
│   ├── src/
│   │   ├── employee/
│   │   │   ├── employee.entity.ts
│   │   │   ├── employee.service.ts
│   │   │   ├── employee.controller.ts
│   │   │   ├── employee.module.ts
│   │   │   └── dto/
│   │   │       └── create-employee.dto.ts
│   │   ├── app.module.ts (TypeORM configurado)
│   │   └── main.ts (CORS habilitado)
│   ├── dist/ (compilado)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── EmployeeDirectory.jsx (componente principal)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── dist/ (compilado)
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── package.json (scripts raiz)
└── database.sqlite (creada automaticamente)
```

## Detalles Tecnicos

### Backend

- Framework: NestJS 10.0
- ORM: TypeORM 0.3
- Base de datos: SQLite
- Validacion: class-validator
- CORS: Habilitado (origin: '*')

Entity Employee:
- id: number (auto-increment)
- fullName: string (requerido, min 3)
- role: string (requerido, min 3)
- isActive: boolean (default: true)

Endpoints:
- POST /employees - Crea empleado
- GET /employees - Lista todos

### Frontend

- Framework: React 18.2
- Build tool: Vite 5.0
- Formularios: react-hook-form
- Notificaciones: react-hot-toast
- Estilos: Tailwind CSS
- HTTP: axios
- Iconos: lucide-react

El componente EmployeeDirectory maneja:
- Estado de empleados
- Validacion de formulario
- Peticiones HTTP
- Notificaciones de exito/error

## Scripts Disponibles

Desde la raiz:

```bash
npm run setup           # Setup automatico (una sola vez)
npm run install:all     # Instala deps
npm run start:all       # Ejecuta ambos servidores
npm run build:all       # Compila para produccion
npm run lint:all        # Ejecuta linters
npm run test:all        # Ejecuta tests
npm run clean           # Limpia todo
```

Desde backend:

```bash
npm run start:dev       # Desarrollo con watch
npm run build           # Compila
npm run lint            # Linting
npm run test            # Tests
```

Desde frontend:

```bash
npm run dev             # Desarrollo
npm run build           # Compilacion
npm run preview         # Vista previa
npm run lint            # Linting
```

## Solucionar Problemas

### Puerto 3000 ocupado

```bash
PORT=3001 npm run start:dev (en backend)
```

### "Cannot find module"

```bash
cd backend && npm install --legacy-peer-deps
cd frontend && npm install --legacy-peer-deps
```

### Vite no muestra cambios

Reinicia el servidor:
```bash
npm run dev
```

### Los datos no persisten

```bash
rm backend/database.sqlite
```

La BD se recreara automaticamente.

## Variables de Entorno

Backend (.env):
```
PORT=3000
CORS_ORIGIN=*
```

Frontend (.env):
```
VITE_API_BASE_URL=http://localhost:3000
```

## Compilacion para Produccion

```bash
npm run build:all
```

Genera:
- backend/dist/ - Backend compilado
- frontend/dist/ - Frontend optimizado

## Resumen de Funcionamiento

1. Backend en 3000 expone API /employees
2. Base de datos SQLite almacena empleados
3. Frontend en 5173 carga lista con GET /employees
4. Formulario envia POST /employees al crear
5. Datos persisten en SQLite entre recargas
6. CORS permite comunicacion frontend-backend

---

Version: 1.0.0
Fecha: 22 de Noviembre, 2025
