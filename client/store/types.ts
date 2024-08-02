// store/types.ts
export interface Customer {
    id: string;
    membershipNumber: string;
    name: string;
    birthDate: string;
}

export interface Book {
    id: string;
    title: string;
    publisher: string;
    pageCount: number;
    stock: number;
}
