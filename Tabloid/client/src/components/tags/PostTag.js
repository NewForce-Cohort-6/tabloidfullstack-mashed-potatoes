import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const postTag = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const handleAddClick = (id) => {
        getById(id).then((e) => {navigate(`/posts/${id}`)})
    }

    return (
        <div className="container">
        <div className="row justify-content-center" style={{display: 'flex', flexDirection: 'column'}}>
          <h4 style={{marginTop: '20px'}}>Tags</h4>
          <h5 style={{ marginRight: '15px' }}>{tag.name}</h5>
          
            <div className="cards-column">
                {tags.map((t) => (
                  <div style={{display: 'flex'}}>
                    <Tag key={t.id} tag={t} />
                    <button onClick={(e) => {
                      handleAddClick(t.id)
                    }} style={{width: '60px', height: '30px', margin: '5px'}}>Add</button>
                    
                    </div>
                ))}
            
            </div>
        </div>
    </div>

    );
}
export default postTag;