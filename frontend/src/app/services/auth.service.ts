import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../interfaces/login';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/login';
  private isLoggedInStatus = false;

  constructor(
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private router: Router
  ){
    this.isLoggedInStatus = !!this.getToken();
  }

  login(credentials: Login): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/login`, credentials);
  }

  getToken(){
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    return token;
  }

  isAdmin(): boolean{
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        return decoded.isAdmin || false;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return false;
      }
    } else {
      console.error('No se encontró token');
      return false;
    }
  }  

  redirect(){
    if (this.isAdmin()) {
      this.router.navigate(['/private']);
    } else {
      this.router.navigate(['/']);
    }
  }

  isLogged(): boolean{
    return this.isLoggedInStatus;
  }

  logout(){
    this.toastrService.info('Cierre de sesión');
    localStorage.removeItem('token');
    this.isLoggedInStatus = false;
    this.router.navigate(['/'])
  }

  setLoggedInStatus(status: boolean) {
    this.isLoggedInStatus = status; 
  }

  register(correo: string, contrasenia: string, nombre: string, documentoIdentidad: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/register`, { correo, contrasenia, nombre, documentoIdentidad });
  }
}
