import * as React from 'react';

const NotFoundPage: React.FC = () => {

    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
                <h1 className="text-7xl font-bold text-gray-900">404</h1>

                <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                    Page Not Found
                </h2>

                <p className="mt-2 max-w-md text-gray-600">
                    Sorry, the page you are looking for doesn’t exist or has been moved.
                </p>
            </div>
        </>
    )
}

export default NotFoundPage;