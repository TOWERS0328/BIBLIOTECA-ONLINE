import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var bootstrap:any;

@Component({
  selector: 'app-gestion-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-libros.component.html'
})
export class GestionLibrosComponent {

busqueda = '';
categoriaFiltro = '';

libroSeleccionado:any = {};
libroDetalle:any = null;

libros:any[] = [

{
id:1,
titulo:'Clean Code',
autor:'Robert Martin',
categoria:'Programación',
estado:'Prestado',
usuario:'Juan Torres',
fechaPrestamo:'2026-03-01',
fechaDevolucion:'2026-03-10',
stock:3,
imagen:'assets/img/libros/clean-code.jpg'
},

{
id:2,
titulo:'Angular Pro',
autor:'John Smith',
categoria:'Programación',
estado:'Disponible',
stock:5,
imagen:'assets/img/libros/angular.jpg'
}

];

librosFiltrados(){

return this.libros.filter(libro =>

libro.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) &&
(this.categoriaFiltro ? libro.categoria === this.categoriaFiltro : true)

);

}

abrirNuevoLibro(){

this.libroSeleccionado = {
titulo:'',
autor:'',
categoria:'Programación',
estado:'Disponible',
stock:1
};

}

editarLibro(libro:any){

this.libroSeleccionado = {...libro};

}

guardarLibro(){

if(this.libroSeleccionado.id){

const index = this.libros.findIndex(l => l.id === this.libroSeleccionado.id);
this.libros[index] = {...this.libroSeleccionado};

}else{

this.libroSeleccionado.id = this.libros.length + 1;
this.libros.push({...this.libroSeleccionado});

}

}

eliminarLibro(id:number){

this.libros = this.libros.filter(l => l.id !== id);

}

verDetalles(libro:any){

this.libroDetalle = libro;

const modal = new bootstrap.Modal(
document.getElementById('modalDetalles')
);

modal.show();

}

}
