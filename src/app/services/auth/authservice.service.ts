import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username: string, password: string): boolean {
    if(username == 'admin@iuatl.org' && password == 'Inspiredu!2025') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', username);
      localStorage.setItem('role', 'Admin');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }

  isAuthorized(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

}
