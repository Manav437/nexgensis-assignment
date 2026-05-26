import React from "react";

export const SkeletonGrid: React.FC = () => {
    const skeletons = Array.from({ length: 6 });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {skeletons.map((_, index) => (
                <div
                    key={index}
                    className="bg-white border border-gray-100 rounded-xl p-6 space-y-4 shadow-sm"
                >
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="space-y-2">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                        <div className="h-4 bg-gray-200 rounded w-1/5"></div>
                        <div className="flex space-x-2 w-1/3">
                            <div className="h-8 bg-gray-200 rounded flex-1"></div>
                            <div className="h-8 bg-gray-200 rounded flex-1"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
