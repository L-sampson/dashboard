import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-file-upload-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.scss'
})
export class FileUploadDialogComponent {
  files: Set<File> = new Set();

  checkFileType(file: File): boolean {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv', 
      'application/vnd.ms-excel'
    ];
    return allowedTypes.includes(file.type) ? true : false;
  }

  onFileSelect(event: Event) {
    const upload = event.target as HTMLInputElement;
    if(!upload.files) {
      return;
    }
    Array.from(upload.files).forEach((file) => {
      this.addFile(file);
    });
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const uploads = event.dataTransfer?.files
    if(uploads) {
      Array.from(uploads).forEach((file) => {
        this.addFile(file)
      })
    }
}

private addFile(file: File) {
  if(!this.checkFileType(file)) {
      alert(`Incorrect File Type for file name: ${file.name}. Acceptable file extentsions are the following:\nCSV, XLX, and XLSX\nThis file will not be uploaded, please retry`);
      throw new Error(`File type not allowed: ${file.name}`)
  }
  console.log('Correct File type', file.type);
  this.files.add(file)
}

@HostListener('dragover', ['$event'])
onDragOver(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();
}

@HostListener('dragleave', ['$event'])
onDragLeave(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();
}

}
