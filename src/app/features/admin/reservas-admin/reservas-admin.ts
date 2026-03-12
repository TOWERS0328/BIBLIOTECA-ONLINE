import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservas-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservas-admin.html',
  styleUrl: './reservas-admin.scss'
})
export class ReservasAdmin {

  reservas: any[] = [];

  usuarios = [
    { id: 1, nombre: 'Juan Torres', rol: 'ESTUDIANTE' },
    { id: 2, nombre: 'Carlos Perez', rol: 'DOCENTE' }
  ];

  libros = [
    { id: 1, titulo: 'Clean Code' },
    { id: 2, titulo: 'Redes Cisco' }
  ];

  reservaSeleccionada: any = {};

  abrirNuevaReserva() {

    this.reservaSeleccionada = {
      usuarioId: '',
      libroId: '',
      fecha: '',
      estado: 'Pendiente'
    };

  }

  guardarReserva() {

    if (!this.reservaSeleccionada.id) {

      this.reservaSeleccionada.id = Date.now();

      const usuario = this.usuarios.find(
        u => u.id == this.reservaSeleccionada.usuarioId
      );

      const libro = this.libros.find(
        l => l.id == this.reservaSeleccionada.libroId
      );

      this.reservaSeleccionada.usuario = usuario?.nombre;
      this.reservaSeleccionada.tipoUsuario = usuario?.rol;
      this.reservaSeleccionada.libro = libro?.titulo;

      this.reservas.push({ ...this.reservaSeleccionada });

    } else {

      const index = this.reservas.findIndex(
        r => r.id === this.reservaSeleccionada.id
      );

      this.reservas[index] = { ...this.reservaSeleccionada };

    }

  }

  editarReserva(reserva: any) {

    this.reservaSeleccionada = { ...reserva };

  }

  aprobarReserva(reserva: any) {

    reserva.estado = 'Aprobada';

  }

  eliminarReserva(id: number) {

    this.reservas = this.reservas.filter(
      r => r.id !== id
    );

  }

}
