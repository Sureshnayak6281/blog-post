import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPostItem from './blogpostitems';

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isHome, setIsHome] = useState(true);

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
    setIsHome(page === 1); // Update isHome state based on the current page
  }, [page]);

  const handleHome = () => {
    setPage(1);
  };

  const handlePrevious = () => {
    setPage((prevPage) => {
      const newPage = Math.max(prevPage - 1, 1);
      setIsHome(newPage === 1);
      return newPage;
    });
  };

  const handleNext = () => {
    setPage((prevPage) => {
      const newPage = Math.min(prevPage + 1, totalPages);
      setIsHome(newPage === 1);
      return newPage;
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Blog Posts</h1>
      <div className="mb-4 d-flex justify-content-start">
        <button
          className="btn btn-primary"
          onClick={handleHome}
          disabled={loading || isHome}
        >
          {isHome ? 'Home' : 'Go Back to Home'}
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="row">
            {posts.map((post, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <BlogPostItem post={post} />
              </div>
            ))}
          </div>
          <div className="mb-4 d-flex justify-content-end">
            <button
              className="btn btn-primary mr-2"
              onClick={handlePrevious}
              disabled={loading || page === 1}
            >
              Previous
            </button>&nbsp;&nbsp;
            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={loading || page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostList;
