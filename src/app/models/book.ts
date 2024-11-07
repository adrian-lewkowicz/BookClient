export interface Book {
    id: string;
    title: string;
    author: string;
    publicationDate: Date;
    pages: number;
    genre: string;
    rating: number;
    price: number;
    isbn: string;
    isAvailable: boolean;
}