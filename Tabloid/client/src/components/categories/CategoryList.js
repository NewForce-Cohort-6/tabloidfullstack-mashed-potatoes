import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Category from './Category';
import { getAllCategories, getById } from "../../Managers/CategoryManager";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    const getCategories = () => {
        getAllCategories().then(allCategories => setCategories(allCategories));
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleDeleteClick = (id) => {
        getById(id).then((c) => { navigate(`/deleteCategory/${id}`)})
    }

    return (
        <div className="container">
            <div className="row justify-content-center" style={{ display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ marginTop: '20px' }}>Categories</h4>
                <h5 style={{ marginRight: '15px' }}>{categories.name}</h5>
                <button onClick={(c) => {
                    navigate('/createCategory')
                }} style={{ marginTop: '15px', width: '120px' }}
                >New Category</button>
                <div className="cards-column">
                    {categories?.map((category) => (
                        <div style={{ display: 'flex' }}>
                            <Category key={category.id} category={category} />
                            <button onClick={(c) => {
                                handleDeleteClick(category.id)
                            }} style={{ width: '60px', height: '30px', margin: '5px' }}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryList;