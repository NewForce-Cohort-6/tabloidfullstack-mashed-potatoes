import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getById, getAllTags, addPostTag } from "./TagManager";
import Tag from "./Tag";

const PostTag = (tag) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState({});

    useEffect(
        () => {
            getById(id).then((c) => {setNewTag(c)}).then(console.log(newTag))
            
        },
        []
        )
    
        console.log(newTag)

    const addTags = () => {
        const newChosenTag = {
            name: newTag.name,
            id: newTag.id
        }
        console.log(newChosenTag)
        addPostTag(newChosenTag).then((e) => {
            navigate('/posts/${id}')
        })
    }

    // const handleAddClick = (id) => {
    //     getById(id).then((e) => {navigate(`/posts/${id}`)})
    // }
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
                      addTags(t.id)
                    }} style={{width: '60px', height: '30px', margin: '5px'}}>Add</button>
                    
                    </div>
                ))}
            
            </div>
        </div>
    </div>

    );
}
export default PostTag;