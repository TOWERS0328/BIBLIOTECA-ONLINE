import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prestamos-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prestamos-admin.html',
  styleUrl: './prestamos-admin.scss'
})
export class PrestamosAdmin {

  prestamos: any[] = [];

  usuarios = [
    { id: 1, nombre: 'Juan Torres', rol: 'ESTUDIANTE' },
    { id: 2, nombre: 'Carlos Perez', rol: 'DOCENTE' }
  ];

  libros = [
    { id: 1, titulo: 'Clean Code' },
    { id: 2, titulo: 'Redes Cisco' }
  ];

  prestamoSeleccionado: any = {};

  // =========================
  // ABRIR NUEVO PRESTAMO
  // =========================

  abrirNuevoPrestamo() {

    this.prestamoSeleccionado = {
      usuarioId: '',
      libroId: '',
      fechaPrestamo: '',
      fechaDevolucion: '',
      estado: 'Activo'
    };

  }

  // =========================
  // GUARDAR PRESTAMO
  // =========================

  guardarPrestamo() {

    if (!this.prestamoSeleccionado.id) {

      this.prestamoSeleccionado.id = Date.now();

      const usuario = this.usuarios.find(
        u => u.id == this.prestamoSeleccionado.usuarioId
      );

      const libro = this.libros.find(
        l => l.id == this.prestamoSeleccionado.libroId
      );

      this.prestamoSeleccionado.usuario = usuario?.nombre;
      this.prestamoSeleccionado.tipoUsuario = usuario?.rol;
      this.prestamoSeleccionado.libro = libro?.titulo;

      this.prestamos.push({ ...this.prestamoSeleccionado });

    } else {

      const index = this.prestamos.findIndex(
        p => p.id === this.prestamoSeleccionado.id
      );

      this.prestamos[index] = { ...this.prestamoSeleccionado };

    }

  }

  // =========================
  // EDITAR PRESTAMO
  // =========================

  editarPrestamo(prestamo: any) {

    this.prestamoSeleccionado = { ...prestamo };

  }

  // =========================
  // ELIMINAR PRESTAMO
  // =========================

  eliminarPrestamo(id: number) {

    this.prestamos = this.prestamos.filter(
      p => p.id !== id
    );

  }

}
