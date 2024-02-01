import React, { useState, useEffect } from 'react';

const Blog = ({ username, onLogout }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // Fetch existing posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8008/blogs');

      if (!response.ok) {
        throw new Error(`Error fetching posts: ${response.statusText}`);
      }

      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Fetch posts error:', error);
    }
  };

  const handlePost = async () => {
    try {
      const response = await fetch('http://localhost:8008/blogs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, content: newPost }),
      });

      if (!response.ok) {
        throw new Error(`Error creating post: ${response.statusText}`);
      }

      // After successfully creating a post, fetch and update the posts
      fetchPosts();
      setNewPost('');
    } catch (error) {
      console.error('Create post error:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8008/blogs/delete/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting post: ${response.statusText}`);
      }

      // After successfully deleting a post, fetch and update the posts
      fetchPosts();
    } catch (error) {
      console.error('Delete post error:', error);
    }
  };

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <div>
        <textarea
          placeholder="Write a new post..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <button onClick={handlePost}>Post</button>
      </div>
      <div>
        <h3>Your Posts</h3>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.content}</p>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Blog;