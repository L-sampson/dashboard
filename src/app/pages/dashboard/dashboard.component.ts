import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LineChartComponent } from "../../charts/line-chart/line-chart.component";
import { TableComponent } from '../../components/table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { TabLink } from '../../interfaces/tab-link';
import { Workshop, Participants } from '../../interfaces/models';
import { WorkshopService } from '../../services/workshop.service';

export type TopWidgets = {
  header: string,
  icon: string,
  stats: number
}


export interface ImpactWidget {
  header: string,
  icon: string,
  workshops: number,
  participants: number,
  devices: number,
  hours: number
}


@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, CommonModule, MatIconModule, LineChartComponent, TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})


export class DashboardComponent implements OnInit {
  workshops: Workshop[] = [];
  participants: Participants[] = [];

  workshopDataSource = new MatTableDataSource<Workshop>();
  participantDataSource = new MatTableDataSource<Participants>();

  constructor(private workshopService: WorkshopService) {}

  ngOnInit(): void {
    this.fetchWorkshops();
    this.fetchParticipants();
  }

  topWidgets = [
    { header: 'Items Received', icon: 'shelves', stats: 4000, color: '#9C27B0' },
    { header: 'Workshops', icon: 'cast_for_education', stats: 20, color: '#FF9800' },
    { header: 'Activated Laptops', icon: 'devices', stats: 40, color: '#2196F3' },
    { header: 'Items Recycled', icon: 'recycling', stats: 5000, color: '#4CAF50' }
  ];

  workshopColumns: string[] = ['date', 'name', 'location', 'type', 'devices'];
  participantColumns: string[] = ['name', 'age', 'workshop'];

  links: TabLink[] = [
    { 
      name: 'Upcoming Workshops',
      displayedColumns: this.workshopColumns, 
      dataSource: this.workshopDataSource 
    },
    { 
      name: 'Participants', 
      displayedColumns: this.participantColumns, 
      dataSource: this.participantDataSource 
    }
  ]

  fetchWorkshops() {
    this.workshopService.getWorkshops().subscribe((data:Workshop[]) => {
      this.workshops = data;
      this.workshopDataSource.data = data;
    });
  }

  fetchParticipants() {
    this.workshopService.getParticipants().subscribe((data:Participants[]) => {
      this.participants = data;
      this.participantDataSource.data = data;
    })
  }

  impactWidget: ImpactWidget[] = [
    { header: 'Key Metrics', icon: 'insights', workshops: 100, participants: 500, devices: 500, hours: 3000 }
  ]

}
