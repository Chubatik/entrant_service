import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {HttpService} from '../../services/http/http.service';
import {ToastrService} from 'ngx-toastr';
import * as expMethods from '../../shared/methods/methods';
import {StatisticService} from '../../services/statistic/statistic.service';
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
  privileges = [];
  specialties = [];
  years = [];
  entrants;
  chartData = [];
  tooltipData = [];
  constructor(private httpService: HttpService,
              private toastrService: ToastrService,
              private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.getPrivAndSpec();
    this.setChartOptions();
    this.getStatistic();
  }
  getStatistic(): void {
    this.httpService.getStatisticData().subscribe(
      (data) => {
        this.entrants = data.data;
        this.chartData = this.statisticService.setBarChartData(this.entrants, this.years, this.barChartLabels);
        this.barChartData = this.chartData[0];
        this.tooltipData = this.chartData[1];
      }, error => {
        this.toastrService.error('Помилка при завантаженні статистичних даних', this.title);
      });
  }

  setChartOptions(): void {
    this.barChartOptions = {
      legend: {
        display: true
      },
      scaleShowVerticalLines: true,
      responsive: true,
      tooltips: {
        mode: 'x',
        intersect: false,
        callbacks: {
          footer: (tooltipItems, data) => {
           return `З пільгами: ${this.tooltipData[tooltipItems[0].datasetIndex][tooltipItems[0].index]}`;
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
        this.specialties = data.data.specialties;
        this.years = expMethods.getYearsArr(data.data.years);
        this.barChartLabels = expMethods.getSpecsArr(this.specialties);
      }, error => {
        this.toastrService.error('Помилка при завантаженні спеціальностей та пільг', this.title);
      });
  }
}
