import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TabLink } from '../../interfaces/utils';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog'; 
import { InventoryService } from '../../services/inventory.service';
import { WorkshopService } from '../../services/workshop.service';
import { Workshop, Participants } from '../../interfaces/models';
import { Desktop, Laptop, Misc } from '../../interfaces/models';

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

  constructor(private dialog: MatDialog,
    private inventoryService: InventoryService,
    private workshopService: WorkshopService
  ) {}

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

  openDialog(itemType: string) {
    const dialogRef =this.dialog.open(DialogComponent, {
      width: '890px',
      height: 'auto',
      data: {
        itemType: itemType,
        fields: this.activeLink.displayedColumns
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        console.log(itemType)
        console.log("form data: ", result)
        this.addItem(itemType, result)
      }
    })
  }

  private addItem(itemType: string, item: any) {
    switch(itemType) {
      case 'Desktops':
        this.inventoryService.addDesktop(item).subscribe((desktop: Desktop) => {
          console.log(desktop); 
          this.activeLink.dataSource.data.push(item); 
          this.activeLink.dataSource._updateChangeSubscription();
        })
        break;
      case 'Laptops':
        this.inventoryService.addLaptop(item).subscribe((laptop: Laptop) => {
          console.log(laptop)
          this.activeLink.dataSource.data.push(item);
          this.activeLink.dataSource._updateChangeSubscription();
        })
        break;
      case 'Misc Item':
        this.inventoryService.addMiscItem(item).subscribe((misc: Misc) => {
          console.log(misc);
          this.activeLink.dataSource.data.push(item);
          this.activeLink.dataSource._updateChangeSubscription();
        })
        break;
        case 'Workshops':
        this.workshopService.addWorkshop(item).subscribe((workshop: Workshop) => {
          console.log(workshop);
          this.activeLink.dataSource.data.push(item);
          this.activeLink.dataSource._updateChangeSubscription();
        })
        break;
        case 'Participants':
        this.workshopService.addParticipant(item).subscribe((participant: Participants) => {
          console.log(participant);
          this.activeLink.dataSource.data.push(item);
          this.activeLink.dataSource._updateChangeSubscription();
        })
        break;
      default:
        console.log('Unknown item type: ', itemType)
    }
  }
}
