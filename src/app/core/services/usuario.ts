import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario, RolUsuario, EstadoUsuario, detectarRolPorEmail } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  // ─── OBTENER TODOS ────────────────────────────────────────────────────────
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // ─── OBTENER POR ID ───────────────────────────────────────────────────────
  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  // ─── OBTENER POR USERNAME ─────────────────────────────────────────────────
  getUsuarioPorUsername(username: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/username/${username}`);
  }

  // ─── CREAR USUARIO ────────────────────────────────────────────────────────
  crearUsuario(usuario: Omit<Usuario, 'id'>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // ─── ACTUALIZAR USUARIO ───────────────────────────────────────────────────
  actualizarUsuario(id: number, datos: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, datos);
  }

  // ─── CAMBIAR ESTADO (ACTIVO / INACTIVO) ───────────────────────────────────
  cambiarEstado(id: number, estado: EstadoUsuario): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${id}/estado`, { estado });
  }

  // ─── CAMBIAR ROL ──────────────────────────────────────────────────────────
  cambiarRol(id: number, rol: RolUsuario): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${id}/rol`, { rol });
  }

  // ─── ELIMINAR ─────────────────────────────────────────────────────────────
  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ─── DETECTAR ROL POR EMAIL ───────────────────────────────────────────────
  detectarRolPorEmail(email: string): RolUsuario {
    return detectarRolPorEmail(email);
  }
  // ─── CAMBIAR CONTRASEÑA ───────────────────────────────────────────────────
cambiarPassword(id: number, passwordActual: string, passwordNueva: string): Observable<void> {
  return this.http.patch<void>(`${this.apiUrl}/${id}/password`, {
    passwordActual,
    passwordNueva
  });
}
}
