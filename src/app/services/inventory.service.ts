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

  getLaptops(): Observable<Laptop[]> {
    return this.http.get<Laptop[]>(`${environment.apiUrl}/laptops`);
  }

  getDesktops(): Observable<Desktop[]> {
    return this.http.get<Desktop[]>(`${environment.apiUrl}/desktops`);
  }

  getMiscItems(): Observable<Misc[]> {
    return this.http.get<Misc[]>(`${environment.apiUrl}/misc`);
  }

  addLaptop(laptop: Laptop): Observable<Laptop> {
    return this.http.post<Laptop>('assets/laptops.json', laptop)
  }

  addDesktop(desktop: Desktop): Observable<Desktop> {
    return this.http.post<Desktop>('assets/desktops.json', desktop)
  }

  addMiscItem(misc: Misc): Observable<Misc> {
    return this.http.post<Misc>('assets/misc.json', misc)
  }
}
