import React from "react";
// import { deleteCategory } from "./CategoryManager";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getById, deleteCategory } from "../../Managers/CategoryManager";

const CategoryDelete = () => {
    const [chosenCategory, setChosenCategory] = useState({});

    const navigate = useNavigate();
    const {id} = useParams();


    useEffect(
    () => {
        getById(id).then((c) => {setChosenCategory(c)}).then(console.log(chosenCategory))
        
    },
    []
    )

    console.log(chosenCategory)

    
    const Delete = () => {
        deleteCategory(chosenCategory.id).then((c) => {
            navigate('/categories')
        })
    }
    const Cancel = () => {
        navigate('/categories')
    }

    return (
        <div style={{display:'flex', flexDirection: 'column', letterSpacing: '.5px', alignItems: 'center', margin: '45px', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{marginBottom: '45px'}}>Are you sure you want to delete this category?</h5>
            <div style={{display: 'flex'}}>
            <h5 style={{ marginRight: '30px' }}>{chosenCategory.name}</h5>
            <button style={{marginRight: '10px'}} onClick={(c) => {
                Delete()
            }}>Delete</button>
            <button onClick={(c) => {
                Cancel()
            }}>Cancel</button>
            </div>
        </div>
    )
}

export default CategoryDelete;