import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-layout-usuario',
  imports: [RouterOutlet, Navbar],
  templateUrl: './layout-usuario.html',
  styleUrl: './layout-usuario.scss',
})
export class LayoutUsuario {

}
