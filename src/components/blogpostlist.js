import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPostItem from './blogpostitems';

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/news', {
          params: {
            page: page,
            pageSize: 12
          }
        });
        setPosts(response.data.articles);
        setTotalResults(response.data.totalResults);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [page]);

  const handlePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Blog Posts</h1>
      <div className="mb-4">
        <button
          className="btn btn-primary mr-2"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          Previous
        </button>&nbsp;&nbsp;
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={page === totalPages}
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