import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-admin.html',
  styleUrls: ['./navbar-admin.scss']
})
export class NavbarAdmin {

  constructor(private router: Router) {}

  cerrarSesion(){

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }

}
