import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from './Category';
import { getAllCategories, getById, deleteCategory } from "../../Managers/CategoryManager";

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

    const handleDeleteClick = (id) => {
        getById(id).then((c) => { navigate(`/delete/${id}`) })
    }

    return (
        <>
            <h1>Categories</h1>
            <h1 style={{ marginBottom: '25px' }}>Create Category</h1>
            <button onClick={(c) => {
                navigate('/createCategory')
            }} style={{ marginTop: '15px', width: '120px' }}
            >New Category</button>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {categories?.map((category) => (
                            <>
                                <Category key={category.id} category={category} />
                            </>
                        ))}
                    </div>
                    <button onClick={(c) => {
                        handleDeleteClick(c.id)
                    }} style={{ width: '60px', height: '30px', margin: '5px' }}>Delete</button>

                </div>
            </div>
        </>
    );
};

export default CategoryList;