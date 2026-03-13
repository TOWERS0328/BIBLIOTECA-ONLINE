import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Libro } from '../../../core/models/libro.model';
import { LibroService } from '../../../core/services/libro';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-libro.component.html',
  styleUrl: './detalle-libro.component.scss'
})
export class DetalleLibroComponent implements OnInit {
  libro!: Libro;
  cargando = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private libroService: LibroService,
    private authService: AuthService  // ← faltaba
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/libros']);
      return;
    }
    this.cargarLibro(id);
  }

  cargarLibro(id: number): void {
    this.cargando = true;
    this.libroService.getLibroById(id).subscribe({
      next: (data) => {
        this.libro = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el libro';
        this.cargando = false;
      }
    });
  }

  estaDisponible(): boolean {
    return this.libro.cantidadDisponible > 0;
  }

  reservar(): void {
    if (!this.authService.isLoggedIn()) {  // ← this.auth → this.authService
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url }
      });
      return;
    }
    this.router.navigate(['/reservas'], {
      queryParams: { libroId: this.libro.id }
    });
  }

  volver(): void {
    this.router.navigate(['/libros']);
  }
}
