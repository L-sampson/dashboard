import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonorsService {

  constructor(private http: HttpClient) {}

  bulkContactsImport(form: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/bulkcontacts`, form)
  }

  getDonorSummaryData(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/donors_summary`);
  }
}
