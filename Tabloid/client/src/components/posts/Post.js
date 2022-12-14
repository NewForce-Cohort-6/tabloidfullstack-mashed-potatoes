import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";


export const Post = ({ post }) => {
  return (
    <Card className="m-4">
      <CardBody>
        <Link to={`/posts/${post.id}`}>
            <strong>{post.title}</strong>
        </Link>
        {/* <Link to={`/posts/${post.id}`}> */}
            <p>Author: {post.userProfile.displayName}</p>
        {/* </Link> */}
        <p>Category: {post.category.name}</p>
        
        {/* {post?.comments.length ? post?.comments?.map(comment => 
            <p key={comment?.id} className="text-left px-2">Comment: {comment?.message}</p>) : ""} */}
      
        </CardBody>

    </Card>
  );
};