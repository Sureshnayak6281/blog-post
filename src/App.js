import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import BlogPostList from './components/blogpostlist';
import BlogPostDetails from './components/blogpostdetails';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/everything?q=tesla&from=2024-06-18&sortBy=publishedAt&apiKey=37e8b94ccbca495e88359d946bca82ec'
        );
        setPosts(response.data.articles);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="App">
      <div className="App" style={{backgroundColor: '#121212', minHeight: '100vh', paddingBottom: '2rem'}}>
      <BlogPostList />
    </div>
      <Routes>
        {/* <Route path="/" element={<BlogPostList />} /> */}
        <Route path="/post/:id" element={<BlogPostDetails posts={posts} />} />
      </Routes>
    </div>
  );
}

export default App;