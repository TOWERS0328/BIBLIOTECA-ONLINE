import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LayoutUsuario } from './layouts/layout-usuario/layout-usuario';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin';

export const routes: Routes = [

  { path: '', redirectTo: 'libros', pathMatch: 'full' },

  // =========================
  // RUTAS PÚBLICAS
  // =========================
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./features/auth/registro/registro.component').then(m => m.RegistroComponent)
  },

  // =========================
  // RUTAS USUARIO (CON NAVBAR)
  // =========================
  {
    path: '',
    component: LayoutUsuario,
    children: [

      // ── Públicas (sin login) ──────────────────────────────────────────────
      {
        path: 'libros',
        loadComponent: () =>
          import('./features/libros/lista-libros/lista-libros.component').then(m => m.ListaLibrosComponent)
      },
      {
        path: 'libros/:id',
        loadComponent: () =>
          import('./features/libros/detalle-libro/detalle-libro.component').then(m => m.DetalleLibroComponent)
      },

      // ── Protegidas (requieren login) ──────────────────────────────────────
      {
        path: 'reservas',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/reservas/mis-reservas/mis-reservas.component').then(m => m.MisReservasComponent)
      },
      {
        path: 'prestamos',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/prestamos/historial-prestamos/historial-prestamos.component').then(m => m.HistorialPrestamosComponent)
      },
      {
        path: 'perfil',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/perfil/perfil/perfil').then(m => m.PerfilComponent)
      }
    ]
  },

  // =========================
  // RUTAS ADMIN
  // =========================
  {
    path: 'admin',
    component: LayoutAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./features/admin/gestion-usuarios/gestion-usuarios.component').then(m => m.GestionUsuariosComponent)
      },
      {
        path: 'libros',
        loadComponent: () =>
          import('./features/admin/gestion-libros/gestion-libros.component').then(m => m.GestionLibrosComponent)
      },
      {
        path: 'prestamos',
        loadComponent: () =>
          import('./features/admin/prestamos-admin/prestamos-admin').then(m => m.PrestamosAdmin)
      },
      {
        path: 'reservas',
        loadComponent: () =>
          import('./features/admin/reservas-admin/reservas-admin').then(m => m.ReservasAdmin)
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./features/admin/perfil-admin/perfil-admin/perfil-admin').then(m => m.PerfilAdminComponent)
      }
    ]
  },

  { path: '**', redirectTo: 'libros' }
];
