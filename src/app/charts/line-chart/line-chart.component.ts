import { Component, OnInit } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-line-chart',
  standalone: true,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  ngOnInit(): void {
    this.loadChart();
  }

  loadChart() {
    console.log(google);
    google.charts.load('current', { packages: ['line'] });
    google.charts.setOnLoadCallback(() => {
      this.drawChart();
    });
  }

  drawChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Month');
    data.addColumn('number', 'Inventory');
    data.addColumn('number', 'Imagined');
    data.addColumn('number', 'Activated');
    data.addColumn('number', 'Distributed');

    data.addRows([
      ['Jan', 37.8, 80.8, 41.8, 50],
      ['Feb', 30.9, 69.5, 32.4, 14],
      ['March', 25.4, 57, 25.7, 12],
      ['April', 25.4, 57, 25.7, 12],
      ['May', 25.4, 57, 25.7, 12],
      ['June', 25.4, 57, 25.7, 12],
      ['July', 25.4, 57, 25.7, 12],
      ['Aug', 25.4, 57, 25.7, 12],
      ['Sept', 25.4, 57, 25.7, 12],
      ['Oct', 25.4, 57, 25.7, 12],
      ['Nov', 25.4, 57, 25.7, 12],
      ['Dec', 25.4, 57, 25.7, 12],
    ]);

    const options = {
      chart: {
        title: 'Laptop Inventory By Month',
        subtitle: 'per unit',
      },
      width: 875,
      height: 400,
      chartArea: {
        width: '100%',  // Increase chart width to make room for labels
        height: '100%',  // Increase chart height for clarity
        backgroundColor: '#f9f9f9',  // Set a light background color
      },
      legend: {
        position: 'top',  // Place the legend at the top
        alignment: 'center',  // Center the legend
        textStyle: {
          fontSize: 14,
          color: '#333',
        },
      }
    };

    const chart = new google.charts.Line(document.getElementById('linechart_material'));

    chart.draw(data, google.charts.Line.convertOptions(options));
  }
}
