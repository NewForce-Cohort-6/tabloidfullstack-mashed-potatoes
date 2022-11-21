import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Hello from "./Hello";
import PostList from "./posts/PostList";
import MyPostList from "./posts/MyPostList";
import { PostDetails } from "./posts/PostDetails";
import Tag from "./tags/TagList";
import TagForm from "./tags/TagForm";
import TagDelete from "./tags/TagDelete";
import TagEdit from "./tags/TagEdit";
import UserProfileList from "./userProfiles/UserProfileList";
import CategoryList from "./categories/CategoryList";
import CategoryForm from "./categories/CategoryForm";
import CategoryDelete from "./categories/CategoryDelete";

export default function ApplicationViews() {

 return(
      <Routes>

        <Route path="/" element={<Hello />} />
        <Route path="/tag" element={<Tag />} />
        <Route path="/createTag" element={<TagForm />} />
        <Route path="/deleteTag/:id" element={<TagDelete />} />
        <Route path="/editTag/:id" element={<TagEdit />} />
        <Route path="/users" element={<UserProfileList />} />
        <Route path="/posts" element={ <PostList /> } />
        <Route path="/myposts" element={ <MyPostList /> } />
        <Route path="/posts/:id" element={ <PostDetails /> } />
        {/* <Route path="/posts/add" element={ <PostForm /> } />
        <Route path="/users/:id" element={ <UserPosts /> } /> */}
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/createCategory" element={<CategoryForm />} />
        <Route path="/deleteCategory/:id" element={<CategoryDelete />} />
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
          
      </Routes>
   );
 
}
