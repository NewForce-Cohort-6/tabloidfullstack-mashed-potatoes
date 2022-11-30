import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addComment } from "../../Managers/CommentManager";
import { getCurrentUser } from "../../Managers/UserProfileManager";
import { CardLink } from "reactstrap";

export const AddComment = ({isMy}) => {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const { id } = useParams();
    
    //initial state
    const [newComment, setNewComment] = useState({
        author: "",
        creationDate: "",
        subject: "",
        content:"",
        userProfileId: currentUser.id,
        postId: id,
    })

    
    const handleSaveNewComment = (event) => {
        event.preventDefault()
        const newCommentToSendToApi = {
            author: newComment.author,
            creationDate: newComment.creationDate,
            subject: newComment.subject,
            content: newComment.content,
            userProfileId: currentUser.id,
            postId: id
        }
        addComment(newCommentToSendToApi).then((t) => {
            
            {isMy ? 
                navigate(`/my-posts/${id}/comments`)
                
                :navigate(`/posts/${id}/comments`)
            };
        });
    }

    const saveNewComment = (evt) => {
        const copy = {...newComment}
        copy[evt.target.id] = evt.target.value
        setNewComment(copy)
    }

    return (
        <>
            <form className="m-5" onSubmit={handleSaveNewComment}>
                <div className="col-md-3">
                    <label htmlFor="tag">Add New Comment</label>
                    <input type="text" placeholder="Add Author" onChange={saveNewComment} className="form-control" id="author" />
                    <input type="text" placeholder="Add Creation Date"  onChange={saveNewComment} className="form-control" id="creationDate" />
                    <input type="text" placeholder="Add Subject" onChange={saveNewComment} className="form-control" id="subject" />
                    <input type="text" placeholder="Add Content"  onChange={saveNewComment} className="form-control" id="content" />
                <button type="submit" className="btn btn-primary mt-2" >Save</button>
                {isMy ?
                        <CardLink href={`/my-posts/${id}`}>
                            Back To Post
                        </CardLink>
                        :
                        <CardLink href={`/posts/${id}`}>
                            Back To Post
                        </CardLink>
                    }
                </div>
            </form>
        </>
    );
}
