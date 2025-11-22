# Formotex Project

## Descripción

API RESTful para la gestión de usuarios y equipos de una organización, desarrollada con Node.js, TypeScript y MySQL. Permite autenticación de usuarios, roles diferenciados (admin y user) y operaciones de administración sobre usuarios y equipos.  

- **Admin**: puede crear, actualizar, eliminar y listar usuarios y equipos.  
- **User**: puede ver solo sus equipos asignados.  

## Tecnologías utilizadas

- **Node.js** - Runtime de JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Express.js** - Framework para APIs
- **MySQL** - Base de datos relacional
- **Sequelize** - ORM para MySQL
- **bcryptjs** - Hashing de contraseñas
- **jsonwebtoken (JWT)** - Autenticación y autorización
- **dotenv** - Variables de entorno
- **helmet** y **cors** - Seguridad y manejo de CORS
- **cookie-parser** - Manejo de cookies

## Organización de carpetas

```
src/
├── config/ 
| ├── db.ts
| └── seedAdmin.ts
├── controllers/ 
│ ├── admin.controller.ts
│ ├── auth.controller.ts
│ └── user.controller.ts
├── middlewares/ 
| └── authMiddlewares.ts
├── models/ 
│ ├── User.ts
│ └── Equipment.ts
├── routes/ 
│ ├── auth.routes.ts
│ ├── admin.routes.ts
│ └── user.routes.ts
├── services/
│ ├── admin.service.ts
| ├── admin.service.ts
│ └── user.service.ts
├── utils/ 
| └── auth.ts
└── index.ts
```


## Relación de entidades

- **User**
  - `id` (PK)
  - `name`
  - `email` (único)
  - `password` (hashed)
  - `role` (`admin` | `user`)
  - `createdAt`, `updatedAt`

- **Equipment**
  - `id` (PK)
  - `name`
  - `serialNumber` (único)
  - `assignedTo` (FK → User)
  - `createdAt`, `updatedAt`

Relaciones: Un **usuario** puede tener varios **equipos asignados**, pero un **equipo** solo puede estar asignado a un usuario a la vez.

## Endpoints principales

### Auth
- `POST /api/auth/login` → Login de usuarios (admin y user)

### Admin
- `POST /api/admin/users` → Crear usuario
- `PUT /api/admin/users/:id` → Actualizar usuario
- `DELETE /api/admin/users/:id` → Eliminar usuario
- `GET /api/admin/users` → Listar usuarios
- `POST /api/admin/equipments` → Crear equipo
- `PUT /api/admin/equipments/:id` → Actualizar equipo
- `DELETE /api/admin/equipments/:id` → Eliminar equipo
- `GET /api/admin/equipments` → Listar equipos

### User
- `GET /api/user/equipments` → Listar solo los equipos asignados al usuario

## Instalación y configuración de la base de datos

### Clonar el repositorio

```bash
git clone https://github.com/GastonFlorenciano/formotex.git
cd formotex
npm install
```

### Base de datos

1. Instalar **XAMPP** y levantar **MySQL** y **Apache**.
2. `Start MySQL` y crear la base de datos `formotex`.
2. Crear las tablas `users` y `equipments` segun pidan los modelos.

## Configurar .env en la raíz del proyecto:

`.env`

```bash
DB_NAME=formotex
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
JWT_SECRET=secret
PORT=3000
```
## Levantar el servidor

`npm run dev`

### Consola:
```bash
✅ Admin ya existe
✅ Conectado a MySQL
🚀 Servidor corriendo en http://localhost:3000
```