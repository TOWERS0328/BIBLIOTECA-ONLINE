import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements AfterViewInit {

  totalLibros = 120;
  librosPrestados = 40;
  reservasActivas = 15;
  totalUsuarios = 85;

  ngAfterViewInit(){

    this.crearGraficoInventario();
    this.crearGraficoUsuarios();
    this.crearGraficoPrestamos();

  }

  crearGraficoInventario(){

    new Chart("graficoLibros",{
      type:'doughnut',

      data:{
        labels:['Disponibles','Prestados','Reservados'],
        datasets:[{
          data:[80,40,15],
          backgroundColor:[
            '#198754',
            '#dc3545',
            '#ffc107'
          ]
        }]
      },

      options:{
        responsive:true,
        plugins:{
          legend:{ position:'bottom' }
        }
      }

    });

  }

  crearGraficoUsuarios(){

    new Chart("graficoUsuarios",{

      type:'bar',

      data:{
        labels:['Estudiantes','Docentes','Admin'],
        datasets:[{
          label:'Usuarios',
          data:[60,20,5],
          backgroundColor:[
            '#0d6efd',
            '#20c997',
            '#6f42c1'
          ]
        }]
      }

    });

  }

  crearGraficoPrestamos(){

    new Chart("graficoPrestamos",{

      type:'line',

      data:{
        labels:['Ene','Feb','Mar','Abr','May','Jun'],

        datasets:[{
          label:'Préstamos',
          data:[5,8,12,7,10,15],
          borderColor:'#dc3545',
          tension:0.3
        }]
      }

    });

  }

}
