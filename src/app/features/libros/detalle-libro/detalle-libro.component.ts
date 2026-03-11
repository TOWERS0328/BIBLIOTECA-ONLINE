import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-libro.component.html',
  styleUrl: './detalle-libro.component.scss'
})
export class DetalleLibroComponent implements OnInit {

  libroId!: number;

  libro = {
    titulo: 'Don Quijote',
    autor: 'Miguel de Cervantes',
    editorial: 'Planeta',
    anio: 1605,
    categoria: 'Novela',
    disponible: true,
    descripcion: 'Una de las obras más importantes de la literatura española.'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

    this.libroId = Number(this.route.snapshot.paramMap.get('id'));

    console.log("ID del libro:", this.libroId);

  }

}

