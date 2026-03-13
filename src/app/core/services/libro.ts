import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Libro, LibroFiltro, PageResponse } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = `${environment.apiUrl}/libros`;

  constructor(private http: HttpClient) {}

  // ─── OBTENER TODOS (paginado + filtros) ───────────────────────────────────
  getLibros(filtro?: LibroFiltro): Observable<PageResponse<Libro>> {
    let params = new HttpParams();
    if (filtro) {
      if (filtro.titulo)      params = params.set('titulo', filtro.titulo);
      if (filtro.autor)       params = params.set('autor', filtro.autor);
      if (filtro.genero)      params = params.set('genero', filtro.genero);
      if (filtro.isbn)        params = params.set('isbn', filtro.isbn);
      if (filtro.disponible !== undefined) params = params.set('disponible', String(filtro.disponible));
      if (filtro.page !== undefined)       params = params.set('page', String(filtro.page));
      if (filtro.size !== undefined)       params = params.set('size', String(filtro.size));
    }
    return this.http.get<PageResponse<Libro>>(this.apiUrl, { params });
  }

  // ─── OBTENER POR ID ───────────────────────────────────────────────────────
  getLibroById(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  // ─── BUSCAR POR ISBN ──────────────────────────────────────────────────────
  getLibroPorIsbn(isbn: string): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/isbn/${isbn}`);
  }

  // ─── BUSCAR (texto libre) ─────────────────────────────────────────────────
  buscarLibros(query: string): Observable<Libro[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<Libro[]>(`${this.apiUrl}/buscar`, { params });
  }

  // ─── CREAR ────────────────────────────────────────────────────────────────
  crearLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  // ─── ACTUALIZAR ───────────────────────────────────────────────────────────
  actualizarLibro(id: number, libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, libro);
  }

  // ─── ACTUALIZAR PARCIALMENTE ──────────────────────────────────────────────
  patchLibro(id: number, datos: Partial<Libro>): Observable<Libro> {
    return this.http.patch<Libro>(`${this.apiUrl}/${id}`, datos);
  }

  // ─── ELIMINAR ─────────────────────────────────────────────────────────────
  eliminarLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ─── LIBROS DISPONIBLES ───────────────────────────────────────────────────
  getLibrosDisponibles(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/disponibles`);
  }
}
