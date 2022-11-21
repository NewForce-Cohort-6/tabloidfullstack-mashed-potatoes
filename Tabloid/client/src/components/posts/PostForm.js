import { useState } from "react"
import { addPost } from "../modules/PostManager";
import { useNavigate } from "react-router-dom";

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

    const [categories, setCategories] = useState({})

    useEffect(() => {
        getAllCategories(id).then(setCategories);
    }, []);

    const navigate = useNavigate()

    const localUser = localStorage.getItem("gifterUser")
    const userObject = JSON.parse(localUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        // TODO: Create the object to be saved to the API
        const newPost = {
            Title: post.Title,
            Content: post.Content,
            ImageLocation: post.ImageLocation,
            UserProfileId: userObject.id,
            CategoryId: post.CategoryId
        }

        addPost(newPost).then((p) => {
            // Navigate the user back to the home route
            navigate("/");
        })
    }

    let categoryHtml = ""

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
                        placeholder="Short caption"
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
                        required autoFocus
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
                    <label htmlFor="category"></label>
                    <select className="form-control" 
                            value={post.CategoryId} 
                            onChange={(changeEvent) => {
                                const copy = {...post}
                                copy.CategoryId = changeEvent.target.value
                                update(copy)
                            }}>
                        <option value={0}>Category: </option>
                        {categories.forEach(c => {                            
                            categoryHtml += <option value="c.Id">c.Name</option>
                        }).join()}
                    </select>
                </div>         
            </fieldset>
            <button onClick={(clickEvent) => {handleSaveButtonClick(clickEvent)}} className="btn btn-primary">
                Publish Post
            </button>
        </form>
    )
}

export default PostForm;