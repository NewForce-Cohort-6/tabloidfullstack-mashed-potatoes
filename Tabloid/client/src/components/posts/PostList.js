import React, { useState, useEffect, useContext } from "react";
import { Post } from './Post';
import { getAllPosts } from "../../Managers/PostManager";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const localUser = localStorage.getItem("userProfile")
  const userObject = JSON.parse(localUser)

  const getPosts = () => {
    getAllPosts().then(allPosts => setPosts(allPosts));
  };


  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
    <Link to={`/createPost`}>
      New Post
    </Link>
    <h1>All Posts</h1>
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {posts?.map((post) => (
            <>
              <Post key={post.id} post={post} />
            </>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default PostList;