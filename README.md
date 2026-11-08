# Laboratorio 2 - CRUD front-end

**Estudiante:** Chris Huang
**Curso:** Proyecto 3 - CENFOTEC

Aplicación en Angular que consume la API del Laboratorio 1 (productos y categorías) con login por Keycloak.

## Funcionalidades
- Inicio de sesión y registro de usuarios (el registro crea el usuario en Keycloak con rol USER).
- Interceptor que agrega `Authorization: Bearer <token>` a cada request.
- Listado de productos y categorías para cualquier usuario con sesión.
- Crear, editar y eliminar productos y categorías solo con `SUPER-ADMIN-ROLE`.
- Página de usuarios registrados solo para `SUPER-ADMIN-ROLE`.

## Requisitos
- Docker Desktop
- Java 25
- Node.js 22.22 o superior (Angular 22 no corre con Node 20)

## Cómo correrlo

### 1. Backend
El backend es el del Laboratorio 1 con los endpoints de registro y listado de usuarios agregados. Está en este repositorio:
https://github.com/Chrishuanggs/laboratorio-2-backend.git

```bash
git clone https://github.com/Chrishuanggs/laboratorio-2-backend.git
```

1. En la carpeta `docker` del backend ejecutar:
   `docker compose up -d`
   Si Keycloak ya estaba creado de antes, usar `docker compose up -d --force-recreate keycloak` para que importe el realm actualizado (trae el cliente `persistencia-admin` que se usa para registrar y listar usuarios).
2. Esperar a que Keycloak arranque (http://localhost:8180).
3. Ejecutar `PersistenciaApplication` desde el IDE. Corre en http://localhost:8080.

### 2. Frontend
```bash
npm install
npm start
```
Abrir http://localhost:4200.

## Usuarios de prueba

| Usuario | Contraseña | Rol |
|---|---|---|
| admin | admin123 | SUPER-ADMIN-ROLE |
| chris | user123 | USER |

También se puede crear un usuario nuevo desde la página de registro.
