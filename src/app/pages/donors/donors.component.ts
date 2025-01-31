import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TopWidgets } from '../../interfaces/widgets';
import { TabLink } from '../../interfaces/utils';
import { MatTableDataSource } from '@angular/material/table';
import { Donors, Organizations } from '../../interfaces/models';
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
  donationCount: number | null = null;
  contacts: Donors[] = [];
  organizations: Organizations[] = [];
  isLoading: boolean = true;

  constructor(private donorService: DonorsService) {}

  ngOnInit(): void {
    this.loadWidgetData();
    this.loadTableData();
  }

  tableTitle = "Donors";
  donorsDataSource = new MatTableDataSource<Donors>();
  organizationsDataSource = new MatTableDataSource<Organizations>();

  topWidgets: TopWidgets[] = [
    {header: 'Donor Partners', icon: 'handshake', stats: this.orgCount, title: 'Companies'},
    {header: 'Contacts', icon: 'groups', stats: this.contactCount, title: 'Contacts'},
    {header: 'Donations', icon: 'pallet', stats: this.donationCount, title: 'Donations Recieved'},
    {header: 'CODD Letters', icon: 'mail', stats: 3, title: 'Letters Sent'}
  ]

  donorsColumns : string[] = ['full_name', 'role', 'organization_name', 'org_abbreviation', 'phone_number', 'email'];
  dontaionColumns : string [] = ['organization_name', 'org_abbreviation', 'most_recent_donation_date', 'total_donations'];

  links: TabLink[] = [
    {name: 'Organizations', displayedColumns: this.dontaionColumns, dataSource: this.organizationsDataSource},
    {name: 'Contacts', displayedColumns: this.donorsColumns, dataSource: this.donorsDataSource}
  ]

  loadWidgetData(): void {
    forkJoin({
      orgs: this.donorService.getOrganizationsCount(),
      contact_number: this.donorService.getContactsCount(),
      donations: this.donorService.getDonationsCount()
    }).subscribe(({orgs, contact_number, donations}) => {
      this.orgCount = orgs.organizations_count;
      this.contactCount = contact_number.contacts_count;
      this.donationCount = donations.donations_count;

       this.topWidgets[0].stats = this.orgCount;
       this.topWidgets[1].stats = this.contactCount;
       this.topWidgets[2].stats = this.donationCount;
      this.isLoading = false;
    });
  }

  loadTableData(): void {
   forkJoin({
      contacts: this.donorService.fetchContacts(),
      organizations: this.donorService.fetchOrganizations()
   }).subscribe(({contacts, organizations}) => {
      this.contacts = contacts;
      this.organizations = organizations;
      console.log(this.organizations)
      this.donorsDataSource.data = this.contacts;
      this.organizationsDataSource.data = this.organizations;
   });
  }
}
