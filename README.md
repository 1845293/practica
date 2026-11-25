# API de Gestión de Cine (`cine-api`)

API REST para la gestión de un cine desarrollada con **NestJS**, **TypeORM**, **PostgreSQL**, **JWT** y documentación interactiva con **Scalar**.

## Requisitos previos

- Node.js 18 o superior
- PostgreSQL instalado y corriendo

## Pasos para ejecutar en local

1. Clonar el repositorio y entrar a la carpeta del proyecto:
   ```bash
   git clone <url-del-repositorio>
   cd cine-api
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Crear la base de datos `cine` en PostgreSQL:
   ```sql
   CREATE DATABASE cine;
   ```

4. Copiar `.env.example` a `.env` y colocar tus credenciales:
   ```bash
   cp .env.example .env
   ```

5. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run start:dev
   ```

6. Abrir la documentación interactiva de Scalar en:
   `http://localhost:3000/reference`

## Endpoints por módulo

Los endpoints `GET` son públicos. Los endpoints `POST`, `PATCH` y `DELETE` (excepto `/auth/*`) requieren token JWT en el header `Authorization: Bearer <token>`.

- **Auth (`/auth`)**
  - `POST /auth/register` — Registrar usuario
  - `POST /auth/login` — Iniciar sesión y obtener `access_token`
- **Salas (`/salas`)**
  - `GET /salas`, `GET /salas/:id`, `POST /salas`, `PATCH /salas/:id`, `DELETE /salas/:id`
- **Géneros (`/generos`)**
  - `GET /generos`, `GET /generos/:id`, `POST /generos`, `PATCH /generos/:id`, `DELETE /generos/:id`
- **Películas (`/peliculas`)**
  - `GET /peliculas`, `GET /peliculas/:id`, `POST /peliculas`, `PATCH /peliculas/:id`, `DELETE /peliculas/:id`
  - `POST /peliculas/:id/generos` — Asignar géneros a una película
  - `DELETE /peliculas/:id/generos/:idGenero` — Quitar un género de una película
- **Funciones (`/funciones`)**
  - `GET /funciones`, `GET /funciones/:id`, `POST /funciones`, `PATCH /funciones/:id`, `DELETE /funciones/:id`
- **Clientes (`/clientes`)**
  - `GET /clientes`, `GET /clientes/:id`, `POST /clientes`, `PATCH /clientes/:id`, `DELETE /clientes/:id`
- **Boletos (`/boletos`)**
  - `GET /boletos`, `GET /boletos/:id`, `POST /boletos`, `PATCH /boletos/:id`, `DELETE /boletos/:id`
