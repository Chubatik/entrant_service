import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  barChartData: any[] = [];
  constructor() { }
  public createData(data): any[] {

    return this.barChartData;
  }

}
