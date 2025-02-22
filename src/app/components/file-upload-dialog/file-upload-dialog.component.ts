import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DonorsMetaData, FileMetaData, InventoryMetaData } from '../../interfaces/utils';
import { InventoryService } from '../../services/inventory.service';
import { DonorsService } from '../../services/donors.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Observable, startWith, map } from 'rxjs';

type AllMetaData = InventoryMetaData | DonorsMetaData;

export interface DialogData {
  title: string,
  orgMap: Map<string, string>;
}

@Component({
  selector: 'app-file-upload-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule,
    MatAutocompleteModule
  ],
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.scss',
})
export class FileUploadDialogComponent implements OnInit {
  constructor(private inventoryService: InventoryService, private donorsService: DonorsService) { }
  files: Map<string, FileMetaData<AllMetaData>> = new Map();
  readonly startDate = new Date();
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  private snackBar = inject(MatSnackBar);

  formControl = new FormControl('');
  filteredCompanies!: Observable<{ abbreviation: string, name: string }[]>;
  allCompanies = this.getCompanyNames();

  ngOnInit(): void {
    this.filteredCompanies = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): { abbreviation: string, name: string }[] {
    const filterValue = value.toLowerCase();

    return this.allCompanies.filter(org => org.name.toLowerCase().includes(filterValue))
  }

  private metadataTypeMap: Record<string, () => AllMetaData> = {
    'Inventory': () => ({ companyName: '', companyAbrreviation: '', donationDate: null }),
    'Donors': () => ({ lastUpdate: null })
  }

  getMetaDataType(pageTitle: string) {
    const metadata = this.metadataTypeMap[pageTitle];
    return metadata();
  }

  checkFileType(file: File): boolean {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv',
      'application/vnd.ms-excel'
    ];
    return allowedTypes.includes(file.type) ? true : false;
  }

  onFileSelect(event: Event) {
    const upload = event.target as HTMLInputElement;
    if (!upload.files) {
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
    if (uploads) {
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


  getCompanyNames(): { abbreviation: string, name: string }[] {
    return Array.from(this.data.orgMap.entries()).map(([name, abbreviation]) => ({
      abbreviation,
      name
    }))
  }

  updateCompanyAbb(fileKey: string) {
    const fileData = this.files.get(fileKey);
    if (!fileData || !this.isInventoryMetadata(fileData)) {
      this.showSnackBar('Invalid file data or metadata type.');
      return;
    }

    // Update the company abbreviation based on the selected company name
    const abbreviation = this.data.orgMap.get(fileData.companyName) || '';
    // if (!abbreviation) {
    //   this.showSnackBar('Company abbreviation not found.');
    //   return;
    // }

    fileData.companyAbrreviation = abbreviation;
    this.files.set(fileKey, fileData); // Ensure the update is reflected
  }

  private generateFileKey(file: File) {
    return `${file.name}`
  }

  private addFile(file: File) {
    if (!this.checkFileType(file)) {
      alert(`Incorrect File Type for file name: ${file.name}. Acceptable file extentsions are the following:\nCSV, XLX, and XLSX\nThis file will not be uploaded, please retry`);
      throw new Error(`File type not allowed: ${file.name}`)
    }
    const key = this.generateFileKey(file);
    if (this.files.has(key)) {
      alert(`File: ${file.name} already exist`)
      return
    }

    const metadata: FileMetaData<AllMetaData> = {
      file,
      ...this.getMetaDataType(this.data.title) // Retrieve correct metadata type
    };


    this.files.set(key, metadata)
  }

  removeFile(file: File) {
    const key = this.generateFileKey(file);
    if (this.files.delete(key)) {
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
    while (fileSize > 1024) {
      fileSize /= 1024
      count++;
    }

    var units = ['Bytes', 'KB', 'MB', 'TB'];
    if (count >= units.length) {
      throw new Error('File Size is too large');
    }

    fileSize = Math.ceil(fileSize)
    return `${fileSize} ${units[count]}`
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  private serviceCallMap: Record<string, (form: FormData) => Observable<any>> = {
    'Inventory': (form: FormData) => this.inventoryService.bulkImport(form),
    'Donors': (form: FormData) => this.donorsService.bulkContactsImport(form)
  }

  uploadFiles(pageTitle: string) {
    this.getMetaDataType(pageTitle);
    const form = new FormData();

    this.files.forEach((fileData, fileName) => {
      if (!fileData.file) {
        alert(`Missing File: ${fileName}`);
        return;
      }

      form.append('file', fileData.file);

      // Add metadata
      if (pageTitle === 'Inventory' && this.isInventoryMetadata(fileData)) {
        if (!fileData.companyName || !fileData.donationDate) {
          alert('Please include the missing donation or company name');
          return;
        }

        form.append('companyName', fileData.companyName);
        form.append('companyAbrreviation', fileData.companyAbrreviation || '');
        form.append('donationDate', fileData.donationDate?.toISOString() || '');
      }
    });

    const serviceCall = this.serviceCallMap[pageTitle];
    if (!serviceCall) {
      this.showSnackBar(`No Service found for ${pageTitle}`)
    }

    serviceCall(form).subscribe({
      next: (response) => {
        this.showSnackBar(response.message);
      },
      error: (err) => {
        this.showSnackBar(err.message);
      }
    })
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

  isInventoryMetadata(fileData: any): fileData is InventoryMetaData {
    return 'companyName' in fileData && 'donationDate' in fileData;
  }

}
