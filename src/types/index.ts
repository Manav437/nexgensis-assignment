export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    publicationYear: number;
}

export type BookInput = Omit<Book, "id">;
