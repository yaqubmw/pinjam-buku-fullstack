// store/types.ts
export interface Customer {
    id: number;
    membership_number: string;
    name: string;
    birth_date: string;
}

export interface Book {
    id: number;
    title: string;
    publisher: string;
    page_count: number;
    stock: number;
}

export interface Transaction {
    id: number;
    customer_id: number;
    book_id: number;
    price: number;
    rent_date: string;
    return_date: string;
    is_returned: boolean;
}