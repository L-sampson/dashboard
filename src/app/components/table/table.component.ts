import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TabLink } from '../../interfaces/tab-link';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog'; 

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, CommonModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatTabsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() links: TabLink[] = [];
  activeLink!: TabLink

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.links.length > 0) {
      this.activeLink = this.links[0];
    }
  }

  ngAfterViewInit(): void {
    if (this.activeLink && this.activeLink.dataSource) {
      this.activeLink.dataSource.paginator = this.paginator;
    }
  }
  
  setActiveLink(link: TabLink): void { 
    this.activeLink = link; this.activeLink.dataSource.paginator = this.paginator; 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.activeLink && this.activeLink.dataSource) {
      this.activeLink.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    }
  }

  openDialog(ItemType: string) {
    this.dialog.open(DialogComponent, {
      width: '890px',
      height: 'auto',
      data: {
        itemType: ItemType,
        fields: this.activeLink.displayedColumns
      }
    });
  }
}
