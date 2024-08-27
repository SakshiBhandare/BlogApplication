import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';
import Button from './Button';

function PostCard({ $id, title, featuredImage, name }) {
    const imageUrl = featuredImage 
        ? appwriteService.getFilePreview(featuredImage) 
        : '/path-to-fallback-image.jpg'; // Replace with your fallback image path

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-1 gap-10 mb-5 shadow-md shadow-purple-400'>
                <div className='w-full justify-center mb-4'>
                    <img 
                        src={imageUrl} 
                        alt={title}
                        className='rounded-xl w-full h-52 object-cover' 
                    />
                </div>
                <h2 className='text-lg font-medium'>{title}</h2>
                <h3 className='text-sm font-normal'>{name}</h3>
                <Button className='mt-3 h-8 font-light text-xs py-1 mb-2 bg-purple-500'>Read More</Button>
            </div>
        </Link>
    );
}

export default PostCard;
