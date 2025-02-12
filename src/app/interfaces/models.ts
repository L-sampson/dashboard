export enum Status {
    Inventory,
    Imaged,
    Activated,
    Distributed,
    Recycled
}

export interface Computer {
    brand: string;
    model: string;
    serial: string;
    asset_tag: string;
    status: Status;
}

export interface Laptop extends Computer {
    processor: string;
}


export interface Desktop extends Computer {
    processor: string;
    hard_drive: string;
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

export interface Contacts {
    full_name: string;
    role: string;
    organization_name: string;
    org_abbreviation: string;
    phone_number: string;
    email: string;
}

export interface Donations {
    organization_name: string;
    org_abbreviation: string;
    most_recent_donation_date: string;
    total_donations: string;
}

export interface Organizations {
    organization_name: string;
    org_abbreviation: string;
}