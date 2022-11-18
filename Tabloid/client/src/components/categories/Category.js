import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Category = ({ category }) => {
    return (
        <Card className="m-4">
            <CardBody>
                <Link to={`/categories/${category.id}`}>
                    <strong>{category.name}</strong>
                    <p>Category: {category.name}</p>
                </Link>
            </CardBody>
        </Card>
    );
};