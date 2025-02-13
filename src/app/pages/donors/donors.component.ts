import { CommonModule } from '@angular/common';
import { Component, inject, } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TopWidgets } from '../../interfaces/widgets';
import { TabLink } from '../../interfaces/utils';
import { MatTableDataSource } from '@angular/material/table';
import { Contacts, Donations, Organizations } from '../../interfaces/models';
import { TableComponent } from '../../components/table/table.component';
import { DonorsService } from '../../services/donors.service';
import { WidgetsComponent } from '../../components/widgets/widgets.component';
import { FileUploadDialogComponent } from '../../components/file-upload-dialog/file-upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  contacts: Contacts[] = [];
  donations: Donations[] = [];
  organizations: Organizations[] = [];
  isLoading: boolean = true;

  constructor(private donorService: DonorsService) {}
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadDonorsData();
  }

  tableTitle = "Donors";
  donorsDataSource = new MatTableDataSource<Contacts>();
  donationsDataSource = new MatTableDataSource<Donations>();
  orgDataSource = new MatTableDataSource<Organizations>();

  topWidgets: TopWidgets[] = [
    {header: 'Donor Partners', icon: 'handshake', stats: this.orgCount, title: 'Companies'},
    {header: 'Contacts', icon: 'groups', stats: this.contactCount, title: 'Contacts'},
    {header: 'Donations', icon: 'pallet', stats: this.donationCount, title: 'Donations Recieved'},
    {header: 'CODD Letters', icon: 'mail', stats: 3, title: 'Letters Sent'}
  ]

  donorsColumns : string[] = ['full_name', 'role', 'organization_name', 'org_abbreviation', 'phone_number', 'email'];
  dontaionColumns : string [] = ['organization_name', 'org_abbreviation', 'most_recent_donation_date', 'total_donations'];
  organizationColumns: string [] = ['organization_name', 'org_abbreviation'];

  links: TabLink[] = [
    {name: 'Donations', displayedColumns: this.dontaionColumns, dataSource: this.donationsDataSource},
    {name: 'Contacts', displayedColumns: this.donorsColumns, dataSource: this.donorsDataSource},
    {name: 'Organizations', displayedColumns: this.organizationColumns, dataSource: this.orgDataSource}
  ]

  loadDonorsData(): void {
    this.donorService.getDonorSummaryData().subscribe((data:any) => {
      this.updateTableData(data);
      this.updateWidgetData(data);
    })
    this.isLoading = false;
  }

  updateWidgetData(data: any): void {
      this.orgCount = data.counts.orgs;
      this.contactCount = data.counts.contacts;
      this.donationCount = data.counts.donations;

       this.topWidgets[0].stats = this.orgCount;
       this.topWidgets[1].stats = this.contactCount;
       this.topWidgets[2].stats = this.donationCount;
  }

  updateTableData(data: any): void {
    this.contacts = data.org_details.contacts;
      this.donorsDataSource.data = this.contacts;

      this.donations = data.org_details.donations;
      this.donationsDataSource.data = this.donations;

      this.organizations = data.org_details.organizations;
      this.orgDataSource.data = this.organizations;
  }

  openFileImportDialog() {
      this.dialog.open(FileUploadDialogComponent, {
        width: '500px',
        maxHeight: '1000px',
        data: {title: this.tableTitle}
      })
    }
}
