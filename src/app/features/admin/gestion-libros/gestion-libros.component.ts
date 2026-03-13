import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Libro } from '../../../core/models/libro.model';
import { LibroService } from '../../../core/services/libro';

declare var bootstrap: any;

@Component({
  selector: 'app-gestion-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-libros.component.html'
})
export class GestionLibrosComponent implements OnInit {
  busqueda = '';
  categoriaFiltro = '';
  cargando = false;
  error = '';

  libros: Libro[] = [];
  libroSeleccionado: Partial<Libro> = {};
  libroDetalle?: Libro;

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.cargando = true;
    this.libroService.getLibros().subscribe({
      next: (res) => {
        this.libros = res.content;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar los libros';
        this.cargando = false;
      }
    });
  }

  librosFiltrados(): Libro[] {
    return this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) &&
      (this.categoriaFiltro ? libro.genero === this.categoriaFiltro : true)
    );
  }

  abrirNuevoLibro(): void {
    this.libroSeleccionado = {
      titulo: '',
      autor: '',
      isbn: '',
      genero: 'Programación',
      cantidadDisponible: 1,
      cantidadTotal: 1,
      activo: true
    };
  }

  editarLibro(libro: Libro): void {
    this.libroSeleccionado = { ...libro };
  }

  guardarLibro(): void {
    if (this.libroSeleccionado.id) {
      // Editar
      this.libroService.actualizarLibro(
        this.libroSeleccionado.id,
        this.libroSeleccionado as Libro
      ).subscribe({
        next: () => this.cargarLibros(),
        error: () => this.error = 'Error al actualizar el libro'
      });
    } else {
      // Crear
      this.libroService.crearLibro(this.libroSeleccionado as Libro).subscribe({
        next: () => this.cargarLibros(),
        error: () => this.error = 'Error al crear el libro'
      });
    }
  }

  eliminarLibro(id: number, event: Event): void {
    event.stopPropagation();
    if (!confirm('¿Eliminar este libro?')) return;
    this.libroService.eliminarLibro(id).subscribe({
      next: () => this.cargarLibros(),
      error: () => this.error = 'Error al eliminar el libro'
    });
  }

  verDetalles(libro: Libro): void {
    this.libroDetalle = libro;
    const modal = new bootstrap.Modal(document.getElementById('modalDetalles'));
    modal.show();
  }

  estaDisponible(libro: Libro): boolean {
    return libro.cantidadDisponible > 0;
  }
}
