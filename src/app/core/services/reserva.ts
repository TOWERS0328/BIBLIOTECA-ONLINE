import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Reserva, ReservaFiltro, CrearReservaRequest } from '../models/reserva.model';
import { PageResponse } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = `${environment.apiUrl}/reservas`;

  constructor(private http: HttpClient) {}

  // ─── OBTENER TODAS (paginado + filtros) ───────────────────────────────────
  getReservas(filtro?: ReservaFiltro): Observable<PageResponse<Reserva>> {
    let params = new HttpParams();
    if (filtro) {
      if (filtro.usuarioId) params = params.set('usuarioId', String(filtro.usuarioId));
      if (filtro.libroId)   params = params.set('libroId', String(filtro.libroId));
      if (filtro.estado)    params = params.set('estado', filtro.estado);
      if (filtro.page !== undefined) params = params.set('page', String(filtro.page));
      if (filtro.size !== undefined) params = params.set('size', String(filtro.size));
    }
    return this.http.get<PageResponse<Reserva>>(this.apiUrl, { params });
  }

  // ─── OBTENER POR ID ───────────────────────────────────────────────────────
  getReservaById(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
  }

  // ─── RESERVAS DE UN USUARIO ───────────────────────────────────────────────
  getReservasPorUsuario(usuarioId: number, page = 0, size = 10): Observable<PageResponse<Reserva>> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));
    return this.http.get<PageResponse<Reserva>>(`${this.apiUrl}/usuario/${usuarioId}`, { params });
  }

  // ─── RESERVAS ACTIVAS DEL USUARIO ────────────────────────────────────────
  getReservasActivasPorUsuario(usuarioId: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/usuario/${usuarioId}/activas`);
  }

  // ─── CREAR RESERVA ────────────────────────────────────────────────────────
  crearReserva(request: CrearReservaRequest): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, request);
  }

  // ─── CONFIRMAR RESERVA (admin) ────────────────────────────────────────────
  confirmarReserva(id: number): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/${id}/confirmar`, {});
  }

  // ─── CANCELAR RESERVA ─────────────────────────────────────────────────────
  cancelarReserva(id: number): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/${id}/cancelar`, {});
  }

  // ─── COMPLETAR RESERVA (convertir a préstamo) ────────────────────────────
  completarReserva(id: number): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/${id}/completar`, {});
  }

  // ─── ELIMINAR RESERVA (admin) ─────────────────────────────────────────────
  eliminarReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
