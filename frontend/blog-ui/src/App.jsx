import { useEffect, useState } from 'react';
import axios from 'axios';
import AddPost from './AddPost';

function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios.get('http://localhost:8080/api/posts')
      .then(response => {
        setPosts(response.data.reverse());
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Developer Blog</h1>
          <p className="text-gray-600">Powered by Spring Boot & React</p>
        </div>
        
        {/* The Form */}
        <AddPost onPostAdded={fetchPosts} />

        {/* Divider */}
        <div className="relative flex py-5 items-center mb-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Recent Updates</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Post List */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 italic">No posts yet. Be the first to write one!</p>
          ) : null}
          
          {posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;