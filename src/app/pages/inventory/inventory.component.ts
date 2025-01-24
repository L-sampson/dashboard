import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../components/table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { TabLink } from '../../interfaces/utils';
import { Laptop, Desktop, Misc } from '../../interfaces/models';
import { InventoryService } from '../../services/inventory.service';
import { FileUploadDialogComponent } from '../../components/file-upload-dialog/file-upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FileExportDialogComponent } from '../../components/file-export-dialog/file-export-dialog.component'; 



@Component({
  selector: 'app-inventory',
  imports: [MatButtonModule, MatIconModule, TableComponent, MatCardModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  laptops: Laptop[] = [];
  desktops: Desktop[] = [];
  miscItems: Misc[] = [];

  laptopDataSource = new MatTableDataSource<Laptop>();
  desktopDataSource = new MatTableDataSource<Desktop>();
  miscDataSource = new MatTableDataSource<Misc>();

  constructor(private inventoryService: InventoryService) { }
  readonly dialog = inject(MatDialog)

  ngOnInit(): void {
    this.fetchDesktops();
    this.fetchLaptops();
    this.fetchMiscItems();
  }

  laptopsColumns: string[] = ['brand', 'model', 'serial', 'asset_tag', 'status', 'processor'];
  desktopsColumns: string[] = ['brand', 'model', 'serial', 'asset_tag', 'status', 'processor', 'hard_drive'];
  miscItemColumns: string[] = ['item', 'brand', 'quantity'];

  links: TabLink[] = [
    { name: 'Laptops', displayedColumns: this.laptopsColumns, dataSource: this.laptopDataSource },
    { name: 'Desktops', displayedColumns: this.desktopsColumns, dataSource: this.desktopDataSource },
    { name: 'Misc Item', displayedColumns: this.miscItemColumns, dataSource: this.miscDataSource }
  ]

  fetchLaptops() {
    console.log('fetch')
    this.inventoryService.getLaptops().subscribe((data: Laptop[]) => {
      this.laptops = data;
      this.laptopDataSource.data = data;
    });
  }

  fetchDesktops() {
    this.inventoryService.getDesktops().subscribe((data: Desktop[]) => {
      this.desktops = data;
      this.desktopDataSource.data = data;
    });
  }

  fetchMiscItems(): void { 
    this.inventoryService.getMiscItems().subscribe((data: Misc[]) => { this.miscItems = data; this.miscDataSource.data = data; }); 
  }

  openFileImportDialog() {
    this.dialog.open(FileUploadDialogComponent, {
      width: '500px',
      maxHeight: '1000px'
    })
  }

  openFileExportDialog() {
    this.dialog.open(FileExportDialogComponent, {
      width: '500px',
      height: '500px'
    })
  }
}
