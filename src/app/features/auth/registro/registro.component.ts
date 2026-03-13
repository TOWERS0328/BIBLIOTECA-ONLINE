import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';
import { UsuarioService } from '../../../core/services/usuario';
import { RegisterRequest, RolUsuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-registro',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  form: FormGroup;
  cargando = false;
  error = '';
  rolDetectado: RolUsuario = 'ESTUDIANTE';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre:   ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email:    ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Detectar rol en tiempo real al escribir el email
    this.form.get('email')?.valueChanges.subscribe(email => {
      if (email) this.rolDetectado = this.usuarioService.detectarRolPorEmail(email);
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.cargando = true;
    this.error = '';

    const request: RegisterRequest = {
      ...this.form.value,
      rol: this.rolDetectado
    };

    this.authService.register(request).subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: (err) => {
        this.error = err.status === 409
          ? 'El usuario o correo ya existe'
          : 'Error al registrarse. Intenta de nuevo.';
        this.cargando = false;
      }
    });
  }
}
