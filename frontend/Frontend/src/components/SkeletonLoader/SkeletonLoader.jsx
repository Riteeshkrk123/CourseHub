
const SkeletonLoader = () => {
    return (
        <div className="w-full md:w-[260px] border rounded-md shadow-lg">
            <div className="animate-pulse">
                <div className="h-44 bg-gray-300 rounded-md"></div>

                <div className="p-4">
                    <div className="mt-2 w-24 h-4 bg-gray-300 rounded"></div>

                    <div className="mt-3 h-6 w-3/4 bg-gray-300 rounded"></div>

                    <div className="mt-2 space-y-2">
                        <div className="h-4 w-full bg-gray-300 rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                    </div>

                    <div className="mt-4 flex items-center gap-4 space-x-2">
                        <div className="h-4 w-20 bg-gray-300 rounded"></div>
                        <div className="h-4 w-12 bg-gray-300 rounded"></div>
                    </div>

                    <div className="mt-4 flex items-center justify-between space-x-2">
                        <div className="h-4 w-16 bg-gray-300 rounded"></div>
                        <div className="h-4 w-16 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SkeletonLoader;