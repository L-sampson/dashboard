import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../components/table/table.component';
import { TopWidgets } from '../../interfaces/widgets';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { TabLink } from '../../interfaces/utils';
import { Laptop, Desktop, Misc } from '../../interfaces/models';
import { InventoryService } from '../../services/inventory.service';
import { WidgetsComponent } from '../../components/widgets/widgets.component';
import { FileUploadDialogComponent } from '../../components/file-upload-dialog/file-upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FileExportDialogComponent } from '../../components/file-export-dialog/file-export-dialog.component'; 
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-inventory',
  imports: [MatButtonModule, MatIconModule, TableComponent, MatCardModule, WidgetsComponent, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  laptops: Laptop[] = [];
  desktops: Desktop[] = [];
  miscItems: Misc[] = [];
  tableTitle = "Inventory";
  isLoading: boolean = true;

  laptopDataSource = new MatTableDataSource<Laptop>();
  desktopDataSource = new MatTableDataSource<Desktop>();
  miscDataSource = new MatTableDataSource<Misc>();

  topWidgets: TopWidgets[] = [
    {header: 'Total Inventory', icon: 'local_shipping', stats: 336, title: 'Items on hand'},
    {header: 'Total Laptops', icon: 'laptop', stats: 180, title: 'Laptops'},
    {header: 'Total Desktops', icon: 'desktop_windows', stats: 127, title: 'Desktops'},
  ]

  constructor(private inventoryService: InventoryService) { }
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.isLoading = true;
    this.loadData();
  }

  laptopsColumns: string[] = ['brand', 'model', 'serial', 'asset_tag', 'status', 'processor'];
  desktopsColumns: string[] = ['brand', 'model', 'serial', 'asset_tag', 'status', 'processor', 'hard_drive'];
  miscItemColumns: string[] = ['item', 'brand', 'quantity'];

  links: TabLink[] = [
    { name: 'Laptops', displayedColumns: this.laptopsColumns, dataSource: this.laptopDataSource },
    { name: 'Desktops', displayedColumns: this.desktopsColumns, dataSource: this.desktopDataSource },
    { name: 'Misc Item', displayedColumns: this.miscItemColumns, dataSource: this.miscDataSource }
  ]

  loadData(): void {
    forkJoin({
      laptops: this.inventoryService.getLaptops(),
      desktops: this.inventoryService.getDesktops(),
      miscItems: this.inventoryService.getMiscItems()
    }).subscribe(({ laptops, desktops, miscItems }) => {
      this.laptops = laptops;
      this.laptopDataSource.data = laptops;

      this.desktops = desktops;
      this.desktopDataSource.data = desktops;

      this.miscItems = miscItems;
      this.miscDataSource.data = miscItems;

      this.isLoading = false;
    })
  }

  openFileImportDialog() {
    this.dialog.open(FileUploadDialogComponent, {
      width: '500px',
      maxHeight: '1000px',
      data: {title: this.tableTitle}
    })
  }

  openFileExportDialog() {
    this.dialog.open(FileExportDialogComponent, {
      width: '500px',
      height: '500px'
    })
  }
}
