import { Component } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { LoginRequest } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup;
  cargando = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      recordarme: [false]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.cargando = true;
    this.error = '';

    const request: LoginRequest = {
      username: this.form.value.username,
      password: this.form.value.password
    };

    this.authService.login(request).subscribe({
      next: (response) => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'];
        if (returnUrl) {
          this.router.navigateByUrl(returnUrl);
        } else if (response.rol === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/libros']);
        }
      },
      error: (err) => {
        this.error = err.status === 401
          ? 'Usuario o contraseña incorrectos'
          : 'Error al iniciar sesión. Intenta de nuevo.';
        this.cargando = false;
      }
    });
  }
}
