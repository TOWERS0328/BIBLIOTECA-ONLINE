import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Prestamo, CrearPrestamoRequest, EstadoPrestamo } from '../../../core/models/prestamo.model';
import { Usuario } from '../../../core/models/usuario.model';
import { Libro } from '../../../core/models/libro.model';
import { PrestamoService } from '../../../core/services/prestamo';
import { UsuarioService } from '../../../core/services/usuario';
import { LibroService } from '../../../core/services/libro';

@Component({
  selector: 'app-prestamos-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prestamos-admin.html',
  styleUrl: './prestamos-admin.scss'
})
export class PrestamosAdmin implements OnInit {
  prestamos: Prestamo[] = [];
  usuarios: Usuario[] = [];
  libros: Libro[] = [];
  prestamoSeleccionado: Partial<CrearPrestamoRequest & { id?: number; estado?: EstadoPrestamo }> = {};
  cargando = false;
  error = '';

  constructor(
    private prestamoService: PrestamoService,
    private usuarioService: UsuarioService,
    private libroService: LibroService
  ) {}

  ngOnInit(): void {
    this.cargarPrestamos();
    this.cargarUsuarios();
    this.cargarLibros();
  }

  cargarPrestamos(): void {
    this.cargando = true;
    this.prestamoService.getPrestamos().subscribe({
      next: (data) => { this.prestamos = data; this.cargando = false; },
      error: () => { this.error = 'Error al cargar préstamos'; this.cargando = false; }
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

  abrirNuevoPrestamo(): void {
    this.prestamoSeleccionado = {
      usuarioId: undefined,
      libroId: undefined,
      fechaDevolucion: '',
      estado: 'ACTIVO'
    };
  }

  editarPrestamo(prestamo: Prestamo): void {
    this.prestamoSeleccionado = {
      id: prestamo.id,
      usuarioId: prestamo.usuarioId,
      libroId: prestamo.libroId,
      fechaDevolucion: prestamo.fechaDevolucion,
      estado: prestamo.estado
    };
  }

  guardarPrestamo(): void {
    if (this.prestamoSeleccionado.id) {
      // Devolver libro si estado cambia a DEVUELTO
      if (this.prestamoSeleccionado.estado === 'DEVUELTO') {
        this.prestamoService.devolverLibro(this.prestamoSeleccionado.id).subscribe({
          next: () => this.cargarPrestamos(),
          error: () => this.error = 'Error al devolver el libro'
        });
      }
    } else {
      const request: CrearPrestamoRequest = {
        usuarioId: this.prestamoSeleccionado.usuarioId!,
        libroId: this.prestamoSeleccionado.libroId!,
        fechaDevolucion: this.prestamoSeleccionado.fechaDevolucion!
      };
      this.prestamoService.crearPrestamo(request).subscribe({
        next: () => this.cargarPrestamos(),
        error: () => this.error = 'Error al crear el préstamo'
      });
    }
  }

  eliminarPrestamo(id: number, event: Event): void {
    event.stopPropagation();
    if (!confirm('¿Eliminar este préstamo?')) return;
    // No hay endpoint delete en el servicio — marcar como devuelto
    this.prestamoService.devolverLibro(id).subscribe({
      next: () => this.cargarPrestamos(),
      error: () => this.error = 'Error al eliminar el préstamo'
    });
  }

  getBadgeEstado(estado: string): string {
    switch (estado) {
      case 'ACTIVO':    return 'bg-warning text-dark';
      case 'DEVUELTO':  return 'bg-success';
      case 'VENCIDO':   return 'bg-danger';
      default:          return 'bg-secondary';
    }
  }
}
