import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<{token: string}>{
    return this.http.post<{token: string}>(`${environment.apiUrl}/login`, {username, password}).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    )
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthorized(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

}
