import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Registro } from './registro/registro';

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
    }

];
