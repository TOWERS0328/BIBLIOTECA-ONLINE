import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Prestamo, PrestamoFiltro, CrearPrestamoRequest } from '../models/prestamo.model';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private apiUrl = `${environment.apiUrl}/prestamos`;

  constructor(private http: HttpClient) {}

  // ─── OBTENER TODOS (paginado + filtros) ───────────────────────────────────
  getPrestamos(filtro?: PrestamoFiltro): Observable<Prestamo[]> {
    let params = new HttpParams();
    if (filtro) {
      if (filtro.usuarioId) params = params.set('usuarioId', String(filtro.usuarioId));
      if (filtro.libroId)   params = params.set('libroId', String(filtro.libroId));
      if (filtro.estado)    params = params.set('estado', filtro.estado);
      if (filtro.page !== undefined) params = params.set('page', String(filtro.page));
      if (filtro.size !== undefined) params = params.set('size', String(filtro.size));
    }
    return this.http.get<Prestamo[]>(this.apiUrl, { params });
  }

  // ─── OBTENER POR ID ───────────────────────────────────────────────────────
  getPrestamoById(id: number): Observable<Prestamo> {
    return this.http.get<Prestamo>(`${this.apiUrl}/${id}`);
  }

  // ─── PRÉSTAMOS DE UN USUARIO ──────────────────────────────────────────────
  getPrestamosPorUsuario(usuarioId: number): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  // ─── CREAR PRÉSTAMO ───────────────────────────────────────────────────────
  crearPrestamo(request: CrearPrestamoRequest): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.apiUrl, request);
  }

  // ─── DEVOLVER LIBRO ───────────────────────────────────────────────────────
  devolverLibro(id: number): Observable<Prestamo> {
    return this.http.put<Prestamo>(`${this.apiUrl}/${id}/devolver`, {});
  }

  // ─── PRÉSTAMOS VENCIDOS ───────────────────────────────────────────────────
  getPrestamosVencidos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.apiUrl}/vencidos`);
  }
}
