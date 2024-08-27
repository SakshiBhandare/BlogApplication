import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import ConfirmationModal from "./ConfirmationModal";

export default function Post() {
    const [post, setPost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = async () => {
        const result = await appwriteService.deletePost(slug);
        if (result) {
            await appwriteService.deleteFile(post.featuredImage);
            navigate("/");
        } else {
            alert("Failed to delete the post. It may not exist or there was an error.");
        }
    };

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        deletePost();
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="flex flex-col gap-6 md:flex-row mb-4 relative border rounded-xl p-2">
                    {/* Image Section */}
                    <div className="w-full md:w-2/5 mb-4 md:mb-0">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-auto max-h-[500px] object-cover rounded-xl"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-3/5 md:pl-6">
                        {isAuthor && (
                            <div className="flex justify-end mb-4">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <button
                                    onClick={handleDeleteClick}
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                        <div className="text-balance text-justify">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>

            {/* Render the Confirmation Modal */}
            <ConfirmationModal
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
        </div>
    ) : null;
}
