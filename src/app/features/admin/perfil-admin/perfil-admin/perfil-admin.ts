import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../../core/models/usuario.model';
import { UsuarioService } from '../../../../core/services/usuario';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-admin.html',
  styleUrl: './perfil-admin.scss'
})
export class PerfilAdminComponent implements OnInit {
  admin?: Usuario;
  passwordActual = '';
  nuevaPassword = '';
  confirmarPassword = '';
  previewImagen: string | ArrayBuffer | null = null;
  cargando = false;
  errorPassword = '';
  exitoPassword = false;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    this.usuarioService.getUsuarioById(currentUser.id).subscribe({
      next: (data) => this.admin = data,
      error: () => console.error('Error al cargar perfil admin')
    });
  }

  cambiarPassword(): void {
    this.errorPassword = '';
    this.exitoPassword = false;

    if (this.nuevaPassword !== this.confirmarPassword) {
      this.errorPassword = 'Las contraseñas no coinciden';
      return;
    }

    if (this.nuevaPassword.length < 6) {
      this.errorPassword = 'La contraseña debe tener mínimo 6 caracteres';
      return;
    }

    this.cargando = true;
    this.usuarioService.cambiarPassword(
      this.admin!.id,
      this.passwordActual,
      this.nuevaPassword
    ).subscribe({
      next: () => {
        this.exitoPassword = true;
        this.passwordActual = '';
        this.nuevaPassword = '';
        this.confirmarPassword = '';
        this.cargando = false;
      },
      error: (err) => {
        this.errorPassword = err.status === 400
          ? 'La contraseña actual es incorrecta'
          : 'Error al actualizar la contraseña';
        this.cargando = false;
      }
    });
  }

  seleccionarImagen(event: any): void {
    const archivo = event.target.files[0];
    if (!archivo) return;
    const reader = new FileReader();
    reader.onload = () => this.previewImagen = reader.result;
    reader.readAsDataURL(archivo);
  }
}
