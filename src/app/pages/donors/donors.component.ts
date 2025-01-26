import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TopWidgets } from '../../interfaces/widgets';
import { TabLink } from '../../interfaces/utils';
import { MatTableDataSource } from '@angular/material/table';
import { Donors, Donations } from '../../interfaces/models';
import { TableComponent } from '../../components/table/table.component';
import { DonorsService } from '../../services/donors.service';
import { WidgetsComponent } from '../../components/widgets/widgets.component';

@Component({
  selector: 'app-donors',
  imports: [MatButtonModule, MatIconModule, CommonModule, TableComponent, WidgetsComponent],
  templateUrl: './donors.component.html',
  styleUrl: './donors.component.scss'
})
export class DonorsComponent {
  orgCount: number | null = null;

  constructor(private donorService: DonorsService) {}

  ngOnInit(): void {
    this.loadOrganizationsCount();
  }

  tableTitle = "Donors";
  donorsDataSource = new MatTableDataSource<Donors>();
  donationsDataSource = new MatTableDataSource<Donations>();

  topWidgets: TopWidgets[] = [
    {header: 'Donor Partners', icon: 'handshake', stats: this.orgCount, title: 'Companies'},
    {header: 'Contacts', icon: 'groups', stats: 39, title: 'Contacts'},
    {header: 'Donations', icon: 'pallet', stats: 2, title: 'Donations Recieved'},
    {header: 'CODD Letters', icon: 'mail', stats: 3, title: 'Letters Sent'}
  ]

  donorsColumns : string[] = ['name', 'role', 'organization', 'org abreviation', 'phone number', 'email'];
  dontaionColumns : string [] = ['company', 'recent donation date', 'total donations'];

  links: TabLink[] = [
    {name: 'Donors', displayedColumns: this.donorsColumns, dataSource: this.donorsDataSource},
    {name: 'Donations', displayedColumns: this.dontaionColumns, dataSource: this.donationsDataSource}
  ]

  loadOrganizationsCount(): void {
    this.donorService.getOrganizationsCount().subscribe({
      next: (data) => {
        this.orgCount = data.organizations_count;
        console.log(this.orgCount);

        const donorWidget = this.topWidgets.find(widget => widget.header === 'Donor Partners');
        if (donorWidget) {
          donorWidget.stats = this.orgCount;
        }
      },
      error: (error) => {
        console.error('Failed to fecth organizations count', error)
      }
    })
  }
}
