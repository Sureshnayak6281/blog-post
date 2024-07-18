import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BlogPostDetails = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=tesla&from=2024-06-18&sortBy=publishedAt&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        setPost(response.data.articles[id]);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="container mt-4">
      <h1>{post.title}</h1>
      {post.urlToImage && (
        <img src={post.urlToImage} alt={post.title} className="img-fluid mb-3" />
      )}
      <p className="text-muted-custom">
        Published on: {new Date(post.publishedAt).toLocaleDateString()} | 
        Source: {post.source.name}
      </p>
      <p>{post.content}</p>
      <Link to="/" className="btn btn-primary">
        Back to Posts
      </Link>
    </div>
  );
};

export default BlogPostDetails;