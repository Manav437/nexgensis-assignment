import React from "react";
import type { Book } from "../../types";

interface BookCardProps {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (id: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
    book,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="bg-white ring-2 ring-gray-200 rounded-xl p-6 shadow-xs hover:bg-white/5 transition-shadow duration-200 flex flex-col justify-between group">
            <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 mb-3 border border-slate-200">
                    {book.genre}
                </span>

                <h3 className="text-xl font-bold text-gray-900 group-hover:text-slate-700 transition-colors duration-150 line-clamp-2">
                    {book.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                    by{" "}
                    <span className="font-medium text-gray-700">
                        {book.author}
                    </span>
                </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                    Year: {book.publicationYear}
                </span>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onEdit(book)}
                        className="cursor-pointer px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-slate-700 hover:bg-slate-200 border border-gray-200 rounded-[30px] [corner-shape:squircle] transition-all"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            if (
                                window.confirm(
                                    `Are you sure you want to delete "${book.title}"?`,
                                )
                            ) {
                                onDelete(book.id);
                            }
                        }}
                        className="cursor-pointer px-3 py-1.5 text-xs font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-100 rounded-[30px] [corner-shape:squircle] transition-all"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
