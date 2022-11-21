import React from 'react';

const baseUrl = '/api/Category';

export const getAllCategories = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};
export const GetById = (id) => {  //http GET by id parameter 
    return fetch(`/api/category/GetAllCategories/${id}`)
        .then((res) => res.json());
};
