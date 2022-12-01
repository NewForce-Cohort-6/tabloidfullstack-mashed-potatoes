import React from "react";



export const TagDetailList = ({tag}) => {
   
    return (
        <div style={{display:'flex', letterSpacing: '.5px', alignItems: 'center', margin: '45px', borderBottom: '1px solid blue', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{ marginRight: '15px' }}>{tag.name}</h5>
            
        </div>
    )
  };
export default TagDetailList;