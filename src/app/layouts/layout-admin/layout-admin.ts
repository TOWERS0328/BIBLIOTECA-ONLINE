import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarAdmin } from '../../shared/components/navbar-admin/navbar-admin';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [RouterOutlet, NavbarAdmin],
  templateUrl: './layout-admin.html',
  styleUrls: ['./layout-admin.scss']
})
export class LayoutAdminComponent {}
