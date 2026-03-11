import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss'
})
export class PerfilComponent {

  usuario?: Usuario;

  passwordActual = '';
  nuevaPassword = '';
  confirmarPassword = '';

  previewImagen: string | ArrayBuffer | null = null;

  constructor(){

    // Simulación datos BD
    this.usuario = {
    id:1,
    nombre:'Juan',
    apellido:'Díaz',
    email:'juan@email.com',
    username:'juan123',
    rol:'ESTUDIANTE',
    estado:'ACTIVO',
    imagen:'assets/usuarios/default-user.png'
  };

  }

  cambiarPassword(){

    if(this.nuevaPassword !== this.confirmarPassword){
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log("Password actual:",this.passwordActual);
    console.log("Nueva password:",this.nuevaPassword);

    alert("Contraseña actualizada");

    this.passwordActual='';
    this.nuevaPassword='';
    this.confirmarPassword='';
  }

  seleccionarImagen(event: any){

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
