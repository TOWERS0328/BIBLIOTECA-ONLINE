import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  {path: '', redirectTo: 'libros', pathMatch:'full'},

  // Rutas Publicas


  { path: 'login',    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'registro', loadComponent: () => import('./features/auth/registro/registro.component').then(m => m.RegistroComponent) },

    // Rutas protegidas (requieren login)

  { path: 'libros',   loadComponent: () => import('./features/libros/lista-libros/lista-libros.component').then(m => m.ListaLibrosComponent), canActivate: [authGuard] },
  { path: 'libros/:id', loadComponent: () => import('./features/libros/detalle-libro/detalle-libro.component').then(m => m.DetalleLibroComponent), canActivate: [authGuard] },
  { path: 'reservas', loadComponent: () => import('./features/reservas/mis-reservas/mis-reservas.component').then(m => m.MisReservasComponent), canActivate: [authGuard] },
  { path: 'prestamos', loadComponent: () => import('./features/prestamos/historial-prestamos/historial-prestamos.component').then(m => m.HistorialPrestamosComponent), canActivate: [authGuard] },

  // Rutas de Admin (requieren rol ADMIN)
  { path: 'admin/libros',    loadComponent: () => import('./features/admin/gestion-libros/gestion-libros.component').then(m => m.GestionLibrosComponent), canActivate: [authGuard, roleGuard] },
  { path: 'admin/usuarios',  loadComponent: () => import('./features/admin/gestion-usuarios/gestion-usuarios.component').then(m => m.GestionUsuariosComponent), canActivate: [authGuard, roleGuard] },
  { path: 'admin/reportes',  loadComponent: () => import('./features/admin/reportes/reportes.component').then(m => m.ReportesComponent), canActivate: [authGuard, roleGuard] },

  { path: '**', redirectTo: 'libros' }
];
