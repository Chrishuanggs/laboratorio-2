import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioInfo } from '../interfaces/usuario';

@Service()
export class UsuarioService {

  private http = inject(HttpClient);

  url = 'http://localhost:8080/api/v1/usuarios';

  listar(): Observable<UsuarioInfo[]> {
    return this.http.get<UsuarioInfo[]>(this.url);
  }

}
