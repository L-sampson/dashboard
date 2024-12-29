import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../components/table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { TabLink } from '../../interfaces/tab-link';
import { Laptop, Desktop, Misc } from '../../interfaces/models';
import { InventoryService } from '../../services/inventory.service';



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

  ngOnInit(): void {
    this.fetchDesktops();
    this.fetchLaptops();
    this.fetchMiscItems();
  }

  laptopsColumns: string[] = ['brand', 'model', 'serial', 'asset_tag', 'status', 'processor'];
  desktopsColumns: string[] = ['brand', 'model', 'serial', 'asset_tag', 'status', 'processor', 'hard_drive'];
  miscItemColumns: string[] = ['item', 'brand', 'quantity'];

  links: TabLink[] = [
    { name: 'Laptops', displayedColumns: this.laptopsColumns, dataSource: this.laptopDataSource, filterPlaceHolder: 'Laptops', buttonPlaceHolder: 'Laptop' },
    { name: 'Desktops', displayedColumns: this.desktopsColumns, dataSource: this.desktopDataSource, filterPlaceHolder: 'Desktops', buttonPlaceHolder: 'Desktop' },
    { name: 'Misc Item', displayedColumns: this.miscItemColumns, dataSource: this.miscDataSource, filterPlaceHolder: 'Misc Item', buttonPlaceHolder: 'Misc Item' }
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
}
