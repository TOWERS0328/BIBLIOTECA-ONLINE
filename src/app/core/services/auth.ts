import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
   // Verifica si el usuario tiene un token JWT guardado en el navegador
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  // Guarda el token cuando el usuario inicia sesión
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

   // Elimina el token cuando el usuario cierra sesión
  logout(): void {
    localStorage.removeItem('token');
  }

}
