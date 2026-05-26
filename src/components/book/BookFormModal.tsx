import React, { useState, useEffect } from "react";
import type { Book, BookInput } from "../../types";

interface BookFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: BookInput) => Promise<void>;
    initialData?: Book | null;
    availableGenres?: string[];
}

const AVAILABLE_GENRES = [
    "Fiction",
    "Non-Fiction",
    "Sci-Fi",
    "Biography",
    "Mystery",
    "History",
];

export const BookFormModal: React.FC<BookFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    availableGenres,
}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setAuthor(initialData.author);
            setGenre(initialData.genre);
            setPublicationYear(initialData.publicationYear.toString());
        } else {
            setTitle("");
            setAuthor("");
            setGenre("");
            setPublicationYear("");
        }
        setValidationError(null);
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError(null);

        if (!title.trim() || !author.trim() || !genre || !publicationYear) {
            setValidationError("All operational fields are strictly required.");
            return;
        }

        const yearNum = Number(publicationYear);
        const currentYear = new Date().getFullYear();
        if (isNaN(yearNum) || yearNum < 0 || yearNum > currentYear) {
            setValidationError(
                `Please input a valid chronological year (0 - ${currentYear}).`,
            );
            return;
        }

        try {
            setIsSubmitting(true);
            await onSubmit({
                title: title.trim(),
                author: author.trim(),
                genre,
                publicationYear: yearNum,
            });
            onClose();
        } catch (err: any) {
            setValidationError(
                err.message || "Something went wrong while pushing changes.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">
                        {initialData ? "Edit Book Record" : "Register New Book"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl transition-colors"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                    {validationError && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs rounded-lg font-medium">
                            {validationError}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                            Book Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., The Great Gatsby"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300/40 focus:border-slate-300 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                            Author
                        </label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="e.g., F. Scott Fitzgerald"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300/40 focus:border-slate-300 text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                                Genre
                            </label>
                            <select
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-300/40 focus:border-slate-300 text-sm"
                            >
                                <option value="">Select Genre</option>
                                {(availableGenres ?? AVAILABLE_GENRES).map(
                                    (g) => (
                                        <option key={g} value={g}>
                                            {g}
                                        </option>
                                    ),
                                )}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                                Pub Year
                            </label>
                            <input
                                type="number"
                                value={publicationYear}
                                onChange={(e) =>
                                    setPublicationYear(e.target.value)
                                }
                                placeholder="e.g., 1925"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300/40 focus:border-slate-300 text-sm"
                            />
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 disabled:bg-slate-500 rounded-lg shadow-sm transition-colors"
                        >
                            {isSubmitting
                                ? "Saving changes..."
                                : initialData
                                  ? "Update Entry"
                                  : "Create Entry"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
