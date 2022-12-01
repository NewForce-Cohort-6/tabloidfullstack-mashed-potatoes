import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import TagDetailList from "./TagDetailList";
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
    const handleEditClick = (id) => {
        getById(id).then((e) => {navigate(`/editTag/${id}`)})
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
                    <TagDetailList key={t.id} tag={t} />
                    <button onClick={(e) => {
                      handleDeleteClick(t.id)
                    }} style={{width: '60px', height: '30px', margin: '5px'}}>Delete</button>
                    <button onClick={(e) => {
                      handleEditClick(t.id)
                    }}style={{width: '43px', height: '30px', margin: '5px'}}> Edit </button>
                    </div>
                ))}
            
            </div>
        </div>
    </div>
    )
}

export default TagList;

