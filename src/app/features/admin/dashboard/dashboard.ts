import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { LibroService } from '../../../core/services/libro';
import { UsuarioService } from '../../../core/services/usuario';
import { PrestamoService } from '../../../core/services/prestamo';
import { ReservaService } from '../../../core/services/reserva';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  totalLibros = 0;
  librosPrestados = 0;
  reservasActivas = 0;
  totalUsuarios = 0;

  constructor(
    private libroService: LibroService,
    private usuarioService: UsuarioService,
    private prestamoService: PrestamoService,
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    this.cargarTarjetas();
  }

  ngAfterViewInit(): void {
    this.crearGraficoLibros();
    this.crearGraficoUsuarios();
    this.crearGraficoPrestamos();
  }

  cargarTarjetas(): void {
    // Total libros
    this.libroService.getLibros().subscribe({
      next: (res) => this.totalLibros = res.totalElements
    });

    // Libros prestados (préstamos activos)
    this.prestamoService.getPrestamos({ estado: 'ACTIVO' }).subscribe({
      next: (data) => this.librosPrestados = data.length
    });

    // Reservas activas
    this.reservaService.getReservas({ estado: 'PENDIENTE' }).subscribe({
      next: (res) => this.reservasActivas = res.content.length
    });

    // Total usuarios
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => this.totalUsuarios = data.length
    });
  }

  crearGraficoLibros(): void {
    this.libroService.getLibros().subscribe({
      next: (res) => {
        const disponibles = res.content.filter(l => l.cantidadDisponible > 0).length;
        const prestados = res.content.filter(l => l.cantidadDisponible === 0).length;

        new Chart('graficoLibros', {
          type: 'doughnut',
          data: {
            labels: ['Disponibles', 'Prestados'],
            datasets: [{
              data: [disponibles, prestados],
              backgroundColor: ['#198754', '#dc3545']
            }]
          },
          options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        });
      }
    });
  }

  crearGraficoUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        const estudiantes = data.filter(u => u.rol === 'ESTUDIANTE').length;
        const docentes    = data.filter(u => u.rol === 'DOCENTE').length;
        const admins      = data.filter(u => u.rol === 'ADMIN').length;

        new Chart('graficoUsuarios', {
          type: 'pie',
          data: {
            labels: ['Estudiantes', 'Docentes', 'Admins'],
            datasets: [{
              data: [estudiantes, docentes, admins],
              backgroundColor: ['#0d6efd', '#ffc107', '#6f42c1']
            }]
          },
          options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        });
      }
    });
  }

  crearGraficoPrestamos(): void {
    this.prestamoService.getPrestamos().subscribe({
      next: (data) => {
        const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        const conteo = new Array(12).fill(0);

        data.forEach(p => {
          if (p.fechaPrestamo) {
            const mes = new Date(p.fechaPrestamo).getMonth();
            conteo[mes]++;
          }
        });

        new Chart('graficoPrestamos', {
          type: 'bar',
          data: {
            labels: meses,
            datasets: [{
              label: 'Préstamos',
              data: conteo,
              backgroundColor: '#0dcaf0'
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
          }
        });
      }
    });
  }
}
