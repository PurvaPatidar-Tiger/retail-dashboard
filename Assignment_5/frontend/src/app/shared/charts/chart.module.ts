import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { AreaChartAnimatedComponent } from './area-chart-animated/area-chart-animated.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { StackedbarComponent } from './stackedbar/stackedbar.component';
import { ScatterComponent } from './scatter/scatter.component';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [ChartComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ChartComponent,
    PieChartComponent,
    BarChartComponent,
    AreaChartComponent,
    AreaChartAnimatedComponent,
    StackedbarComponent,
    ScatterComponent,
  ],
})
export class ChartModule {
  constructor() {
    //translate.use(window.localStorage.getItem('prefLanguage') || 'en')
  }
}
