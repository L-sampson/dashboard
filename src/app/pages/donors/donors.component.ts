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
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-donors',
  imports: [MatButtonModule, MatIconModule, CommonModule, TableComponent, WidgetsComponent],
  templateUrl: './donors.component.html',
  styleUrl: './donors.component.scss'
})
export class DonorsComponent {
  orgCount: number | null = null;
  contactCount: number | null = null;
  contacts: Donors[] = [];
  isLoading: boolean = true;

  constructor(private donorService: DonorsService) {}

  ngOnInit(): void {
    this.loadWidgetData();
    this.loadTableData();
  }

  tableTitle = "Donors";
  donorsDataSource = new MatTableDataSource<Donors>();
  donationsDataSource = new MatTableDataSource<Donations>();

  topWidgets: TopWidgets[] = [
    {header: 'Donor Partners', icon: 'handshake', stats: this.orgCount, title: 'Companies'},
    {header: 'Contacts', icon: 'groups', stats: this.contactCount, title: 'Contacts'},
    {header: 'Donations', icon: 'pallet', stats: 2, title: 'Donations Recieved'},
    {header: 'CODD Letters', icon: 'mail', stats: 3, title: 'Letters Sent'}
  ]

  donorsColumns : string[] = ['full_name', 'role', 'organization_name', 'org_abbreviation', 'phone_number', 'email'];
  dontaionColumns : string [] = ['company', 'recent donation date', 'total donations'];

  links: TabLink[] = [
    {name: 'Donors', displayedColumns: this.donorsColumns, dataSource: this.donorsDataSource},
    {name: 'Donations', displayedColumns: this.dontaionColumns, dataSource: this.donationsDataSource}
  ]

  loadWidgetData(): void {
    forkJoin({
      orgs: this.donorService.getOrganizationsCount(),
      contacts: this.donorService.getContactsCount()
    }).subscribe(({orgs, contacts}) => {
      this.orgCount = orgs.organizations_count;
      this.contactCount = contacts.contacts_count;
       this.topWidgets[0].stats = this.orgCount;
       this.topWidgets[1].stats = this.contactCount;

    });
  }

  loadTableData(): void {
    this.donorService.fetchContacts().subscribe((data) => {
      this.contacts = data;
      this.donorsDataSource.data = this.contacts
      console.log(data);
      this.isLoading = false;
    })
  }
}
