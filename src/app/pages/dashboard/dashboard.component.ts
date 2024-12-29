import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LineChartComponent } from "../../charts/line-chart/line-chart.component";
import { TableComponent } from '../../components/table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { TabLink } from '../../interfaces/tab-link';

export type TopWidgets = {
  header: string,
  icon: string,
  stats: number
}

export interface Workshop {
  date: string,
  name: string,
  location: string,
  type: string,
  devices: number
}

const WORKSHOP_DATA: Workshop[] = [
  { date: 'January 18, 2025', name: 'Savannah Church', location: 'Savannah, GA', type: 'ADL', devices: 26 },
  { date: 'February 5, 2025', name: 'Atlanta Community Center', location: 'Atlanta, GA', type: 'STEM', devices: 15 },
  { date: 'March 10, 2025', name: 'Macon High School', location: 'Macon, GA', type: 'Coding', devices: 30 },
  { date: 'April 12, 2025', name: 'Augusta Library', location: 'Augusta, GA', type: 'Robotics', devices: 20 },
  { date: 'May 22, 2025', name: 'Columbus Tech', location: 'Columbus, GA', type: 'ADL', devices: 18 },
  { date: 'June 15, 2025', name: 'Athens University', location: 'Athens, GA', type: 'STEM', devices: 25 },
  { date: 'July 8, 2025', name: 'Valdosta State College', location: 'Valdosta, GA', type: 'Coding', devices: 22 },
  { date: 'August 18, 2025', name: 'Albany Middle School', location: 'Albany, GA', type: 'Robotics', devices: 27 },
  { date: 'September 21, 2025', name: 'Warner Robins Center', location: 'Warner Robins, GA', type: 'ADL', devices: 19 },
  { date: 'October 30, 2025', name: 'Dublin Public Library', location: 'Dublin, GA', type: 'STEM', devices: 23 },
  { date: 'November 12, 2025', name: 'Thomasville Community Hall', location: 'Thomasville, GA', type: 'Coding', devices: 17 }
];

export interface ImpactWidget {
  header: string,
  icon: string,
  workshops: number,
  participants: number,
  devices: number,
  hours: number
}

const PARTICIPANTS_DATA = [
  { name: 'John Doe', age: 25, workshop: 'Savannah Church', role: 'Participant' }, { name: 'Jane Smith', age: 28, workshop: 'Atlanta Community Center', role: 'Participant' }
];

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, CommonModule, MatIconModule, LineChartComponent, TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  topWidgets = [
    { header: 'Items Received', icon: 'shelves', stats: 4000, color: '#9C27B0' },
    { header: 'Workshops', icon: 'cast_for_education', stats: 20, color: '#FF9800' },
    { header: 'Activated Laptops', icon: 'devices', stats: 40, color: '#2196F3' },
    { header: 'Items Recycled', icon: 'recycling', stats: 5000, color: '#4CAF50' }
  ];

  workshopColumns: string[] = ['date', 'name', 'location', 'type', 'devices'];
  workshopDataSource = new MatTableDataSource(WORKSHOP_DATA);

  participantColumns: string[] = ['name', 'age', 'workshop', 'role'];
  participantDataSource = new MatTableDataSource(PARTICIPANTS_DATA);

  links: TabLink[] = [
    { name: 'Upcoming Workshops', displayedColumns: this.workshopColumns, dataSource: this.workshopDataSource, filterPlaceHolder: 'Workshops', buttonPlaceHolder: 'Workshop' },
    { name: 'Participants', displayedColumns: this.participantColumns, dataSource: this.participantDataSource, filterPlaceHolder: 'Participants', buttonPlaceHolder: 'Partiticpants' }
  ]

  impactWidget: ImpactWidget[] = [
    { header: 'Key Metrics', icon: 'insights', workshops: 100, participants: 500, devices: 500, hours: 3000 }
  ]

}
