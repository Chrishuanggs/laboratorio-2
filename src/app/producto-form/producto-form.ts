import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriaInfo } from '../interfaces/categoria';
import { ProductoService } from '../services/producto';
import { CategoriaService } from '../services/categoria';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-producto-form',
  styleUrl: './producto-form.css',
  templateUrl: './producto-form.html',
})
export class ProductoForm {

  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productoService = inject(ProductoService);
  categoriaService = inject(CategoriaService);

  // si la ruta trae id es editar, si no es crear
  id: number | null = null;
  categorias = signal<CategoriaInfo[]>([]);
  error = signal('');

  productoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    precio: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    cantidadStock: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    categoriaId: new FormControl<number | null>(null, Validators.required)
  });

  constructor() {
    this.categoriaService.listar().subscribe((categorias) => this.categorias.set(categorias));

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.id = Number(id);
      this.productoService.buscarPorId(this.id).subscribe({
        next: (producto) => this.productoForm.patchValue(producto),
        error: () => this.error.set('No se encontró el producto')
      });
    }
  }

  guardar() {
    if (this.productoForm.invalid) {
      this.error.set('Complete todos los campos obligatorios, el precio y el stock no pueden ser negativos');
      return;
    }

    const producto = {
      nombre: this.productoForm.value.nombre ?? '',
      descripcion: this.productoForm.value.descripcion ?? '',
      precio: this.productoForm.value.precio ?? 0,
      cantidadStock: this.productoForm.value.cantidadStock ?? 0,
      categoriaId: this.productoForm.value.categoriaId ?? 0
    };

    const peticion = this.id
      ? this.productoService.actualizar(this.id, producto)
      : this.productoService.crear(producto);

    peticion.subscribe({
      next: () => this.router.navigate(['/productos']),
      error: (err) => this.error.set(err.error?.message ?? 'No se pudo guardar el producto')
    });
  }

}
