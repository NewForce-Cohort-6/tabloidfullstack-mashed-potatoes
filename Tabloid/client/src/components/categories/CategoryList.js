import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from './Category';
import { getAllCategories } from "../../Managers/CategoryManager";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const localUser = localStorage.getItem("userProfile")
  const userObject = JSON.parse(localUser)

  const getCategories = () => {
    getAllCategories().then(allCategories => setCategories(allCategories));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
    <h1>Categories</h1>
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {categories?.map((category) => (
            <>
              <Category key={category.id} category={category} />
            </>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default CategoryList;