export type EstadoPrestamo = 'ACTIVO' | 'DEVUELTO' | 'VENCIDO';

export interface Prestamo {
  id: number;
  libroId: number;
  tituloLibro: string;
  usuarioId: number;
  nombreUsuario: string;
  fechaPrestamo: string;
  fechaDevolucion: string;
  estado: EstadoPrestamo;
}

export interface CrearPrestamoRequest {
  libroId: number;
  usuarioId: number;
  fechaDevolucion: string;
}

export interface PrestamoFiltro {
  usuarioId?: number;
  libroId?: number;
  estado?: EstadoPrestamo;
  page?: number;
  size?: number;
}
