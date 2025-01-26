import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FileMetaData } from '../../interfaces/utils';
import { InventoryService } from '../../services/inventory.service';
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-file-upload-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, FormsModule,CommonModule, MatCheckboxModule],
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.scss',
})
export class FileUploadDialogComponent {
  constructor(private inventoryService: InventoryService) {}
  files: Map<string, FileMetaData> = new Map()
  readonly startDate = new Date();

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

onSampleFile() {
  this.inventoryService.getInventorySampleBlob().subscribe({
    next: (response) => {
      console.log('Download successful:', response);

      // Create a temporary <a> element
      const link = document.createElement('a');
      
      // Create a URL for the Blob (response needs to be a Blob type here)
      const fileURL = URL.createObjectURL(response);

      // Set the download attribute with a filename
      link.href = fileURL;
      link.download = 'InventorySample.xlsx';  // Set your file name here

      // Append the link to the body (this step is required to simulate a click)
      document.body.appendChild(link);
      
      // Programmatically click the link to trigger the download
      link.click();

      // Clean up by removing the temporary link element
      document.body.removeChild(link);

      console.log('File is ready to be downloaded.');
    },
    error: (err) => {
      console.error('Download failed:', err);
    }
  });
}



private generateFileKey(file: File) {
  return `${file.name}`
}

private addFile(file: File) {
  if(!this.checkFileType(file)) {
      alert(`Incorrect File Type for file name: ${file.name}. Acceptable file extentsions are the following:\nCSV, XLX, and XLSX\nThis file will not be uploaded, please retry`);
      throw new Error(`File type not allowed: ${file.name}`)
  } 
  const key = this.generateFileKey(file);
  if(this.files.has(key)) {
    alert(`File: ${file.name} already exist`)
    return
  }

  const metdata: FileMetaData = {
    file,
    companyName: '',
    donationDate: null,
  };

  this.files.set(key, metdata)
  console.log('File added', metdata)
  console.log(this.FileEntries)
}

removeFile(file: File) {
  const key = this.generateFileKey(file);
  if(this.files.delete(key)) {
    console.log('File removed:', file.name);
  } else {
    console.log('FIle not found')
  }
}

get FileEntries() {
  return Array.from(this.files.entries())
}

setFileSize(fileSize: number) {
  var count = 0;
  while(fileSize > 1024) {
    fileSize /= 1024
    count++;
  }

  var units = ['Bytes', 'KB', 'MB', 'TB'];
  if(count >= units.length) {
    throw new Error('File Size is too large');
  }

  fileSize = Math.ceil(fileSize)
  return `${fileSize} ${units[count]}`
}

uploadFiles() {
  const form = new FormData();
  this.files.forEach(file => {
    if (!file.companyName || !file.donationDate) {
      alert('Please complete all required fields for each file.');
      return;
    }

    if (!file.file) {
      alert('Missing File');
      return;
    }
    form.append('companyName', file.companyName);
    form.append('donationDate', file.donationDate.toISOString());
    form.append('file', file.file);  // Keep appending with the same 'file' key for each file
  });

  console.log('Form Data Contents:');
  for (const [key, value] of form.entries()) {
    console.log(`${key}:`, value);
  }

  this.inventoryService.bulkImport(form).subscribe({
    next: (response) => {
      console.log('Upload successful:', response);
    },
    error: (err) => {
      console.error('Upload failed:', err);
    }
  });
}


// Track by FormNumber. Use this method to track froms in DOM.
trackByFn(index: number, item: any): any {
  return item.id || index;
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
