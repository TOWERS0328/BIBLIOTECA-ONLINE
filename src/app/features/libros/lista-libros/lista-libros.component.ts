import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Libro } from '../../../core/models/libro.model';
import { LibroService } from '../../../core/services/libro';

@Component({
  selector: 'app-lista-libros',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.scss']
})
export class ListaLibrosComponent implements OnInit {
  libros: Libro[] = [];
  librosFiltrados: Libro[] = [];
  busqueda = '';
  cargando = false;
  error = '';

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.cargando = true;
    this.libroService.getLibros().subscribe({
      next: (response) => {
        this.libros = response.content;
        this.librosFiltrados = response.content;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar los libros';
        this.cargando = false;
      }
    });
  }

  onBuscar(): void {
    const texto = this.busqueda.toLowerCase().trim();
    if (!texto) {
      this.librosFiltrados = this.libros;
      return;
    }
    this.librosFiltrados = this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(texto) ||
      libro.autor.toLowerCase().includes(texto) ||
      libro.genero?.toLowerCase().includes(texto) ||
      libro.isbn.toLowerCase().includes(texto)
    );
  }

  estaDisponible(libro: Libro): boolean {
    return libro.cantidadDisponible > 0;
  }
}
