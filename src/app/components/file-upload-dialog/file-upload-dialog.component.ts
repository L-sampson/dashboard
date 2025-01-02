import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-file-upload-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.scss'
})
export class FileUploadDialogComponent {
  files: Set<File> = new Set();

  checkFileType(file: File): boolean {
    const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv', 'application/vnd.ms-excel'];
    return allowedTypes.includes(file.type) ? true : false;
  }

  onFileSelect(event: any) {
    const uploaded_files = event.target.files;
    for (const file of uploaded_files) {
      if (!this.checkFileType(file)) {
        alert(`Incorrect File Type for file name: ${file.name}. Acceptable file extentsions are the following:\n\t\tCSV, XLX, and XLSX\nThis file will not be uploaded, please retry`);
        throw new Error(`File type not allowed: ${file.name}`)
      }

      if (file && this.checkFileType(file)) {
        console.log('Correct File type', file.type);
        this.files.add(file);
      }
    }
  }

}
