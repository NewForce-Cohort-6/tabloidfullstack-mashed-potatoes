import React from 'react';

const baseUrl = '/api/Category';

export const getAllCategories = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};

export const getById = (id) => {  //http GET by id parameter 
    return fetch(`/api/category/GetAllCategories/${id}`)
        .then((res) => res.json());
};

export const addCategory = (category) => {
    return fetch(`https://localhost:5001/api/Category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      })
};

export const deleteCategory = (id) => {
    return fetch(`https://localhost:5001/api/Category/${id}`, {
      method: "DELETE"
    })
  }
