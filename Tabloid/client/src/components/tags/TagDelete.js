import React from "react";
import { deleteTag } from "./TagManager";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getById } from "./TagManager";

const TagDelete = () => {
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

    
    const Delete = () => {
        deleteTag(chosenTag.id).then((e) => {
            navigate('/tag')
        })
    }
    const Cancel = () => {
        navigate('/tag')
    }

    return (
        <div style={{display:'flex', flexDirection: 'column', letterSpacing: '.5px', alignItems: 'center', margin: '45px', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{marginBottom: '45px'}}>Are you sure you wish to delete the tag name?</h5>
            <div style={{display: 'flex'}}>
            <h5 style={{ marginRight: '30px' }}>{chosenTag.name}</h5>
            <button style={{marginRight: '10px'}} onClick={(e) => {
                Delete()
            }}>Delete</button>
            <button onClick={(e) => {
                Cancel()
            }}>Cancel</button>
            </div>
        </div>
    )
}

export default TagDelete;