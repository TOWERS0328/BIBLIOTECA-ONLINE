import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prestamo } from '../../../core/models/prestamo.model';
import { PrestamoService } from '../../../core/services/prestamo';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-historial-prestamos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-prestamos.component.html',
  styleUrl: './historial-prestamos.component.scss'
})
export class HistorialPrestamosComponent implements OnInit {
  prestamos: Prestamo[] = [];
  prestamoSeleccionado?: Prestamo;
  cargando = false;
  error = '';

  constructor(
    private prestamoService: PrestamoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    this.cargando = true;
    this.prestamoService.getPrestamosPorUsuario(currentUser.id).subscribe({
      next: (data) => {
        this.prestamos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar el historial';
        this.cargando = false;
      }
    });
  }

  abrirDetalle(prestamo: Prestamo): void {
    this.prestamoSeleccionado = prestamo;
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'DEVUELTO': return 'bg-success';
      case 'VENCIDO':  return 'bg-danger';
      default:         return 'bg-warning text-dark';
    }
  }
}
