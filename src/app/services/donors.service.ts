import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donors } from '../interfaces/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonorsService {

  constructor(private http: HttpClient) {}

  getOrganizationsCount(): Observable<{organizations_count: number}> {
    return this.http.get<{organizations_count: number}>(`${environment.apiUrl}/orgsnumber`);
  }

  getContactsCount(): Observable<{contacts_count: number}> {
    return this.http.get<{contacts_count: number}>(`${environment.apiUrl}/contactsnumber`)
  }

  fetchContacts(): Observable<Donors[]> {
    return this.http.get<Donors[]>(`${environment.apiUrl}/contacts`)
  }
}
