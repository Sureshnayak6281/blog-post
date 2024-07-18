import React from 'react';

const BlogPostItem = ({ post }) => {
  return (
    <div className="card h-100" onClick={() => window.open(post.url, '_blank')}>
      <img src={post.urlToImage || 'https://i.pinimg.com/564x/4d/58/63/4d58637d83ea07686d64bd69fcca4918.jpg'} className="card-img-top" alt={post.title} style={{height: '200px', objectFit: 'cover'}} />
      <div className="card-body">
        <span className="badge bg-primary mb-2">{post.source.name}</span>
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text small text-muted-custom ">{new Date(post.publishedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default BlogPostItem;