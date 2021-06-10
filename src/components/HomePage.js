import React, { useState, useEffect } from 'react';
import PostList from './PostList/PostList';
import axios from 'axios';

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const promess = axios.get("http://localhost:4000/posts");
    promess.then((success) => setPosts(success.data))
    promess.catch((error) => console.log("Ocorreu um erro, tente novamente!"))
  }, []);

  return (
    <PostList name="Daily stories" posts={posts} />
  );
}
