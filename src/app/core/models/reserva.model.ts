export interface Reserva {
  id?: number;
  usuarioId: number;
  libroId: number;
  usuario?: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
  };
  libro?: {
    id: number;
    titulo: string;
    autor: string;
    isbn: string;
  };
  fechaReserva?: string;
  fechaExpiracion?: string;
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA' | 'EXPIRADA';
  observaciones?: string;
}

export interface ReservaFiltro {
  usuarioId?: number;
  libroId?: number;
  estado?: string;
  page?: number;
  size?: number;
}

export interface CrearReservaRequest {
  usuarioId: number;
  libroId: number;
  observaciones?: string;
}
