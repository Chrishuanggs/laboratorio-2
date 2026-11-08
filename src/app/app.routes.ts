import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Registro } from './registro/registro';
import { Categorias } from './categorias/categorias';
import { CategoriaForm } from './categoria-form/categoria-form';
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
    }

];
