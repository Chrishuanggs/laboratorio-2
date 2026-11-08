import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {

  authService = inject(AuthService);

  error = signal('');
  mensaje = signal('');

  registroForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  registrar() {
    this.error.set('');
    this.mensaje.set('');

    if (this.registroForm.invalid) {
      this.error.set('Complete todos los campos con un correo válido');
      return;
    }

    this.authService.registrar({
      username: this.registroForm.value.username ?? '',
      email: this.registroForm.value.email ?? '',
      nombre: this.registroForm.value.nombre ?? '',
      apellido: this.registroForm.value.apellido ?? '',
      password: this.registroForm.value.password ?? ''
    }).subscribe({
      next: () => {
        this.mensaje.set('Usuario registrado, ya puede iniciar sesión');
        this.registroForm.reset();
      },
      error: (err) => this.error.set(err.error?.message ?? 'No se pudo registrar el usuario')
    });
  }

}
