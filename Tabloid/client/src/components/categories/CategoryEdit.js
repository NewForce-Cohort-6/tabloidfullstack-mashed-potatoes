import React from "react";
import { editCategory, getById } from "../../Managers/CategoryManager";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CategoryEdit = () => {
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

    
    const Edit = () => {
        const newCategory = {
            name: chosenCategory.name,
            id: chosenCategory.id
        }
        console.log(newCategory)
        editCategory(newCategory).then((e) => {
            navigate('/categories')
        })
    }
    const Cancel = () => {
        navigate('/categories')
    }

    return (
        <div style={{display:'flex', flexDirection: 'column', letterSpacing: '.5px', alignItems: 'center', margin: '45px', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{marginBottom: '45px'}}>Edit Category Name</h5>
            <div style={{display: 'flex'}}>
            <fieldset>
            <input
             style={{marginRight: '10px'}}
              type="text"
              placeholder={chosenCategory.name}
              onChange={(e) => {
                const copy = {...chosenCategory}
                copy.name = e.target.value
                setChosenCategory(copy);}
              }
            />
          </fieldset>
            <button style={{marginRight: '10px'}} onClick={(e) => {
                Edit()
            }}>Save</button>
            <button onClick={(e) => {
                Cancel()
            }}>Cancel</button>
            </div>
        </div>
    )
}

export default CategoryEdit;