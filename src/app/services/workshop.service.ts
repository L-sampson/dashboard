import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workshop, Participants } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  constructor(private http: HttpClient) { }

  getWorkshops(): Observable<Workshop[]> {
    return this.http.get<Workshop[]>('assets/workshops.json');
  }

  getParticipants(): Observable<Participants[]> {
    return this.http.get<Participants[]>('assets/participants.json');
  }
}
