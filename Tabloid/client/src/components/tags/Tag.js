import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPostTag } from "./TagManager";


export const TagAndButton = ({ post, tag}) => {

    // const [postTag, setPostTag] = useState({
    //     postId: id,
    //     tagId: tag.id
    // });

    // useEffect(() => {
    //     getAllTags
    // }, [])

    const navigate = useNavigate();
    // const { id } = useParams();

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