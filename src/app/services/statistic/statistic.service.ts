import { Injectable } from '@angular/core';
import {HttpService} from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor() { }
  public createData(data, years): object {
    const res = this.formObj(years);
    for (let i = 0; i < data.length; i++) {
      const year = data[i].year;
      const specName = data[i].specialty_name;
      const priv = data[i].privilege_name;
      if (res.hasOwnProperty(year)) {
         if (res[year][0].hasOwnProperty(specName)) {
            res[year][0][specName]++;
          } else {
            res[year][0][specName] = 1;
          }
         if (res[year][1].hasOwnProperty(specName) && priv !== null) {
           res[year][1][specName]++;
         } else {
           if (priv !== null) {
             res[year][1][specName] = 1;
           }
         }
      }
    }
    console.log(res);
    return res;
  }
  public setBarChartData(data, years, specs): any[] {
    let res = this.createData(data, years);
    const barChartData = [];
    years.forEach(year => {
        barChartData.push({data: Object.values(res[year][0]), label: year});
    });
    return barChartData;
  }

  public formObj(years): object {
    let res = {};
    for (let i = 0; i < years.length; i++) {
      res[`${years[i]}`] = [{}, {}];
    }
    return res;
  }
}
