import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Tag from "./Tag";
import { getAllTags } from "./TagManager";

const TagList = (tag) => {
    const [tags, setTags] = useState([]);

   
    const navigate = useNavigate();

    const getTags = () => {
        getAllTags().then( all => setTags(all))
    };
    useEffect(() => {
        getTags();
    }, []);

    
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
                
                {tags.map((c) => (
                    <Tag key={c.id} tag={c} />
                    ))}
        </div>
      </div>
    </div>
    )
}

export default TagList;

