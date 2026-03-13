import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reserva } from '../../../core/models/reserva.model';
import { ReservaService } from '../../../core/services/reserva';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss']
})
export class MisReservasComponent implements OnInit {
  reservas: Reserva[] = [];
  reservaSeleccionada?: Reserva;
  cargando = false;
  error = '';

  constructor(
    private reservaService: ReservaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    this.cargando = true;
    this.reservaService.getReservasPorUsuario(currentUser.id).subscribe({
      next: (response) => {
        this.reservas = response.content;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar las reservas';
        this.cargando = false;
      }
    });
  }

  verDetalle(reserva: Reserva): void {
    this.reservaSeleccionada = reserva;
  }

  cancelarReserva(id: number): void {
    this.reservaService.cancelarReserva(id).subscribe({
      next: () => this.cargarReservas(),
      error: () => this.error = 'Error al cancelar la reserva'
    });
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'CONFIRMADA':  return 'bg-success';
      case 'CANCELADA':   return 'bg-danger';
      case 'COMPLETADA':  return 'bg-primary';
      case 'EXPIRADA':    return 'bg-secondary';
      default:            return 'bg-warning text-dark';
    }
  }

  getBadgeIcon(estado: string): string {
    switch (estado) {
      case 'CONFIRMADA':  return 'bi-check-circle';
      case 'CANCELADA':   return 'bi-x-circle';
      case 'COMPLETADA':  return 'bi-bookmark-check';
      case 'EXPIRADA':    return 'bi-calendar-x';
      default:            return 'bi-clock';
    }
  }
}
