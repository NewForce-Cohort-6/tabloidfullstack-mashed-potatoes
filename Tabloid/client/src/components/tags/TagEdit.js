import React from "react";
import { editTag } from "./TagManager";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getById } from "./TagManager";

const TagEdit = () => {
    const [chosenTag, setChosenTag] = useState({});

    const navigate = useNavigate();
    const {id} = useParams();


    useEffect(
    () => {
        getById(id).then((c) => {setChosenTag(c)}).then(console.log(chosenTag))
        
    },
    []
    )

    console.log(chosenTag)

    
    const Edit = () => {
        const newTag = {
            name: chosenTag.name,
            id: chosenTag.id
        }
        console.log(newTag)
        editTag(newTag).then((e) => {
            navigate('/tag')
        })
    }
    const Cancel = () => {
        navigate('/tag')
    }

    return (
        <div style={{display:'flex', flexDirection: 'column', letterSpacing: '.5px', alignItems: 'center', margin: '45px', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{marginBottom: '45px'}}>Edit Tag Name</h5>
            <div style={{display: 'flex'}}>
            <fieldset>
            <input
             style={{marginRight: '10px'}}
              type="text"
              placeholder={chosenTag.name}
              onChange={(e) => {
                const copy = {...chosenTag}
                copy.name = e.target.value
                setChosenTag(copy);}
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

export default TagEdit;