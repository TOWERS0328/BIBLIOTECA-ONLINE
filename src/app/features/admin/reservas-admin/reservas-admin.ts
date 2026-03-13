import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Reserva, CrearReservaRequest } from '../../../core/models/reserva.model';
import { Usuario } from '../../../core/models/usuario.model';
import { Libro } from '../../../core/models/libro.model';
import { ReservaService } from '../../../core/services/reserva';
import { UsuarioService } from '../../../core/services/usuario';
import { LibroService } from '../../../core/services/libro';

@Component({
  selector: 'app-reservas-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservas-admin.html',
  styleUrl: './reservas-admin.scss'
})
export class ReservasAdmin implements OnInit {
  reservas: Reserva[] = [];
  usuarios: Usuario[] = [];
  libros: Libro[] = [];
  reservaSeleccionada: Partial<CrearReservaRequest & { id?: number }> = {};
  cargando = false;
  error = '';

  constructor(
    private reservaService: ReservaService,
    private usuarioService: UsuarioService,
    private libroService: LibroService
  ) {}

  ngOnInit(): void {
    this.cargarReservas();
    this.cargarUsuarios();
    this.cargarLibros();
  }

  cargarReservas(): void {
    this.cargando = true;
    this.reservaService.getReservas().subscribe({
      next: (res) => { this.reservas = res.content; this.cargando = false; },
      error: () => { this.error = 'Error al cargar reservas'; this.cargando = false; }
    });
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => this.usuarios = data
    });
  }

  cargarLibros(): void {
    this.libroService.getLibros().subscribe({
      next: (res) => this.libros = res.content
    });
  }

  abrirNuevaReserva(): void {
    this.reservaSeleccionada = {
      usuarioId: undefined,
      libroId: undefined,
      observaciones: ''
    };
  }

  editarReserva(reserva: Reserva): void {
    this.reservaSeleccionada = {
      id: reserva.id,
      usuarioId: reserva.usuarioId,
      libroId: reserva.libroId,
      observaciones: reserva.observaciones
    };
  }

  guardarReserva(): void {
    if (this.reservaSeleccionada.id) {
      // Solo se puede editar observaciones en una reserva existente
      this.cargarReservas();
    } else {
      const request: CrearReservaRequest = {
        usuarioId: this.reservaSeleccionada.usuarioId!,
        libroId: this.reservaSeleccionada.libroId!,
        observaciones: this.reservaSeleccionada.observaciones
      };
      this.reservaService.crearReserva(request).subscribe({
        next: () => this.cargarReservas(),
        error: () => this.error = 'Error al crear la reserva'
      });
    }
  }

  confirmarReserva(id: number): void {
    this.reservaService.confirmarReserva(id).subscribe({
      next: () => this.cargarReservas(),
      error: () => this.error = 'Error al confirmar la reserva'
    });
  }

  cancelarReserva(id: number, event: Event): void {
    event.stopPropagation();
    if (!confirm('¿Cancelar esta reserva?')) return;
    this.reservaService.cancelarReserva(id).subscribe({
      next: () => this.cargarReservas(),
      error: () => this.error = 'Error al cancelar la reserva'
    });
  }

  getBadgeEstado(estado: string): string {
    switch (estado) {
      case 'PENDIENTE':   return 'bg-warning text-dark';
      case 'CONFIRMADA':  return 'bg-success';
      case 'CANCELADA':   return 'bg-danger';
      case 'COMPLETADA':  return 'bg-primary';
      case 'EXPIRADA':    return 'bg-secondary';
      default:            return 'bg-secondary';
    }
  }
}
