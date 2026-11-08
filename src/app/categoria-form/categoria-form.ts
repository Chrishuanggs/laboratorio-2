import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../services/categoria';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-categoria-form',
  styleUrl: './categoria-form.css',
  templateUrl: './categoria-form.html',
})
export class CategoriaForm {

  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  categoriaService = inject(CategoriaService);

  // si la ruta trae id es editar, si no es crear
  id: number | null = null;
  error = signal('');

  categoriaForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('')
  });

  constructor() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.id = Number(id);
      this.categoriaService.buscarPorId(this.id).subscribe({
        next: (categoria) => this.categoriaForm.patchValue(categoria),
        error: () => this.error.set('No se encontró la categoría')
      });
    }
  }

  guardar() {
    if (this.categoriaForm.invalid) {
      this.error.set('El nombre es obligatorio');
      return;
    }

    const categoria = {
      nombre: this.categoriaForm.value.nombre ?? '',
      descripcion: this.categoriaForm.value.descripcion ?? ''
    };

    const peticion = this.id
      ? this.categoriaService.actualizar(this.id, categoria)
      : this.categoriaService.crear(categoria);

    peticion.subscribe({
      next: () => this.router.navigate(['/categorias']),
      error: (err) => this.error.set(err.error?.message ?? 'No se pudo guardar la categoría')
    });
  }

}
