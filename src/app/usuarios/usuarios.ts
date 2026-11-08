import { Component, inject, signal } from '@angular/core';
import { UsuarioInfo } from '../interfaces/usuario';
import { UsuarioService } from '../services/usuario';

@Component({
  imports: [],
  selector: 'app-usuarios',
  styleUrl: './usuarios.css',
  templateUrl: './usuarios.html',
})
export class Usuarios {

  usuarioService = inject(UsuarioService);

  usuarios = signal<UsuarioInfo[]>([]);
  error = signal('');

  constructor() {
    this.usuarioService.listar().subscribe({
      next: (usuarios) => this.usuarios.set(usuarios),
      error: (err) => this.error.set(err.error?.message ?? 'No se pudieron cargar los usuarios')
    });
  }

}
