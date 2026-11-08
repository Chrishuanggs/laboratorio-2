import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoInfo } from '../interfaces/producto';
import { CategoriaInfo } from '../interfaces/categoria';
import { ProductoService } from '../services/producto';
import { CategoriaService } from '../services/categoria';
import { AuthService } from '../services/auth';

@Component({
  imports: [RouterLink, CurrencyPipe],
  selector: 'app-productos',
  styleUrl: './productos.css',
  templateUrl: './productos.html',
})
export class Productos {

  productoService = inject(ProductoService);
  categoriaService = inject(CategoriaService);
  authService = inject(AuthService);

  productos = signal<ProductoInfo[]>([]);
  categorias = signal<CategoriaInfo[]>([]);
  error = signal('');

  constructor() {
    this.cargarProductos();
    // las categorías se cargan para mostrar el nombre en vez del id
    this.categoriaService.listar().subscribe((categorias) => this.categorias.set(categorias));
  }

  cargarProductos() {
    this.productoService.listar().subscribe({
      next: (productos) => this.productos.set(productos),
      error: (err) => this.error.set(err.error?.message ?? 'No se pudieron cargar los productos')
    });
  }

  nombreCategoria(categoriaId: number): string {
    const categoria = this.categorias().find((c) => c.id === categoriaId);
    return categoria ? categoria.nombre : String(categoriaId);
  }

  eliminar(producto: ProductoInfo) {
    if (!confirm(`¿Desea eliminar el producto "${producto.nombre}"?`)) {
      return;
    }
    this.error.set('');
    this.productoService.eliminar(producto.id).subscribe({
      next: () => this.cargarProductos(),
      error: (err) => this.error.set(err.error?.message ?? 'No se pudo eliminar el producto')
    });
  }

}
