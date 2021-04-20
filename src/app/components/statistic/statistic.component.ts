import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {HttpService} from '../../services/http.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [65, 59], label: 'Series A' },
    { data: [28, 48], label: 'Series B' }
  ];
  title = 'Статистика';
  constructor(private httpService: HttpService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getPrivAndSpec();
  }
  getPrivAndSpec(): void {
    this.httpService.getPrivAndSpec().subscribe(
      data => {
        this.barChartLabels = this.getYears(data.data.years);
      }, error => {
        this.toastrService.error('Помилка при завантаженні дат вступу', this.title);
      });
  }
  getYears(years): any[] {
    const ys = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < years.length; i++) {
      const y = years[i].years;
      ys.push(y);
    }
    return ys;
  }
}
