import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartConfiguration, ChartData } from 'chart.js';


@Component({
  selector: 'app-bar-graph',
  imports: [BaseChartDirective],
  templateUrl: './bar-graph.component.html',
  styleUrl: './bar-graph.component.scss'
})
export class BarGraphComponent {
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() legendPosition: string | null = 'bottom';

  public barChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: this.legendPosition as 'top' | 'left' | 'bottom' | 'right',
      },
    },
    responsive: true
  };

  public barChartData: ChartData<'bar', number[], string | string[]> = {
    labels: this.labels,
    datasets: [
      {
        data: this.data,
      },
    ]
  };
  public barChartType: ChartType = 'bar';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['labels'] || changes['data']) {
      this.barChartData = {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            label: 'Laptop Brands',
        backgroundColor: [
          'rgba(99, 120, 255, 0.5)',
          'rgba(255, 160, 64, 0.5)',
          'rgba(255, 204, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(54, 163, 235, 0.5)',
        ],
          }
        ]
      };
    }
    if (changes['legendPosition'] && this.barChartOptions?.plugins?.legend) {
      this.barChartOptions.plugins.legend.position = this.legendPosition as 'top' | 'left' | 'bottom' | 'right';
    }
  }
}
