import { useState } from 'react';
import axios from 'axios';

const AddPost = ({ onPostAdded }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null); // 'loading', 'success', 'error'
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrors({});
        setMessage('');

        const newPost = { title, content };

        try {
            await axios.post('http://localhost:8080/api/posts', newPost);
            
            // Success Logic
            setStatus('success');
            setMessage('Post published successfully!');
            setTitle('');
            setContent('');
            if (onPostAdded) onPostAdded();

            // Hide success message after 3 seconds
            setTimeout(() => {
                setStatus(null);
                setMessage('');
            }, 3000);

        } catch (error) {
            console.error("Error creating post:", error);
            setStatus('error');
            
            if (error.response && error.response.data) {
                const serverData = error.response.data;
                // Handle Field Errors (Clean JSON)
                if (!serverData.errors && !serverData.status) {
                    setErrors(serverData);
                } 
                // Handle Default Spring Errors
                else if (serverData.errors) {
                    const extractedErrors = {};
                    serverData.errors.forEach(err => {
                        extractedErrors[err.field] = err.defaultMessage;
                    });
                    setErrors(extractedErrors);
                } else {
                    setMessage(serverData.message || 'Something went wrong');
                }
            } else {
                setMessage('Network Error. Is backend running?');
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                ✍️ <span className="text-blue-600">Write a New Post</span>
            </h2>

            {/* Success Alert Banner */}
            {status === 'success' && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md border border-green-200 flex items-center animate-fade-in">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    {message}
                </div>
            )}

            {/* Error Alert Banner (General Errors) */}
            {status === 'error' && message && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200 text-sm">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter an engaging title..."
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors
                            ${errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'}
                        `}
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>
                
                {/* Content Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share your knowledge..."
                        className={`w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 transition-colors
                            ${errors.content ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'}
                        `}
                    />
                    {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                </div>

                {/* Submit Button with Loading Spinner */}
                <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium flex justify-center items-center transition-all
                        ${status === 'loading' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'}
                    `}
                >
                    {status === 'loading' ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Publishing...
                        </>
                    ) : (
                        'Publish Post'
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddPost;