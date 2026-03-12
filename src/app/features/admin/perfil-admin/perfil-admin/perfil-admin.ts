import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Admin {
  id:number;
  nombre:string;
  apellido:string;
  email:string;
  username:string;
  rol:string;
  estado:string;
  imagen:string;
}

@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-admin.html',
  styleUrl: './perfil-admin.scss'
})
export class PerfilAdminComponent {

  admin?: Admin;

  passwordActual = '';
  nuevaPassword = '';
  confirmarPassword = '';

  previewImagen: string | ArrayBuffer | null = null;

  constructor(){

    // Simulación de datos
    this.admin = {
      id:1,
      nombre:'Administrador',
      apellido:'Sistema',
      email:'admin@biblioteca.com',
      username:'admin',
      rol:'ADMIN',
      estado:'ACTIVO',
      imagen:'assets/img/user.png'
    };

  }

  cambiarPassword(){

    if(this.nuevaPassword !== this.confirmarPassword){
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log("Password actual:",this.passwordActual);
    console.log("Nueva password:",this.nuevaPassword);

    alert("Contraseña actualizada correctamente");

    this.passwordActual='';
    this.nuevaPassword='';
    this.confirmarPassword='';
  }

  seleccionarImagen(event:any){

    const archivo = event.target.files[0];

    if(!archivo){
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.previewImagen = reader.result;
    };

    reader.readAsDataURL(archivo);
  }

}
