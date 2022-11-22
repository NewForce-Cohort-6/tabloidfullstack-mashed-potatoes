import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Category = ({ category }) => {
    return (
        <div style={{display:'flex', letterSpacing: '.5px', alignItems: 'center', margin: '15px', borderBottom: '1px solid blue', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{ marginRight: '15px' }}>{category.name}</h5>
        </div>
    );
};