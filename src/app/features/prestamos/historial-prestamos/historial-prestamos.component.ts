import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prestamo } from '../../../core/models/prestamo.model';

@Component({
  selector: 'app-historial-prestamos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-prestamos.component.html',
  styleUrl: './historial-prestamos.component.scss'
})
export class HistorialPrestamosComponent {

  prestamos: Prestamo[] = [];

  prestamoSeleccionado?: Prestamo;

  constructor(){

    this.prestamos = [
      {
        id:1,
        libroId:101,
        tituloLibro:'Don Quijote',
        usuarioId:5,
        fechaPrestamo:'2024-05-01',
        fechaDevolucion:'2024-05-15',
        devuelto:true
      },
      {
        id:2,
        libroId:102,
        tituloLibro:'Cien años de soledad',
        usuarioId:5,
        fechaPrestamo:'2024-06-01',
        fechaDevolucion:'2024-06-15',
        devuelto:false
      }
    ];

  }

  abrirDetalle(prestamo: Prestamo){
    this.prestamoSeleccionado = prestamo;
  }

}
