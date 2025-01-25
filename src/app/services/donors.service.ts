import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laptop, Desktop, Misc } from '../interfaces/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonorsService {

  constructor(private http: HttpClient) {}

  getOrganizationsCount(): Observable<{organizations_count: number}> {
    return this.http.get<{organizations_count: number}>(`${environment.apiUrl}/orgsnumber`);
  }
}
