import { Component, OnInit, Input } from '@angular/core';
import { dataTool, EChartsOption } from 'echarts';
import { DashboardService } from 'src/app/features/dashboard/dashboard.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input() chartUrl = '';
  @Input() chartData :any;
  _chartOption: EChartsOption = {};

  constructor(private dashser:DashboardService) {}

  ngOnInit() {
    this.loadChart(this.chartData['x'])
  }

  private loadChart(data:any): void {

    this._chartOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },

      xAxis: {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Analysis',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          data:data
        },
      ],

      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
    };
  }
}
