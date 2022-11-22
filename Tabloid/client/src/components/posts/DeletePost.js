import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPost, deletePost } from "../../Managers/PostManager";

const PostDelete = () => {
    const [chosenPost, setChosenPost] = useState({});

    const navigate = useNavigate();
    const { id } = useParams();    

    useEffect(() => {
        getPost(id).then((c) => {setChosenPost(c)})        
    }, [])
    
    const Delete = () => {
        deletePost(chosenPost.id).then((e) => {
            navigate(`/Posts`)
        })
    }

    const Cancel = () => {
        navigate(`/Posts:{id}`)
    }

    return (
        <div style={{display:'flex', flexDirection: 'column', letterSpacing: '.5px', alignItems: 'center', margin: '45px', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{marginBottom: '45px'}}>Are you sure you wish to delete this post?</h5>
            <div style={{display: 'flex'}}>
                <h5 style={{ marginRight: '30px' }}>{chosenPost.name}</h5>
                <button style={{marginRight: '10px'}} onClick={ e => Delete() }>Delete</button>
                <button onClick={ e => Cancel() }>Cancel</button>
            </div>
        </div>
    )
}

export default PostDelete;