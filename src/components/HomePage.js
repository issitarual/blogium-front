import React, { useState, useEffect } from 'react';
import PostList from './PostList/PostList';
import axios from 'axios';

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const promess = axios.get("http://localhost:4000/posts");
    promess.then((response) => setPosts(response.data))
    promess.catch((error) => console.log("Deu erro!"))
  }, []);

  return (
    <PostList name="Daily stories" posts={posts} />
  );
}
