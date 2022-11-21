import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../Managers/CategoryManager";
import { addPost } from "../../Managers/PostManager";

export const PostForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [post, update] = useState({
        Title: "",
        Caption: "",
        ImageUrl: ""
    })

    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories().then(setCategories);
    }, []);

    const navigate = useNavigate()

    const localUser = localStorage.getItem("gifterUser")
    const userObject = JSON.parse(localUser)

    //let categoryHtml = ""
    //document.getElementById("categories"). innerHTML = categoryHtml;


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        // TODO: Create the object to be saved to the API
        const newPost = {
            Title: post.Title,
            Content: post.Content,
            ImageLocation: post.ImageLocation,
            UserProfileId: userObject.id,
            CategoryId: post.CategoryId,
            PublishDateTime: post.PublishDateTime
        }

        addPost(newPost).then((p) => {
            // Navigate the user back to the home route
            navigate(`/posts/${newPost.id}`);
        })
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
                        value={post.Title}
                        onChange={(changeEvent) => {
                            const copy = {...post}
                            copy.Title = changeEvent.target.value
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
                        value={post.Content}
                        onChange={(changeEvent) => {
                            const copy = {...post}
                            copy.Content = changeEvent.target.value
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
                        value={post.ImageLocation}
                        onChange={(changeEvent) => {
                            const copy = {...post}
                            copy.ImageLocation = changeEvent.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>   
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select required className="form-control" 
                            value={post.CategoryId} 
                            onChange={(changeEvent) => {
                                const copy = {...post}
                                copy.CategoryId = changeEvent.target.value
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
                            value={post.PublishDateTime} 
                            onChange={(changeEvent) => {
                                const copy = {...post}
                                copy.PublishDateTime = changeEvent.target.value
                                update(copy)
                            }}/>
                </div>         
            </fieldset>
            <button onClick={(clickEvent) => {handleSaveButtonClick(clickEvent)}} className="btn btn-primary">
                Publish Post
            </button>
        </form>
    )
}

export default PostForm;