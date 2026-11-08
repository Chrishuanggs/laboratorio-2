import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaInfo } from '../interfaces/categoria';

@Service()
export class CategoriaService {

  private http = inject(HttpClient);

  url = 'http://localhost:8080/api/v1/categorias';

  listar(): Observable<CategoriaInfo[]> {
    return this.http.get<CategoriaInfo[]>(this.url);
  }

  buscarPorId(id: number): Observable<CategoriaInfo> {
    return this.http.get<CategoriaInfo>(`${this.url}/${id}`);
  }

  // al crear no se manda el id, lo genera la base de datos
  crear(categoria: Omit<CategoriaInfo, 'id'>): Observable<CategoriaInfo> {
    return this.http.post<CategoriaInfo>(this.url, categoria);
  }

  actualizar(id: number, categoria: Omit<CategoriaInfo, 'id'>): Observable<CategoriaInfo> {
    return this.http.put<CategoriaInfo>(`${this.url}/${id}`, categoria);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
