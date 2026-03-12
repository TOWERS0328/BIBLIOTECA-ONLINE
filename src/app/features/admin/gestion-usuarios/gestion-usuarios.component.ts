import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var bootstrap:any;

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-usuarios.component.html'
})
export class GestionUsuariosComponent {

busqueda='';

usuarioSeleccionado:any={};
usuarioDetalle:any=null;

usuarios:any[]=[

{
id:1,
nombre:'Juan Torres',
email:'juan@email.com',
rol:'Estudiante',
estado:'Activo'
},

{
id:2,
nombre:'Ana Lopez',
email:'ana@email.com',
rol:'Docente',
estado:'Activo'
}

];

usuariosFiltrados(){

return this.usuarios.filter(u =>
u.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
u.email.toLowerCase().includes(this.busqueda.toLowerCase())
);

}

nuevoUsuario(){

this.usuarioSeleccionado={
nombre:'',
email:'',
rol:'Estudiante',
estado:'Activo'
};

}

editarUsuario(usuario:any){

this.usuarioSeleccionado={...usuario};

}

guardarUsuario(){

if(this.usuarioSeleccionado.id){

const index=this.usuarios.findIndex(
u=>u.id===this.usuarioSeleccionado.id
);

this.usuarios[index]={...this.usuarioSeleccionado};

}else{

this.usuarioSeleccionado.id=this.usuarios.length+1;
this.usuarios.push({...this.usuarioSeleccionado});

}

}

eliminarUsuario(id:number){

this.usuarios=this.usuarios.filter(u=>u.id!==id);

}

verDetalles(usuario:any){

this.usuarioDetalle=usuario;

const modal=new bootstrap.Modal(
document.getElementById('modalDetalleUsuario')
);

modal.show();

}

}
