import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoInfo } from '../interfaces/producto';

@Service()
export class ProductoService {

  private http = inject(HttpClient);

  url = 'http://localhost:8080/api/v1/productos';

  listar(): Observable<ProductoInfo[]> {
    return this.http.get<ProductoInfo[]>(this.url);
  }

  buscarPorId(id: number): Observable<ProductoInfo> {
    return this.http.get<ProductoInfo>(`${this.url}/${id}`);
  }

  crear(producto: Omit<ProductoInfo, 'id'>): Observable<ProductoInfo> {
    return this.http.post<ProductoInfo>(this.url, producto);
  }

  actualizar(id: number, producto: Omit<ProductoInfo, 'id'>): Observable<ProductoInfo> {
    return this.http.put<ProductoInfo>(`${this.url}/${id}`, producto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
