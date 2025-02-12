import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../components/table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { TabLink } from '../../interfaces/utils';
import { Workshop, Participants } from '../../interfaces/models';
import { WorkshopService } from '../../services/workshop.service';
import { TopWidgets } from '../../interfaces/widgets';
import { LineGraphComponent } from "../../charts/line-graph/line-graph.component";
import { PieGraphComponent } from '../../charts/pie-graph/pie-graph.component';
import { WidgetsComponent } from '../../components/widgets/widgets.component';
import { MatCardModule } from '@angular/material/card';


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
  imports: [CommonModule, MatIconModule, TableComponent, LineGraphComponent, PieGraphComponent, WidgetsComponent, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})


export class DashboardComponent implements OnInit {
  workshops: Workshop[] = [];
  participants: Participants[] = [];
  labels: string[] = ['Families Served', 'Learners Engaged', 'Devices Distributed', 'Learning Hours']
  data: number[] = [325, 400, 300, 54];
  legendPosition = 'bottom';

  workshopDataSource = new MatTableDataSource<Workshop>();
  participantDataSource = new MatTableDataSource<Participants>();
  tableTitle = "Workshops"

  constructor(private workshopService: WorkshopService) { }

  ngOnInit(): void {
    this.fetchWorkshops();
    this.fetchParticipants();
  }

  topWidgets: TopWidgets[] = [
    { header: 'Items Received', icon: 'shelves', stats: 4000, title: 'Items Received' },
    { header: 'Workshops', icon: 'cast_for_education', stats: 20, title: 'Workshops' },
    { header: 'Activated Laptops', icon: 'devices', stats: 40, title: 'Activated Laptops' },
    { header: 'Items Recycled', icon: 'recycling', stats: 5000, title: 'Items Recycled' }
  ];

  workshopColumns: string[] = ['date', 'name', 'location', 'type', 'devices'];
  participantColumns: string[] = ['name', 'age', 'workshop'];

  links: TabLink[] = [
    {
      name: 'Workshops',
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
    this.workshopService.getWorkshops().subscribe((data: Workshop[]) => {
      this.workshops = data;
      this.workshopDataSource.data = data;
    });
  }

  fetchParticipants() {
    this.workshopService.getParticipants().subscribe((data: Participants[]) => {
      this.participants = data;
      this.participantDataSource.data = data;
    })
  }

  impactWidget: ImpactWidget[] = [
    { header: 'Key Metrics', icon: 'insights', workshops: 100, participants: 500, devices: 500, hours: 3000 }
  ]

}
