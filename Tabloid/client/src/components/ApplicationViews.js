import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Hello from "./Hello";
import PostList from "./posts/PostList";
import MyPostList from "./posts/MyPostList";
import { PostDetails } from "./posts/PostDetails";
import Tag from "./tags/TagList";
import TagForm from "./tags/TagForm";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/tag" element={<Tag />} />
        <Route path="/createTag" element={<TagForm />} />
        <Route path="/posts" element={ <PostList /> } />
        <Route path="/myposts" element={ <MyPostList /> } />
        <Route path="/posts/:id" element={ <PostDetails /> } />
          {/* <Route path="/posts/add" element={ <PostForm /> } />
          <Route path="/users/:id" element={ <UserPosts /> } /> */}
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
          
      </Routes>
   );
 
}
