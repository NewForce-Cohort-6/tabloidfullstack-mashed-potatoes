import React, { useState } from "react";
import { addTag } from "./TagManager";
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

        addTag(newCategory).then((p) => {
         navigate("/Category");
});
    }

    return (
        <div style={{margin: '50px'}}>
        <h1 style={{marginBottom: '25px'}}>Create Category</h1>
        
        <fieldset>
            <input
             style={{marginBottom: '10px'}}
              type="text"
              placeholder="Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </fieldset>
          
          <button onClick={saveCategory}>Save</button>
    
        </div>)
}

export default CategoryForm;