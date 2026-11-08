import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriaInfo } from '../interfaces/categoria';
import { CategoriaService } from '../services/categoria';
import { AuthService } from '../services/auth';

@Component({
  imports: [RouterLink],
  selector: 'app-categorias',
  styleUrl: './categorias.css',
  templateUrl: './categorias.html',
})
export class Categorias {

  categoriaService = inject(CategoriaService);
  authService = inject(AuthService);

  categorias = signal<CategoriaInfo[]>([]);
  error = signal('');

  constructor() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.listar().subscribe({
      next: (categorias) => this.categorias.set(categorias),
      error: (err) => this.error.set(err.error?.message ?? 'No se pudieron cargar las categorías')
    });
  }

  eliminar(categoria: CategoriaInfo) {
    if (!confirm(`¿Desea eliminar la categoría "${categoria.nombre}"?`)) {
      return;
    }
    this.error.set('');
    this.categoriaService.eliminar(categoria.id).subscribe({
      next: () => this.cargarCategorias(),
      // aquí llega por ejemplo el 409 cuando la categoría tiene productos
      error: (err) => this.error.set(err.error?.message ?? 'No se pudo eliminar la categoría')
    });
  }

}
