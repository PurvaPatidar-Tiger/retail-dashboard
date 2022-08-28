import { Component, OnInit, Input } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss'],
})
export class AreaChartComponent implements OnInit {
  @Input() chartUrl = '';
  @Input() chartData :any;
  private myChart: any = null;
  private showLegend: boolean = true;
  _chartOption: EChartsOption = {};

  constructor() {}

  ngOnInit() {
    let data = [820, 932, 901, 934, 1290, 1330, 1320];
    if (this.chartUrl === 'first') {
      data = [820, 932, 901, 934, 990, 930, 920];
      this.showLegend = false;
    }
    if (this.chartUrl === 'second') {
      data = [20, 32, 41, 34, 50, 30, 20];
      this.showLegend = false;
    }
    if (this.chartUrl === 'third') {
      data = [1820, 1932, 1901, 1934, 1990, 1930, 1920];
      this.showLegend = false;
    }
    console.log(this.chartUrl, this.showLegend);
    this.loadChart(data);
  }

  private loadChart(data: any): void {
    this._chartOption = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        //show: this.showLegend
      },
      yAxis: {
        type: 'value',
        //show: this.showLegend
      },
      series: [
        {
          data: [820, 932, 901, 934, 990, 930, 920],
          type: 'line',
          areaStyle: {},
          smooth: true,
        },
      ],
    };
  }
}
