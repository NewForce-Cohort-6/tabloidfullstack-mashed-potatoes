import React from "react";
import { useNavigate,  } from "react-router-dom";
import { addPostTag } from "./TagManager";


export const TagAndButton = ({ post, tag}) => {

    
    const navigate = useNavigate();
    

    //Conditionally render an add button 
    //but also have button both set state and save the tag?
    const savePostTag = () => {
        // event.preventDefault()
        const newPostTag = {
            postId: post.id,
            tagId: tag.id
        }
        addPostTag(newPostTag).then((t) => {
          navigate(`/posts/${post.id}`)
            
        });
    }
    return (
      <tbody>
      <td>{tag.name}</td>
      <td>
          <button className="btn btn-primary" onClick={()=>{ savePostTag() }}>
              Add Tag
          </button>
      </td>
  </tbody>
  )
  };
export default TagAndButton;