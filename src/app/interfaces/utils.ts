import { MatTableDataSource } from "@angular/material/table";

export interface TabLink {
    name: string;
    displayedColumns: string[];
    dataSource: MatTableDataSource<any>;
}


export interface FileMetaData<T = {}> {
    file: File;
    metadata?: T;    
}

export interface InventoryMetaData {
    companyName: string;
    donationDate: Date | null;
}

export interface DonorsMetaData {
    lastUpdate: Date | null;
}