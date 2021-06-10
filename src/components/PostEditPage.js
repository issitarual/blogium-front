import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { useHistory, useParams } from 'react-router-dom';
import PostManipulation from './PostManipulation/PostManipulation';

export default function PostEditPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [content, setContent] = useState('');
  const [isSaveButtonDisabled, setSaveButtonDisable] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const promess = axios.get(`http://localhost:4000/posts/${postId}`)
    promess.then(success => {
    const post = success.data;
    const {title, coverUrl, content} = post;
    setPost(post);
    setTitle(title);
    setCoverUrl(coverUrl);
    setContent(content);
    })
    promess.catch(error => alert ("Ocorreu um erro, tente novemente!"))
  }, [postId]);

  function onPostSaveButtonClick() {
    const data = {
      "title": `${title}`,
      "content": `${content}`,
      "coverUrl": `${coverUrl}`
    }
    const req = axios.put(`http://localhost:4000/posts/${postId}`, data);
    req.then(success => history.push(`/posts/${postId}`));
    req.catch(error => alert("Ocoreu um erro, tente novamente."));
  }

  if (!post || !content) return <Spinner />;

  return (
    <PostManipulation
      title={title}
      onTitleChange={(newTitle) => setTitle(newTitle)}
      coverUrl={coverUrl}
      onCoverUrlChange={(newCoverUrl) => setCoverUrl(newCoverUrl)}
      content={content}
      onContentChange={(newContent) => setContent(newContent)}
      onPostSaveButtonClick={onPostSaveButtonClick}
      postId={postId}
    />
  );
}
