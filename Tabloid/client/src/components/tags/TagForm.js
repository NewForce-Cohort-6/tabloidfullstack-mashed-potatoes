import React, { useState } from "react";
import { addTag } from "./TagManager";
import { useNavigate } from "react-router-dom";


const TagForm = () => {
    //initialize state variables
    const [name, setName] = useState({
        name: ""
    })
    const navigate = useNavigate();


    const saveTag = () => {
        const newT = {
            name: name,
        }

        addTag(newT).then((p) => {
         navigate("/tag");
});
    }

    return (
        <div style={{margin: '50px'}}>
        <h1 style={{marginBottom: '25px'}}>Create Tag</h1>
        
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
          
          <button onClick={saveTag}>Save</button>
    
        </div>)
}

export default TagForm;