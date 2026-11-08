import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Registro } from './registro/registro';
import { Categorias } from './categorias/categorias';
import { Productos } from './productos/productos';
import { ProductoForm } from './producto-form/producto-form';
import { CategoriaForm } from './categoria-form/categoria-form';
import { Usuarios } from './usuarios/usuarios';
import { adminGuard, authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        component: Login,
        title: 'Iniciar sesión'
    },
    {
        path: 'registro',
        component: Registro,
        title: 'Registro'
    },
    {
        path: 'categorias',
        component: Categorias,
        title: 'Categorías',
        canActivate: [authGuard]
    },
    {
        path: 'categorias/nueva',
        component: CategoriaForm,
        title: 'Nueva categoría',
        canActivate: [adminGuard]
    },
    {
        path: 'categorias/editar/:id',
        component: CategoriaForm,
        title: 'Editar categoría',
        canActivate: [adminGuard]
    },
    {
        path: 'productos',
        component: Productos,
        title: 'Productos',
        canActivate: [authGuard]
    },
    {
        path: 'productos/nuevo',
        component: ProductoForm,
        title: 'Nuevo producto',
        canActivate: [adminGuard]
    },
    {
        path: 'productos/editar/:id',
        component: ProductoForm,
        title: 'Editar producto',
        canActivate: [adminGuard]
    },
    {
        path: 'usuarios',
        component: Usuarios,
        title: 'Usuarios',
        canActivate: [adminGuard]
    },
    {
        path: '',
        redirectTo: 'productos',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'productos'
    }

];
