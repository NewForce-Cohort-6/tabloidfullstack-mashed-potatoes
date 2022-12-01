import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CardLink, Table } from "reactstrap";
import { getPost } from "../../Managers/PostManager";

import { getAllTags } from "./TagManager";
import { TagAndButton } from "../tags/Tag";

export const PostTags = () => {

    const [post, setPost] = useState({});
    const [tags, setTags] = useState([]);
    const { id } = useParams();

    

    const getTags = () => {
        getAllTags().then(allTags => setTags(allTags));
    };

    useEffect(() => {
        getTags();
        getPosts();
    }, []);

   
    const getPosts = () => {
        getPost(id).then(singlePost => setPost(singlePost));
      };
    
    
     

    return (
        <div className="m-5">
            <h1>{post.title}</h1>
            
                <CardLink href={`/posts/${id}`}>
                    Go back to post
                </CardLink>
            
            <div className="mx-5 mt-2 mb-5">
                <Table>
                    <thead>
                        <tr>
                            <th>
                                Tags
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* post?.tags?.length
                    ?post?.tags?.map((pt) => ) */}
                    {tags.map((tag) => (
                        <TagAndButton 
                        tag={tag}
                        //send other things I need to Tag.js
                        post={post}
                         />
                    ))}

                </Table>
            </div>
        </div>)
}
export default PostTags;