import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  authService = inject(AuthService);
  router = inject(Router);

  error = signal('');

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  iniciarSesion() {
    if (this.loginForm.invalid) {
      this.error.set('Ingrese el usuario y la contraseña');
      return;
    }

    this.authService.login({
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? ''
    }).subscribe({
      next: () => this.router.navigate(['/productos']),
      error: (err) => this.error.set(err.error?.message ?? 'No se pudo iniciar sesión')
    });
  }

}
