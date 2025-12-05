import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  // Runs automatically when page loads
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    // This URL matches the @RequestMapping in your Java Controller
    axios.get('http://localhost:8080/api/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>My Developer Blog</h1>
      {posts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px' }}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;