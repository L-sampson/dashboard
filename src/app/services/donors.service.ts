import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donors, Organizations } from '../interfaces/models';
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

  getDonationsCount(): Observable<{donations_count: number}> {
    return this.http.get<{donations_count: number}>(`${environment.apiUrl}/donationsnumber`);
  }

  fetchContacts(): Observable<Donors[]> {
    return this.http.get<Donors[]>(`${environment.apiUrl}/contacts`)
  }

  fetchOrganizations(): Observable<Organizations[]> {
    return this.http.get<Organizations[]>(`${environment.apiUrl}/organizations`)
  }

  bulkContactsImport(form: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/bulkcontacts`, form)
  }
}
