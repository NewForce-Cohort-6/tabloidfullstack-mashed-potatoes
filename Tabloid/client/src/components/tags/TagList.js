import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Tag from "./Tag";
import { getAllTags, getById } from "./TagManager";

const TagList = (tag) => {
    const [tags, setTags] = useState([]);

   
    const navigate = useNavigate();

    const getTags = () => {
        getAllTags().then( all => setTags(all))
    };
    useEffect(() => {
        getTags();
    }, []);

    const handleDeleteClick = (id) => {
        getById(id).then((e) => {navigate(`/deleteTag/${id}`)})
    }
    
    return (
      <div className="container">
        <div className="row justify-content-center" style={{display: 'flex', flexDirection: 'column'}}>
          <h4 style={{marginTop: '20px'}}>Tags</h4>
          <h5 style={{ marginRight: '15px' }}>{tag.name}</h5>
          <button onClick={(e) => {
            navigate('/createTag')
          }} style={{marginTop: '15px', width: '120px'}}
          >New Tag</button>
            <div className="cards-column">
                {tags.map((t) => (
                  <div style={{display: 'flex'}}>
                    <Tag key={t.id} tag={t} />
                    <button onClick={(e) => {
                      handleDeleteClick(t.id)
                    }} style={{width: '60px', height: '30px', margin: '5px'}}>Delete</button>
                    {/* <button style={{width: '43px', height: '30px', margin: '5px'}}> Edit </button> */}
                    </div>
                ))}
            
            </div>
      </div>
    </div>
    )
}

export default TagList;

