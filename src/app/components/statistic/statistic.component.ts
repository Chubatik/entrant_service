import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {HttpService} from '../../services/http/http.service';
import {ToastrService} from 'ngx-toastr';
import * as expMethods from '../../shared/methods/methods';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  public barChartOptions = {};
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [
    { data: [65, 59], label: 'Series A' },
    { data: [28, 48], label: 'Series B' }
  ];
  title = 'Статистика';
  hostelOptions = [{isHostel: true , name: 'Так'}, {isHostel: false , name: 'Ні'}];
  specialtyId: number[];
  privilegeId: number[];
  isHostel: boolean;
  year: number[];
  privileges = [];
  specialties = [];
  years = [];
  constructor(private httpService: HttpService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getPrivAndSpec();
    this.setChartOptions();
    this.getStatistic();
  }
  getStatistic(): void {
    this.httpService.getStatisticData().subscribe(
      (data) => {

      }, error => {
        this.toastrService.error('Помилка при завантаженні статистичних даних', this.title);
      });
  }
  setChartOptions(): void {
    this.barChartOptions = {
      legend: {
        display: false
      },
      scaleShowVerticalLines: true,
      responsive: true,
      tooltips: {
        mode: 'x',
        intersect: true,
        callbacks: {
          footer: (tooltipItems, data) => {
          },
        },
      },
      scales: {
        xAxes: [{
          stacked: false,
          ticks: {
            beginAtZero: true
          },
        }],
        yAxes: [{
          stacked: false,
          ticks: {
            beginAtZero: true,
          }
        }]
      }
    };
  }
  getPrivAndSpec(): void {
    this.httpService.getPrivAndSpec().subscribe(
      data => {
        this.privileges = expMethods.addNonPrivilegeCase(data.data.privileges);
        this.specialties = data.data.specialties;
        this.years = expMethods.getYearsObj(data.data.years);
        const label = expMethods.getYearsArr(data.data.years);
        this.barChartLabels = [label[0]]; // [label[label.length - 1]];
      }, error => {
        this.toastrService.error('Помилка при завантаженні спеціальностей та пільг', this.title);
      });
  }
  setFilter(): void {
  }
}
