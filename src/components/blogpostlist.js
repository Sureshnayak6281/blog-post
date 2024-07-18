import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPostItem from './blogpostitems';

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=tesla&from=2024-06-18&sortBy=publishedAt&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${page}&pageSize=12`
        );
        setPosts(response.data.articles);
        setTotalResults(response.data.totalResults);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [page]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Blog Posts</h1>
      <div className="mb-4">
        <button
          className="btn btn-primary mr-2"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>&nbsp;&nbsp;
        <button
          className="btn btn-primary"
          onClick={() => setPage(page + 1)}
          disabled={page * 20 >= totalResults}
        >
          Next
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {posts.map((post, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <BlogPostItem post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPostList;