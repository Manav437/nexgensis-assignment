import type { Book, BookInput } from "../types";

const BASE_URL = "https://6a14703c6c7db8aac0548708.mockapi.io/api/v1/books";

export const bookApi = {
    //get all
    getAll: async (): Promise<Book[]> => {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch collection");
        }

        const data = await response.json();
        return data.map((item: any) => ({
            ...item,
            publicationYear: Number(item.publicationYear),
        }));
    },

    // create new
    create: async (book: BookInput): Promise<Book> => {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        });
        if (!response.ok) throw new Error("Failed to add new book");
        const data = await response.json();
        return { ...data, publicationYear: Number(data.publicationYear) };
    },

    //update
    update: async (id: string, book: BookInput): Promise<Book> => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        });
        if (!response.ok) throw new Error("Failed to update");
        const data = await response.json();
        return { ...data, publicationYear: Number(data.publicationYear) };
    },

    //delete
    delete: async (id: string): Promise<void> => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete");
    },
};
