import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartConfiguration, ChartData } from 'chart.js';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-pie-graph',
  imports: [BaseChartDirective, MatCardModule],
  templateUrl: './pie-graph.component.html',
  styleUrl: './pie-graph.component.scss'
})
export class PieGraphComponent {
  @Input() pieChartLabels: string[] = [];
  @Input() pieData: number[] = [];
  @Input() title: string = '';
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
      }
    },
    responsive: true
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: this.pieData,
      }
    ]
  };
  public pieChartType: ChartType = 'pie';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pieChartLabels'] || changes['pieData']) {
      this.pieChartData = {
        labels: this.pieChartLabels,
        datasets: [
          {
            data: this.pieData,
          }
        ]
      };
    }
  }
}
