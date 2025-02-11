import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laptop, Desktop, Misc } from '../interfaces/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  addLaptop(laptop: Laptop): Observable<Laptop> {
    return this.http.post<Laptop>('assets/laptops.json', laptop)
  }

  addDesktop(desktop: Desktop): Observable<Desktop> {
    return this.http.post<Desktop>('assets/desktops.json', desktop)
  }

  addMiscItem(misc: Misc): Observable<Misc> {
    return this.http.post<Misc>('assets/misc.json', misc)
  }

  bulkImport(form: FormData): Observable<FormData> {
    return this.http.post<FormData>(`${environment.apiUrl}/bulkinventory`, form)
  }

  fetchInventoryBlobs(): Observable<any> {
    return this.http.get<any>('assets/blobs.json')
  }

  getInventorySampleBlob() {
    return this.http.get(`${environment.apiUrl}/sampleinventory`, { responseType: 'blob' });
  }

  getInventorySummaryData(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/inventory_summary`);
  }
}
