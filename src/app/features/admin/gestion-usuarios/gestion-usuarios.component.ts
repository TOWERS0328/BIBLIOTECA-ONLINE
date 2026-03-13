import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario, RolUsuario, EstadoUsuario } from '../../../core/models/usuario.model';
import { UsuarioService } from '../../../core/services/usuario';

declare var bootstrap: any;

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-usuarios.component.html'
})
export class GestionUsuariosComponent implements OnInit {
  busqueda = '';
  cargando = false;
  error = '';

  usuarios: Usuario[] = [];
  usuarioSeleccionado: Partial<Usuario> = {};
  usuarioDetalle?: Usuario;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar los usuarios';
        this.cargando = false;
      }
    });
  }

  usuariosFiltrados(): Usuario[] {
    return this.usuarios.filter(u =>
      u.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      u.email.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      u.username.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  nuevoUsuario(): void {
    this.usuarioSeleccionado = {
      nombre: '',
      apellido: '',
      email: '',
      username: '',
      rol: 'ESTUDIANTE',
      estado: 'ACTIVO'
    };
  }

  editarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = { ...usuario };
  }

  guardarUsuario(): void {
    if (this.usuarioSeleccionado.id) {
      this.usuarioService.actualizarUsuario(
        this.usuarioSeleccionado.id,
        this.usuarioSeleccionado
      ).subscribe({
        next: () => this.cargarUsuarios(),
        error: () => this.error = 'Error al actualizar el usuario'
      });
    } else {
      this.usuarioService.crearUsuario(
        this.usuarioSeleccionado as Omit<Usuario, 'id'>
      ).subscribe({
        next: () => this.cargarUsuarios(),
        error: () => this.error = 'Error al crear el usuario'
      });
    }
  }

  cambiarEstado(usuario: Usuario): void {
    const nuevoEstado: EstadoUsuario = usuario.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    this.usuarioService.cambiarEstado(usuario.id, nuevoEstado).subscribe({
      next: () => this.cargarUsuarios(),
      error: () => this.error = 'Error al cambiar el estado'
    });
  }

  cambiarRol(id: number, rol: RolUsuario): void {
    this.usuarioService.cambiarRol(id, rol).subscribe({
      next: () => this.cargarUsuarios(),
      error: () => this.error = 'Error al cambiar el rol'
    });
  }

  eliminarUsuario(id: number, event: Event): void {
    event.stopPropagation();
    if (!confirm('¿Eliminar este usuario?')) return;
    this.usuarioService.eliminarUsuario(id).subscribe({
      next: () => this.cargarUsuarios(),
      error: () => this.error = 'Error al eliminar el usuario'
    });
  }

  verDetalles(usuario: Usuario): void {
    this.usuarioDetalle = usuario;
    const modal = new bootstrap.Modal(document.getElementById('modalDetalleUsuario'));
    modal.show();
  }
}
