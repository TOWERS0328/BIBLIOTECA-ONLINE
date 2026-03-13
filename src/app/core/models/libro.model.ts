export interface Libro {
  id?: number;
  titulo: string;
  autor: string;
  isbn: string;
  editorial?: string;
  anioPublicacion?: number;
  genero?: string;
  descripcion?: string;
  portadaUrl?: string;
  cantidadDisponible: number;
  cantidadTotal: number;
  activo?: boolean;
}

export interface LibroFiltro {
  titulo?: string;
  autor?: string;
  genero?: string;
  isbn?: string;
  disponible?: boolean;
  page?: number;
  size?: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}
