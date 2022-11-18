import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardImg, CardBody } from "reactstrap";
import { getPost } from "../../Managers/PostManager";


export const PostDetails = () => {
    const [post, setPost] = useState();
    const { id } = useParams();
    
    useEffect(() => {
        getPost(id).then(setPost);
    }, []);
    
    if (!post) {
        return null;
    }

    return (
    <Card className="m-4">
        <CardBody>
            <strong>{post.title}</strong>
            {/* <Link to={`/posts/${post.id}`}> */}
                <p>Author: {post.userProfile.displayName}</p>
            {/* </Link> */}
            <p>Published: {post.publicationDateTime}</p>
            <img src={post.imageLocation} alt={post.title}></img>
            <p>{post.content}</p>
            
            {/* {post?.comments.length ? post?.comments?.map(comment => 
                <p key={comment?.id} className="text-left px-2">Comment: {comment?.message}</p>) : ""} */}
        
        </CardBody>

    </Card>
    );
};