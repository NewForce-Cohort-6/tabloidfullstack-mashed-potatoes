import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPost, editPost } from "../../Managers/PostManager";
import { getAllCategories } from "../../Managers/CategoryManager";


const PostEdit = () => {
    const [post, update] = useState({
        title: "",
        content: "",
        imageLocation: ""
    });

    const navigate = useNavigate();
    const { id } = useParams();  
    
    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)

    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories().then(setCategories);
    }, []);

    useEffect(() => {
        getPost(id).then(update)        
    }, [])
    

    //one step behind issue - inconsistently has updated data after navigate
    //issue with asyncronous behavior
    function Edit() {
        const editedPost = {
            id: post.id,
            title: post.title,
            content: post.content,
            imageLocation: post.imageLocation,
            userProfileId: userObject.id,
            categoryId: post.categoryId,
            publishDateTime: post.publishDateTime
        }

        editPost(editedPost);
        navigate(`/posts/${editedPost.id}`);        
    }

    const Cancel = () => {
        navigate(`/Posts/${id}`)
    }

    return (
        <form className="postForm">
            <h2 className="postForm__Title">New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Title">Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Post title"
                        value={post.title}
                        onChange={(changeEvent) => {
                            const copy = {...post}
                            copy.title = changeEvent.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Content">Content:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Post content"
                        value={post.content}
                        onChange={(changeEvent) => {
                            const copy = {...post}
                            copy.content = changeEvent.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="ImageLocation">Header Image URL:</label>
                    <input
                        autoFocus
                        type="text"
                        className="form-control"
                        placeholder="www.example.com"
                        value={post.imageLocation}
                        onChange={(changeEvent) => {
                            const copy = {...post}
                            copy.imageLocation = changeEvent.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>   
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select required className="form-control" 
                            value={post.categoryId} 
                            onChange={(changeEvent) => {
                                const copy = {...post}
                                copy.categoryId = changeEvent.target.value
                                update(copy)
                            }}>
                        <option value="0">Choose a category</option>
                        {categories?.map(c => <option value={c.id}>{c.name}</option>)}
                    </select>
                </div>         
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="publishDateTime">Publish Date</label>
                    <input className="form-control" 
                            type="date"
                            value={post.publishDateTime} 
                            onChange={(changeEvent) => {
                                const copy = {...post}
                                copy.publishDateTime = changeEvent.target.value
                                update(copy)
                            }}/>
                </div>         
            </fieldset>
            
            <button className="btn btn-primary" style={{marginRight: '10px'}} onClick={ e => Edit() }>Edit</button>
            <button onClick={ e => Cancel() }>Cancel</button>
        </form>
    )
}

export default PostEdit;