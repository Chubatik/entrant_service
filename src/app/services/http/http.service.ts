import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IEntrant} from '../../interfaces/entrant/entrant';
import {IEntrantFilter} from '../../interfaces/filter/entrant-filter';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) {
  }
  public getEntrants(page: number, filter?: IEntrantFilter): Observable<any>{
    const f = filter === undefined ? '{}' : JSON.stringify(filter);
    return this.httpClient.get(`/api/view-list?page=${page}&filter=${f}`);
  }
  public getPrivAndSpec(): Observable<any>{
    return this.httpClient.get('/api/add-form');
  }
  public addEntrant(entrant: IEntrant): Observable<any>{
    return this.httpClient.post('/api/add-entrant', {entrant});
  }
  public getEntrantInfo(entrantId: number): Observable<any>{
    return this.httpClient.get(`/api/get-entrant?entrantId=${entrantId}`);
  }
  public getStatisticData(): Observable<any>{
    return this.httpClient.get(`/api/statistic`);
  }
  public getAccess(pass: string): Observable<any>{
    return this.httpClient.get(`/api/access?pass=${pass}`);
  }
}
