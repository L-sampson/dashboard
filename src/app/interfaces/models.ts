enum Status {
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