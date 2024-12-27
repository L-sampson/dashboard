import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, CommonModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource(); 
  @Input() filterPlaceHolder: string = 'Filter';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    console.log(this.displayedColumns);
    console.log(this.dataSource);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
