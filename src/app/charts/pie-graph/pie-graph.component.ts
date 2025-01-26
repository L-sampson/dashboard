import { Component } from '@angular/core';
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
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'left',
      }
    }
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Families Served', 'Learners Engaged', 'Devices Distributed', 'Learning Hours'],
    datasets: [
      {
        data: [325, 400, 300, 54],
      }
    ]
  };
  public pieChartType: ChartType = 'pie';
}
