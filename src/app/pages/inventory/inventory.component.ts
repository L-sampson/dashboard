import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../components/table/table.component';
import { TopWidgets } from '../../interfaces/widgets';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { TabLink } from '../../interfaces/utils';
import { Laptop, Desktop, Misc, Organizations } from '../../interfaces/models';
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
  imports: [
    MatButtonModule, 
    MatIconModule, 
    TableComponent,
    MatCardModule,
    WidgetsComponent,
    CommonModule,
    PieGraphComponent,
    BarGraphComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  laptops: Laptop[] = [];
  desktops: Desktop[] = [];
  miscItems: Misc[] = [];
  orgs: Organizations[] = [];
  inventoryCount: number | null = null;
  laptopCount: number | null = null;
  desktopCount: number | null = null;
  legendPosition = 'bottom';

  laptopModels: Map<string, number> = new Map();
  laptopBrands: Map<string, number> = new Map();
  laptopProcessors: Map<string, number> = new Map();
  org_map: Map<string, string> = new Map();

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
    this.loadInventoryData();
  }

  laptopsColumns: string[] = ['brand', 'model', 'serial', 'asset_tag', 'status', 'processor'];
  desktopsColumns: string[] = ['brand', 'model', 'serial', 'asset_tag', 'status', 'processor', 'hard_drive'];
  miscItemColumns: string[] = ['item', 'brand', 'quantity'];

  links: TabLink[] = [
    { name: 'Laptops', displayedColumns: this.laptopsColumns, dataSource: this.laptopDataSource },
    { name: 'Desktops', displayedColumns: this.desktopsColumns, dataSource: this.desktopDataSource },
    { name: 'Misc Item', displayedColumns: this.miscItemColumns, dataSource: this.miscDataSource }
  ]

  loadInventoryData(): void {
    this.inventoryService.getInventorySummaryData().subscribe((data) => {
      this.orgs = data.organizations;
      this.updateOrgs(data.organizations);
      this.updateWidgetData(data);
      this.updateTableData(data);

      this.isLoading = false;
    })
  }

  updateTableData(data: any): void {
      this.desktops = data.inventory_data.desktops;
      this.desktopDataSource.data = this.desktops;

      this.laptops = data.inventory_data.laptops;
      this.laptopDataSource.data = this.laptops;
        
      this.miscItems = data.inventory_data.misc;
      this.miscDataSource.data = this.miscItems;
  }

  updateWidgetData(data:any): void {
      this.inventoryCount = data.inventory_count.total_count;
      this.laptopCount = data.inventory_count.computer_count.laptops;
      this.desktopCount = data.inventory_count.computer_count.desktops;

      this.updateLaptopModels(data.laptops_summary.models)
      this.updateLaptopBrands(data.laptops_summary.brands)
      this.updateLaptopProcessors(data.laptops_summary.processors)

      this.topWidgets[0].stats = this.inventoryCount;
      this.topWidgets[1].stats = this.laptopCount;
      this.topWidgets[2].stats = this.desktopCount;
  }

  updateLaptopModels(models: {model: string, count: number}[]): void {
    models.forEach((element) => {
      this.laptopModels.set(element.model, element.count)
    })
      this.laptopLabels = Array.from(this.laptopModels.keys());
      this.laptopData = Array.from(this.laptopModels.values());
  }

  updateLaptopBrands(brands: {brand: string, count: number}[]): void {
    brands.forEach((element) => {
      this.laptopBrands.set(element.brand, element.count)
    })
      this.brandLabels = Array.from(this.laptopBrands.keys());
      this.brandData = Array.from(this.laptopBrands.values());
  }

  updateLaptopProcessors(processors: {processor: string, count: number}[]): void {
    processors.forEach((element) => {
      this.laptopProcessors.set(element.processor, element.count)
    })
      this.processorLabels = Array.from(this.laptopProcessors.keys());
      this.processorData = Array.from(this.laptopProcessors.values());
  }

  updateOrgs(organizations: {organization_name: string, org_abbreviation: string}[]): void {
    organizations.forEach((element) => {
        this.org_map.set(element.organization_name, element.org_abbreviation);
      });
      console.log(this.org_map);
  }

  openFileImportDialog() {
    this.dialog.open(FileUploadDialogComponent, {
      minWidth: '512px',
      maxWidth: '704px',
      maxHeight: '1000px',
      data: { 
        title: this.tableTitle,
        orgMap: this.org_map
      }
    })
  }

  openFileExportDialog() {
    this.dialog.open(FileExportDialogComponent, {
      width: '500px',
      height: '500px'
    })
  }
}
