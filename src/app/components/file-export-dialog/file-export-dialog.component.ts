import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-file-export-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './file-export-dialog.component.html',
  styleUrls: ['./file-export-dialog.component.scss'],
})
export class FileExportDialogComponent implements OnInit {
  constructor(private inventoryService: InventoryService) { }

  myControl = new FormControl('');
  blobs: { name: string; size: number }[] = [];
  filteredOptions!: Observable<string[]>;
  selectedFiles: { name: string; size: number }[] = [];

  ngOnInit(): void {
    this.fetchBlobs().then(() => {
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this.filter(value || ''))
      );
    });
  }


  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.blobs
      .map((blob) => blob.name)
      .filter((name) => name.toLowerCase().includes(filterValue));
  }



  addFile(): void {
    const fileName = this.myControl.value;
    const file = this.blobs.find((blob) => blob.name === fileName);
    if (file) {
      this.selectedFiles.push(file);
      this.myControl.setValue('');
    } else {
      alert('Could not find file in the list');
    }
  }

  fetchBlobs(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.inventoryService.fetchInventoryBlobs().subscribe({
        next: (data) => {
          this.blobs = data;
          console.log('Fetched Blob Names:', this.blobs);
          resolve();
        },
        error: (error) => {
          console.error('Error fetching blob names:', error);
          reject(error);
        }
      });
    });
  }


  removeFile(fileName: string): void {
    this.selectedFiles = this.selectedFiles.filter(
      (file) => file.name !== fileName
    );
    console.log('File Removed:', fileName);
  }

  trackByFn(index: number, item: { name: string; size: number }): number {
    return index; // Track by index
  }
}
