import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAllTags, GetAllPostTags, addPostTag } from "./TagManager";
import Tag from "./Tag";
import { getPost } from "../../Managers/PostManager";
import { TagButton } from "./Tag";

const PostTag = (tag) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [postTags, setPostTags] = useState([]);
    const [post, setPost] = useState([]);

    useEffect(
        () => {
            GetAllPostTags().then((pt) => {setPostTags(pt)})
        },
        []
    )
    const getAllPosts = () => {
        return fetch(`https://localhost:5001/api/post`)
        .then((res) => res.json())
        .then(setPost)
    };
    useEffect(() => {
        getAllPosts();
    }, []);

        // const getPost = (id) => {
        //     return fetch(`https://localhost:5001/api/post/${id}`)
        //       .then((res) => res.json())
        //       .then(setPost);
        //   };
        // const savePostTag = (tag, id) => {
        //     const newChosenTag = {
        //         postId: id,
        //         tagId: tag.id
        //     };
        //     addPostTag(newChosenTag).then((t) => {
        //         navigate(`/posts/${id}`)
                
        //     })

        //     return fetch(`https://localhost:5001/api/PostTag/${id}`, {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify(tag)
           
        //     }).then(getPost)
               
          
        //   };

   
    const getTags = () => {
        getAllTags().then( all => setTags(all))
    };
    useEffect(() => {
        getTags();
    }, []);

    return (
        <div className="container">
        <div className="row justify-content-center" style={{display: 'flex', flexDirection: 'column'}}>
          <h4 style={{marginTop: '20px'}}>Add Tags</h4>
          <h5 style={{ marginRight: '15px' }}>{tag.name}</h5>
          
            <div className="cards-column">
                {tags.map((t) => (
                  <div style={{display: 'flex'}}>
                    <Tag key={t.id} tag={t} />
                    <button onClick={(e) => {
                      TagButton(t.id)
                    }} style={{width: '60px', height: '30px', margin: '5px'}}>Add</button>
                    
                    </div>
                ))}
            
            </div>
        </div>
    </div>

    );
}
export default PostTag;