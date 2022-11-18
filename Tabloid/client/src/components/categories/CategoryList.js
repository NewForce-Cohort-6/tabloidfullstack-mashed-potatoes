import React, { useState, useEffect, useContext } from "react";
import { Category } from './Category';
import { getAllCategories } from "../../Managers/CategoryManager";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

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