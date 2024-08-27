import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Button, Container, Login, PostCard } from '../components';
import { ReactTyped } from 'react-typed';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';
// import bg2 from '../assets/pexels.jpg';

function Home() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full h-auto py-16 flex items-center justify-between px-8 overflow-hidden">
                <div className='mx-auto text-center font-bold '>
                    <div className='md:text-xl text-black'>
                        <h1>Hello I'm a Blog Application!!</h1>
                    </div>
                    <div className='text-purple-700 gap-2 md:gap-4 mt-4 text-lg md:text-3xl'>
                        <h1 className='mb-3'>Search for the topic you love </h1>
                        <ReactTyped
                            strings={[
                                "What is ReactJS",
                                "JavaScript interview questions",
                                "What is Tailwind CSS",
                                "How to master HTML & CSS",
                                "Java Core Concepts",
                                "SQL mastery tips"
                            ]}
                            typeSpeed={50}
                            backSpeed={40}
                            loop
                        >

                        </ReactTyped>
                    </div>
                    <div className='flex mt-6'>
                        <Link to="./login" className="flex items-center gap-3 font-normal mx-auto">
                            <Button variant="outlined" className="flex items-center gap-3">
                                Explore More
                                <HiOutlinePencilSquare className='text-xl' />
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="w-1/2 flex justify-end">
                    <Login className='py-3' />
                </div>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
