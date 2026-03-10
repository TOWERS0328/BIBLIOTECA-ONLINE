import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Libro } from '../../../core/models/libro.model';

@Component({
  selector: 'app-lista-libros',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.scss']
})
export class ListaLibrosComponent {

  busqueda = '';

  libros: Libro[] = [
    {
      id:1,
      titulo:'Clean Code',
      autor:'Robert C. Martin',
      editorial:'Prentice Hall',
      anio:2008,
      disponible:true,
      categoria:'Programación'
    },
    {
      id:2,
      titulo:'Design Patterns',
      autor:'Erich Gamma',
      editorial:'Addison-Wesley',
      anio:1994,
      disponible:false,
      categoria:'Ingeniería de Software'
    }
  ];

}
