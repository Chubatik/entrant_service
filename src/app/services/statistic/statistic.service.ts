import { Injectable } from '@angular/core';
import {sortObj} from '../../shared/methods/methods';

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
    return res;
  }
  public setBarChartData(data, years, specs): any[] {
    let res = this.createData(data, years);
    const tooltipData = [];
    const barChartData = [];
    years.forEach(year => {
        this.checkZeros(res[year][0], specs);
        this.checkZeros(res[year][1], specs);
        tooltipData.push(Object.values(sortObj(res[year][1])));
        barChartData.push({data: Object.values(sortObj(res[year][0])), label: year});
    });
    return [barChartData, tooltipData];
  }

  public checkZeros(resByYear, specs): void {
    specs.forEach(s => {
      if (!resByYear.hasOwnProperty(s)) {
        resByYear[s] = 0;
      }
    });
  }
  public formObj(years): object {
    let res = {};
    for (let i = 0; i < years.length; i++) {
      res[`${years[i]}`] = [{}, {}];
    }
    return res;
  }
}
