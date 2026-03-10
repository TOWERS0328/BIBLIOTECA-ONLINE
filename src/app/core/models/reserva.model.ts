export interface Reserva{
  id:number;
  libroId: number;
  tituloLibro: string;
  usuarioId: number;
  fechaReserva: string;
  estado: 'PENDIENTE'| 'CONFIRMADA' | 'CANCELADA';
}
