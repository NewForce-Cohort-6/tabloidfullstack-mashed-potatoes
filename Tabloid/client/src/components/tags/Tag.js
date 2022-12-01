import React from "react";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { getPost } from "../../Managers/PostManager";
import { addPostTag } from "./TagManager";




const Tag = ({tag}) => {

  // const {id} = useParams();
  const navigate = useNavigate();
    return (
        <div style={{display:'flex', letterSpacing: '.5px', alignItems: 'center', margin: '45px', borderBottom: '1px solid blue', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{ marginRight: '15px' }}>{tag.name}</h5>
            
        </div>
    )
}
export const TagButton = () => {
  const navigate = useNavigate();
const savePostTag = (tag, id) => {
  const newChosenTag = {
      postId: id,
      tagId: tag.id
  };
  addPostTag(newChosenTag).then((t) => {
      navigate(`/posts/${id}`)
      
  })

  return fetch(`https://localhost:5001/api/PostTag/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag)
 
  }).then(getPost)
     

};};

export default Tag;