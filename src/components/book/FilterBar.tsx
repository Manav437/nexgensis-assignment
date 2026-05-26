import React from "react";

interface FilterBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedGenre: string;
    onGenreChange: (value: string) => void;
    genres?: string[];
}

const FILTER_GENRES = [
    "All",
    "Fiction",
    "Non-Fiction",
    "Sci-Fi",
    "Biography",
    "Mystery",
    "History",
];

export const FilterBar: React.FC<FilterBarProps> = ({
    searchTerm,
    onSearchChange,
    selectedGenre,
    onGenreChange,
    genres,
}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-8 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full sm:flex-1 relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search by title or author..."
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300/40 focus:border-slate-300 text-sm"
                />
                {searchTerm && (
                    <button
                        onClick={() => onSearchChange("")}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-sm font-bold"
                    >
                        &times;
                    </button>
                )}
            </div>

            <div className="w-full sm:w-48">
                <select
                    value={selectedGenre}
                    onChange={(e) => onGenreChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-300/40 focus:border-slate-300 text-sm"
                >
                    {(genres ?? FILTER_GENRES).map((genre) => (
                        <option key={genre} value={genre}>
                            {genre === "All" ? "All Genres" : genre}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
