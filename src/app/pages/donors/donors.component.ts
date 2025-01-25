import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TopWidgets } from '../../interfaces/widgets';
import { TabLink } from '../../interfaces/utils';
import { MatTableDataSource } from '@angular/material/table';
import { Donors, Donations } from '../../interfaces/models';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-donors',
  imports: [MatButtonModule, MatIconModule, MatCardModule, CommonModule, TableComponent],
  templateUrl: './donors.component.html',
  styleUrl: './donors.component.scss'
})
export class DonorsComponent {

  tableTitle = "Donors";
  donorsDataSource = new MatTableDataSource<Donors>();
  donationsDataSource = new MatTableDataSource<Donations>();

  topWidgets: TopWidgets[] = [
    {header: 'Donor Partners', icon: 'handshake', stats: 61, title: 'Companies'},
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
}
