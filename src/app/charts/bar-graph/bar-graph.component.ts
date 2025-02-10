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
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
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
