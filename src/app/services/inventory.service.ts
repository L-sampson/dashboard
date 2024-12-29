import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laptop, Desktop, Misc } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getLaptops(): Observable<Laptop[]> {
    return this.http.get<Laptop[]>('assets/laptops.json');
  }

  getDesktops(): Observable<Desktop[]> {
    return this.http.get<Desktop[]>('assets/desktops.json');
  }

  getMiscItems(): Observable<Misc[]> {
    return this.http.get<Misc[]>('assets/misc.json');
  }
}
