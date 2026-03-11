import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'libros', pathMatch: 'full' },

  // Rutas Públicas
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'registro', loadComponent: () => import('./features/auth/registro/registro.component').then(m => m.RegistroComponent) },

  // Rutas (sin guards)
  { path: 'libros', loadComponent: () => import('./features/libros/lista-libros/lista-libros.component').then(m => m.ListaLibrosComponent) },
  { path: 'libros/:id', loadComponent: () => import('./features/libros/detalle-libro/detalle-libro.component').then(m => m.DetalleLibroComponent) },
  { path: 'reservas', loadComponent: () => import('./features/reservas/mis-reservas/mis-reservas.component').then(m => m.MisReservasComponent) },
  { path: 'prestamos', loadComponent: () => import('./features/prestamos/historial-prestamos/historial-prestamos.component').then(m => m.HistorialPrestamosComponent) },
   {
    path: 'perfil', loadComponent: () => import('./features/perfil/perfil/perfil').then(m => m.PerfilComponent)
  },

  // Rutas de Admin (sin guards)
  { path: 'admin/libros', loadComponent: () => import('./features/admin/gestion-libros/gestion-libros.component').then(m => m.GestionLibrosComponent) },
  { path: 'admin/usuarios', loadComponent: () => import('./features/admin/gestion-usuarios/gestion-usuarios.component').then(m => m.GestionUsuariosComponent) },
  { path: 'admin/reportes', loadComponent: () => import('./features/admin/reportes/reportes.component').then(m => m.ReportesComponent) },

  { path: '**', redirectTo: 'libros' }
];
