import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Route } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
cerrarSesion(){

  // eliminar datos de sesión
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');

  // redirigir al login
  /*this.router.navigate(['/login']);*/

}
}
