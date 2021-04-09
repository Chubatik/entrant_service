import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IEntrant} from '../interfaces/entrant/entrant';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) {
  }
  public getEntrants(): Observable<any>{
    return this.httpClient.get('/api/view-list');
  }
  public getPrivAndSpec(): Observable<any>{
    return this.httpClient.get('/api/add-form');
  }
  public addEntrant(entrant: IEntrant): Observable<any>{
    return this.httpClient.post('/api/add-entrant', {entrant});
  }
}
