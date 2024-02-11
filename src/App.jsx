import React, { useState, useEffect } from 'react';
import { fetchPosts, fetchUsers, fetchTags, fetchPostsByUserId } from './api/api';
import './App.css'

function App() {
  const [postsData, setPostsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [errorPosts, setErrorPosts] = useState('');
  const [errorUsers, setErrorUsers] = useState('');
  const [errorTags, setErrorTags] = useState('');

  //Initialize state for selected users
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userPostsData, setUserPostsData] = useState([]);
  const [errorUserPosts, setErrorUserPosts] = useState('');

  const resetSelection = () => setSelectedUserId(null);

  useEffect(() => {
    fetchPosts()
      .then(data => setPostsData(data.posts))
      .catch(error => {
        console.error('Error fetching posts:', error);
        setErrorPosts('Error fetching posts');
      });
  }, []);

  useEffect(() => {
    fetchUsers()
      .then(data => setUsersData(data.users))
      .catch(error => {
        console.error('Error fetching users:', error);
        setErrorUsers('Error fetching users');
      });
  }, []);

  useEffect(() => {
    fetchTags()
      .then(data => setTagsData(data.tags))
      .catch(error => {
        console.error('Error fetching tags:', error);
        setErrorTags('Error fetching tags');
      });
  }, []);

  //Use Effect for Selected Users
  useEffect(() => {
    if (selectedUserId) {
      fetchPostsByUserId(selectedUserId)
        .then(data => setUserPostsData(data))
        .catch(error => {
          console.error(`Error fetching posts for user ${selectedUserId}`, error);
          setErrorUserPosts(`Error fetching posts for user ${selectedUserId}`);
        });
    }
  }, [selectedUserId]);

  return (
    <div>
      <h1>Posts</h1>
      {selectedUserId ? (
        <>
          <button onClick={resetSelection}>Back to All Posts</button>
          {errorUserPosts ? (
            <p>Error Fetching User's Posts: {errorUserPosts}</p>
          ) : (
            userPostsData.map(post => (
              <div key={post.id} className='post'>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            ))
          )}
        </>
      ) : errorPosts ? (
        <p> Error Fetching Posts: {errorPosts}</p>
      ) : !postsData.length ? (
        <p>Loading posts...</p>
      ) : (
        <div>
          {postsData.map(post => (
            <div key={post.id} className='post'>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                setSelectedUserId(post.author.id);
              }}>Author: {post.author.name}</a>
              <ul>
                {post.tags && post.tags.map(tag => (
                  <li key={tag.id}>{tag.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div >
  );
}

export default App