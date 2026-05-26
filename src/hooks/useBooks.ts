import { useState, useEffect, useCallback } from "react";
import type { Book, BookInput } from "../types";
import { bookApi } from "../services/api";

export const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadBooks = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await bookApi.getAll();
            setBooks(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    const addBook = async (input: BookInput) => {
        try {
            const newBook = await bookApi.create(input);
            setBooks((prev) => [...prev, newBook]);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to add book");
            }
        }
    };

    const updateBook = async (id: string, input: BookInput) => {
        try {
            const updated = await bookApi.update(id, input);
            setBooks((prev) => prev.map((b) => (b.id === id ? updated : b)));
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to update book details");
            }
        }
    };

    const deleteBook = async (id: string) => {
        try {
            await bookApi.delete(id);
            setBooks((prev) => prev.filter((b) => b.id !== id));
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to delete book");
            }
        }
    };

    return {
        books,
        isLoading,
        error,
        refreshCollection: loadBooks,
        addBook,
        updateBook,
        deleteBook,
    };
};
