import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-pie-graph',
  imports: [BaseChartDirective],
  templateUrl: './pie-graph.component.html',
  styleUrl: './pie-graph.component.scss'
})
export class PieGraphComponent {
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() title: string = '';
  @Input() legendPosition: string | null = 'right';
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: this.legendPosition as 'top' | 'left' | 'bottom' | 'right',
      }
    },
    responsive: true
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.labels,
    datasets: [
      {
        data: this.data,
      }
    ]
  };
  public pieChartType: ChartType = 'pie';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['labels'] || changes['data']) {
      this.pieChartData = {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
          }
        ]
      };
    }
    if (changes['legendPosition'] && this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position = this.legendPosition as 'top' | 'left' | 'bottom' | 'right';
    }
  }
}
