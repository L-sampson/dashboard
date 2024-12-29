import { MatTableDataSource } from "@angular/material/table";

export interface TabLink {
    name: string;
    displayedColumns: string[];
    dataSource: MatTableDataSource<any>;
    filterPlaceHolder: string;
    buttonPlaceHolder: string;
}
