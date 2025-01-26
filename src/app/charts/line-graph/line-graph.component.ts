import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartConfiguration } from 'chart.js';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-line-graph',
  imports: [BaseChartDirective, MatCardModule],
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.scss'
})
export class LineGraphComponent {
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [155, 20, 30, 40],
        label: 'Laptop Inventory',
      },
      {
        data: [325, 131, 165, 75],
        label: 'Projected Participants',
      },
      {
        data: [17, 19, 19, 22],
        label: 'Projeted Workshops'
      }
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
  };

  public lineChartType: ChartType = 'line';

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public randomize(): void {
    this.lineChartData.datasets[0].data = Array(4)
      .fill(0)
      .map(() => Math.random() * 100);
    this.chart?.update(); // Refresh the chart
  }
}
