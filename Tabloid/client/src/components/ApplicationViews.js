import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Hello from "./Hello";
import Login from "./Login";
import Register from "./Register";
import PostList from "./PostList";


export default function ApplicationViews() {

  

 return(

      <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/posts" element={ <PostList /> } />
          {/* <Route path="/posts/add" element={ <PostForm /> } />
          <Route path="/posts/:id" element={ <PostDetails /> } />
          <Route path="/users/:id" element={ <UserPosts /> } /> */}
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Routes>
   );
 
}
