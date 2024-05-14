export interface Freetime {
    id:string;
    freetimeName: string;
    freetimeDate: string;
    freetimeHours: string;
    category: FreetimeCategory; // Use FreetimeCategory enum
    modus:FreetimeModus; // Use FreetimeModus enum
}


export enum FreetimeCategory{
    None,
    Family,
    Friends,
    Job
}

export enum FreetimeModus{
    None,
    In_Person,
    Phone,
    Video
}