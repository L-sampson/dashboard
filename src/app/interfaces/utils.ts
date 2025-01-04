import { MatTableDataSource } from "@angular/material/table";

export interface TabLink {
    name: string;
    displayedColumns: string[];
    dataSource: MatTableDataSource<any>;
}


export interface FileMetaData {
    file: File;
    companyName: string;
    donationDate: Date | null;
}