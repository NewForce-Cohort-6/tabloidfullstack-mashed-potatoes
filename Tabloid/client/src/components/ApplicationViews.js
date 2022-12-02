import React from "react";
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
import PostForm from "./posts/PostForm";
import CategoryForm from "./categories/CategoryForm";
import PostTag from "./tags/PostTag";
import PostDelete from "./posts/DeletePost";
import CategoryDelete from "./categories/CategoryDelete";
import CategoryEdit from "./categories/CategoryEdit";
import UserProfileDetails from "./userProfiles/UserDetails";
import PostEdit from "./posts/EditPost";
import { PostComments } from "./comments/PostComments";
import { AddComment } from "./comments/AddComment";



export default function ApplicationViews() {

  return (
    <Routes>
 
      <Route path="/" element={<Hello />} />
      <Route path="/tag" element={<Tag />} />
      <Route path="/createTag" element={<TagForm />} />
      <Route path="/deleteTag/:id" element={<TagDelete />} />
      <Route path="/editTag/:id" element={<TagEdit />} />
      <Route path="/users" element={<UserProfileList />} />
      <Route path="/users/:id" element={<UserProfileDetails />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/myposts" element={<MyPostList />} />
      <Route path="/createPost" element={<PostForm />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/deletePost/:id" element={<PostDelete />} />
      <Route path="/editPost/:id" element={ <PostEdit /> } /> 
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/createCategory" element={<CategoryForm />} />
      <Route path="/deleteCategory/:id" element={<CategoryDelete />} />
      <Route path="/editCategory/:id" element={<CategoryEdit />} />
      <Route path="/myposts/:id/comments" element={<PostComments isMy={true} />} />
      <Route path="/posts/:id/comments" element={<PostComments isMy={false} />} />
      <Route path="/addtag/:id" element={<PostTag />} />
      <Route path ="/myposts/:id/addComment" element={<AddComment isMy={true}/>} />
      <Route path ="/posts/:id/addComment" element={<AddComment isMy={false}/>} />
      <Route path="/addtag" element={<PostTag />} />
      <Route path="*" element={<p>Whoops, nothing here...</p>} />

    </Routes>
  );
}
