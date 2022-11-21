import React, { useState } from "react";
import { addCategory } from "../../Managers/CategoryManager";
import { useNavigate } from "react-router-dom";


const CategoryForm = () => {
    //initialize state variables
    const [name, setName] = useState({
        name: ""
    })
    const navigate = useNavigate();


    const saveCategory = () => {
        const newCategory = {
            name: name,
        }

        addCategory(newCategory).then((p) => {
         navigate("/categories");
});
    }

    return (
        <div style={{margin: '50px'}}>
        
        
        <fieldset>
            <input
             style={{marginBottom: '10px'}}
              type="text"
              placeholder="Category"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </fieldset>
          
          <button onClick={saveCategory}>Save</button>
    
        </div>)
}

export default CategoryForm;