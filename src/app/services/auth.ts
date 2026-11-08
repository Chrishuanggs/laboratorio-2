import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RegistroRequest, TokenPayload } from '../interfaces/auth';

@Service()
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  url = 'http://localhost:8080/api/v1/auth';

  // el token queda en un signal para que el menú se actualice solo al iniciar o cerrar sesión
  token = signal<string | null>(localStorage.getItem('token'));

  login(datos: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, datos).pipe(
      tap((respuesta) => {
        localStorage.setItem('token', respuesta.access_token);
        this.token.set(respuesta.access_token);
      })
    );
  }

  registrar(datos: RegistroRequest): Observable<void> {
    return this.http.post<void>(`${this.url}/registro`, datos);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.token.set(null);
    this.router.navigate(['/login']);
  }

  estaAutenticado(): boolean {
    const payload = this.leerToken();
    // exp viene en segundos
    return payload !== null && payload.exp * 1000 > Date.now();
  }

  obtenerRol(): string {
    const roles = this.leerToken()?.realm_access?.roles ?? [];
    return roles.includes('SUPER-ADMIN-ROLE') ? 'SUPER-ADMIN-ROLE' : 'USER';
  }

  esAdmin(): boolean {
    return this.estaAutenticado() && this.obtenerRol() === 'SUPER-ADMIN-ROLE';
  }

  obtenerUsername(): string {
    return this.leerToken()?.preferred_username ?? '';
  }

  // El JWT tiene 3 partes separadas por puntos, la segunda es el payload en base64url
  private leerToken(): TokenPayload | null {
    const token = this.token();
    if (!token) {
      return null;
    }
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  }

}
