import React from "react";

const baseUrl = '/api/post';

export const getAllPosts = () => {
  return fetch(baseUrl)
    .then((res) => res.json())
};

export const getAllPostsWithComments = () => {
  return fetch('/api/post/GetWithComments')
    .then((res) => res.json())
};

export const getPost = (id) => {
    return fetch(`/api/Post/${id}`)
      .then((res) => res.json());
};

export const getUserPostsById = (id) => {
  return fetch(`/api/post/getUserPostsById?id=${id}`)
    .then((res) => res.json());
}

export const addPost = (singlePost) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(singlePost)
  });
};

export const deletePost = (id) => {
  return fetch(`/api/Post/${id}`, {
      method: "DELETE"
    })
};

export const editPost = (post) => {
  return fetch(`/api/post/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
};