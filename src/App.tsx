import React, { useState, useMemo } from "react";
import { useBooks } from "./hooks/useBooks";
import { BookCard } from "./components/book/BookCard";
import { SkeletonGrid } from "./components/shared/SkeletonGrid";
import { BookFormModal } from "./components/book/BookFormModal";
import { FilterBar } from "./components/book/FilterBar";
import type { Book, BookInput } from "./types";

const App: React.FC = () => {
    const { books, isLoading, error, addBook, updateBook, deleteBook } =
        useBooks();

    const genres = useMemo(() => {
        const unique = Array.from(new Set(books.map((b) => b.genre).filter(Boolean)));
        return ["All", ...unique];
    }, [books]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("All");

    const handleOpenAddModal = () => {
        setEditingBook(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (book: Book) => {
        setEditingBook(book);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (formData: BookInput) => {
        if (editingBook) {
            await updateBook(editingBook.id, formData);
        } else {
            await addBook(formData);
        }
    };

    const filteredBooks = books.filter((book) => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesGenre =
            selectedGenre === "All" || book.genre === selectedGenre;

        return matchesSearch && matchesGenre;
    });

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <h1 className="text-xl font-bold tracking-tight text-gray-900">
                            Book Management
                        </h1>
                    </div>
                    <button
                        onClick={handleOpenAddModal}
                        className="cursor-pointer bg-zinc-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm transition-all shadow-sm"
                    >
                        + Add New Book
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm flex items-center justify-between">
                        <p className="font-medium">⚠️ Error: {error}</p>
                    </div>
                )}

                <FilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectedGenre={selectedGenre}
                    onGenreChange={setSelectedGenre}
                    genres={genres}
                />

                {isLoading ? (
                    <SkeletonGrid />
                ) : filteredBooks.length === 0 ? (
                    <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
                        <p className="text-gray-500 font-medium">
                            No book records match your search criteria.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBooks.map((book) => (
                            <BookCard
                                key={book.id}
                                book={book}
                                onEdit={handleOpenEditModal}
                                onDelete={deleteBook}
                            />
                        ))}
                    </div>
                )}
            </main>

            <BookFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                initialData={editingBook}
                availableGenres={genres.slice(1)}
            />
        </div>
    );
};

export default App;
