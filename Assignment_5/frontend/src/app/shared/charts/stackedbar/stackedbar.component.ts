import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subscription, tap, withLatestFrom } from 'rxjs';
import { map, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { DashboardService } from 'src/app/features/dashboard/dashboard.service';
declare type OptionDataValue = string | number | Date;

@Component({
  selector: 'app-stackedbar',
  templateUrl: './stackedbar.component.html',
  styleUrls: ['./stackedbar.component.scss']
})
@UntilDestroy()
export class StackedbarComponent implements OnInit {
  @Input() chartUrl = '';
  @Input() chartData: any;
  _chartOption: EChartsOption = {};
  private showLegend: boolean = true;
  x: OptionDataValue[];
  y: OptionDataValue[];

  constructor(private _httpClient: HttpClient, private dashser: DashboardService) { }

  ngOnInit() {
    console.log('Hi', this.chartData)
    this.loadChart(this.chartData['x'], this.chartData['y1'], this.chartData['y2'], this.chartData['y3'])

  }

  private loadChart(x: any, y1: any, y2: any, y3: any): void {
    this._chartOption = {
      xAxis: {
        data: x,
        axisLabel: {
          show: true, rotate: 30

        }
      },
      yAxis: {
      },
      series: [
        {
          data: y1,
          type: 'bar',
          stack: 'x'
        },
        {
          data: y2,
          type: 'bar',
          stack: 'x'
        },
        {
          data: y3,
          type: 'bar',
          stack: 'x'
        }
      ],
    };
  }
}
