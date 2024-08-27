import React from 'react';
import { Link } from 'react-router-dom';

function PostNotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold text-purple-600 mb-4">No Posts Found</h1>
            <p className="text-lg mb-6">We couldn't find any posts matching your search.</p>
            <Link to="/" className="text-purple-700 hover:underline">
                Return to Home
            </Link>
        </div>
    );
}

export default PostNotFound;
