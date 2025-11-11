export default function ProductsSkeleton() {
    return (
        // Using 'max-w-7xl mx-auto' for a common container pattern if needed
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Generates 8 skeleton items */}
            {Array.from({length: 8}).map((_,i) => (
                <div 
                    key={i}
                    // Added 'cursor-not-allowed'
                    className="animate-pulse border rounded-lg p-3 shadow-sm bg-white cursor-not-allowed"
                >
                    {/* Image placeholder */}
                    <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
                    
                    {/* Title placeholder */}
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
                    
                    {/* Price/Description placeholder */}
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div> 
                    
                    {/* Button placeholder - Added 'w-full' and changed 'h-8' to 'h-10' */}
                    <div className="h-10 bg-gray-300 rounded w-full"></div>
                </div>
            ))}
        </div>
    );
}
