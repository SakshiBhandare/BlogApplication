import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';
import noposts from '../assets/nopost.avif';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoIosArrowRoundBack } from "react-icons/io";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsResponse = await appwriteService.getPosts();
                if (postsResponse && postsResponse.documents) {
                    setPosts(postsResponse.documents);
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                // Additional error handling can be added here
            }
        };

        fetchPosts();
    }, []);

    const handleCreatePost = () => {
        navigate('/add-post'); // Adjust the path if your add post route is different
    };

    if (posts.length === 0) {
        return (
            <div className='w-full max-h-screen flex flex-col justify-center items-center py-8'>
                <Container>
                    <div className='text-center'>
                        <img
                            src={noposts}
                            alt='No posts'
                            className='mx-auto mb-2 h-[450px] w-[530px] object-cover'
                        />
                        <p className='text-sm font-semibold mb-4'>There are no posts yet.</p>
                        <Button
                            onClick={handleCreatePost}
                            variant="outlined"
                            className="flex items-center gap-3 mx-auto"
                        >
                            Create a New Post
                            <HiOutlinePencilSquare className='text-xl' />
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard
                                $id={post.$id}
                                title={post.title}
                                featuredImage={post.featuredImage}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
