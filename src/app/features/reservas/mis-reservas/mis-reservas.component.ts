import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reserva } from '../../../core/models/reserva.model';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss']
})
export class MisReservasComponent {

  reservas: Reserva[] = [];

  reservaSeleccionada?: Reserva;

  constructor() {

    // Simulación datos BD
    this.reservas = [
      {
        id: 1,
        libroId: 201,
        tituloLibro: '1984',
        usuarioId: 5,
        fechaReserva: '2024-06-10',
        estado: 'CONFIRMADA'
      },
      {
        id: 2,
        libroId: 202,
        tituloLibro: 'El Principito',
        usuarioId: 5,
        fechaReserva: '2024-06-12',
        estado: 'PENDIENTE'
      }
    ];
  }

  verDetalle(reserva: Reserva) {
    this.reservaSeleccionada = reserva;
  }

}
