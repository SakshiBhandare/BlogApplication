import React from "react";

function ConfirmationModal({ show, onClose, onConfirm }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Delete Post</h2>
                <p className="text-gray-600 mb-6">This post will be deleted permanently. Are you sure you want to delete it anyways?</p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
