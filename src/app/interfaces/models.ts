export enum Status {
    Inventory,
    Imaged,
    Activated,
    Distributed,
    Recycled 
 }

export interface Models {
    brand: string;
    model: string;
    serial: string;
    asset_tag: string;
    status: Status;
}

export interface Laptop extends Models {
    processor: string;
}


export interface Desktop extends Models{
    processor: string;
    hard_drive:string;
}

export interface Misc {
    item: string;
    brand: string;
    quantity: number;
}

enum WorkshopType {
    ADL,
    FLW,
    DSFY
}

export interface Workshop {
    date: Date;
    name: string;
    location: string;
    type: WorkshopType;
    devices: number;
}

export interface Participants {
    name: string;
    age: number;
    workshop: string;
}