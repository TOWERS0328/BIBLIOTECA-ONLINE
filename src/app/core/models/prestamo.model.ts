export interface Prestamo{
  id: number;
  libroId: number;
  tituloLibro: string;
  usuarioId:number;
  fechaPrestamo:string;
  fechaDevolucion: string;
  devuelto: boolean;
}
