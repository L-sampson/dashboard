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
import { CommonModule } from '@angular/common';
import { PieGraphComponent } from '../../charts/pie-graph/pie-graph.component';
import { BarGraphComponent } from "../../charts/bar-graph/bar-graph.component";


@Component({
  selector: 'app-inventory',
  imports: [MatButtonModule, MatIconModule, TableComponent, MatCardModule, WidgetsComponent, CommonModule, PieGraphComponent, BarGraphComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  laptops: Laptop[] = [];
  desktops: Desktop[] = [];
  miscItems: Misc[] = [];
  inventoryCount: number | null = null;
  laptopCount: number | null = null;
  desktopCount: number | null = null;
  legendPosition = 'bottom';

  laptopModels: Map<string, number> = new Map();
  laptopBrands: Map<string, number> = new Map();
  laptopProcessors: Map<string, number> = new Map();

  laptopLabels: string[] = [];
  laptopData: number[] = [];

  brandLabels: string[] = [];
  brandData: number[] = [];

  processorLabels: string[] = [];
  processorData: number[] = [];

  pieLaptopModelTitle: string = 'Laptops By Model';
  tableTitle = "Inventory";
  isLoading: boolean = true;

  laptopDataSource = new MatTableDataSource<Laptop>();
  desktopDataSource = new MatTableDataSource<Desktop>();
  miscDataSource = new MatTableDataSource<Misc>();

  topWidgets: TopWidgets[] = [
    { header: 'Total Inventory', icon: 'local_shipping', stats: this.inventoryCount, title: 'Items on hand' },
    { header: 'Total Laptops', icon: 'laptop', stats: this.laptopCount, title: 'Laptops' },
    { header: 'Total Desktops', icon: 'desktop_windows', stats: this.desktopCount, title: 'Desktops' },
  ]

  constructor(private inventoryService: InventoryService) { }
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.isLoading = true;
    this.loadData();
    this.loadWidgetData();
  }

  laptopsColumns: string[] = ['brand', 'model', 'serial', 'asset_tag', 'status', 'processor'];
  desktopsColumns: string[] = ['brand', 'model', 'serial', 'asset_tag', 'status', 'processor', 'hard_drive'];
  miscItemColumns: string[] = ['item', 'brand', 'quantity'];

  links: TabLink[] = [
    { name: 'Laptops', displayedColumns: this.laptopsColumns, dataSource: this.laptopDataSource },
    { name: 'Desktops', displayedColumns: this.desktopsColumns, dataSource: this.desktopDataSource },
    { name: 'Misc Item', displayedColumns: this.miscItemColumns, dataSource: this.miscDataSource }
  ]

  loadWidgetData(): void {
    this.inventoryService.getInventorySummaryData().subscribe((data) => {
      this.inventoryCount = data.inventory_count.total_count;
      this.laptopCount = data.inventory_count.computer_count.laptops;
      this.desktopCount = data.inventory_count.computer_count.desktops;

      data.laptops_summary.models.forEach((element: { model: string, count: number }) => {
        this.laptopModels.set(element.model, element.count);
      });
      this.laptopLabels = Array.from(this.laptopModels.keys());
      this.laptopData = Array.from(this.laptopModels.values());

      data.laptops_summary.brands.forEach((element: {brand: string, count: number}) => {
        this.laptopBrands.set(element.brand, element.count);
      })
      this.brandLabels = Array.from(this.laptopBrands.keys());
      this.brandData = Array.from(this.laptopBrands.values());

      data.laptops_summary.processors.forEach((element: {processor: string, count: number}) => {
        this.laptopProcessors.set(element.processor, element.count);
      })
      this.processorLabels = Array.from(this.laptopProcessors.keys());
      this.processorData = Array.from(this.laptopProcessors.values())

      this.topWidgets[0].stats = this.inventoryCount;
      this.topWidgets[1].stats = this.laptopCount;
      this.topWidgets[2].stats = this.desktopCount;
    })
  }

  loadData(): void {
    this.inventoryService.getInventorySummaryData().subscribe((data) => {
      this.desktops = data.inventory_data.desktops;
      this.desktopDataSource.data = this.desktops;

      this.laptops = data.inventory_data.laptops;
      this.laptopDataSource.data = this.laptops;
      
      this.miscItems = data.inventory_data.misc;
      this.miscDataSource.data = this.miscItems;

        this.isLoading = false;
    })
  }

  openFileImportDialog() {
    this.dialog.open(FileUploadDialogComponent, {
      width: '500px',
      maxHeight: '1000px',
      data: { title: this.tableTitle }
    })
  }

  openFileExportDialog() {
    this.dialog.open(FileExportDialogComponent, {
      width: '500px',
      height: '500px'
    })
  }
}
