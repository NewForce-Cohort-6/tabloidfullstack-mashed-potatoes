import React, { useState, useEffect, useContext } from "react";
import { Post } from './Post';
import { getUserPostsById } from "../modules/PostManager";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const localUser = localStorage.getItem("userProfile")
  const userObject = JSON.parse(localUser)

  const getPosts = () => {
    getUserPostsById(userObject.id).then(allPosts => setPosts(allPosts));
  };


  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {posts.map((post) => (
            <>
              <Post key={post.id} post={post} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;