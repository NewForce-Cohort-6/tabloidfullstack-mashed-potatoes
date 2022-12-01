import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, CardLink, CardTitle, ListGroup, ListGroupItem } from "reactstrap";
import { getAllComments } from "../../Managers/CommentManager";
import { getPost } from "../../Managers/PostManager";
import { getCurrentUser } from "../../Managers/UserProfileManager";


export const PostComments = ({ isMy }) => {
    const currentUser = getCurrentUser();
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({});
    const { id } = useParams();

    const getComments = () => {
        getAllComments(id).then(comments => setComments(comments));
    };

    useEffect(() => {
        getPost(id).then(post => setPost(post));
        getComments();
    }, []);

    return (
        <div className="m-5">
            <h1>{post.title}</h1>
            {isMy ?
                <CardLink href={`/my-posts/${id}`}>
                    Go back to post
                </CardLink>
                :
                <CardLink href={`/posts/${id}`}>
                    Go back to post
                </CardLink>
            }
            <section>
                {
                    comments?.find(c => c.postId == id)
                        ? comments?.filter(c => c.postId == id).map((c) => (<>
                            <Card key={c.id}
                                style={{
                                    width: '18rem'
                                }}>
                                <CardBody>
                                    <CardTitle tag="h5">
                                        Comment
                                    </CardTitle>
                                </CardBody>
                                <ListGroup flush>
                                    <ListGroupItem>
                                        <h6>Subject:</h6> {c.subject}<br />
                                        <h6>Author:</h6> {c.userProfile?.displayName}
                                        <h6>User Creation Date:</h6> {c.createDateTimeString}<br />
                                        <h6>Content:</h6> {c.content}
                                    </ListGroupItem>
                                </ListGroup>

                                {/* {currentUser.id === c.userProfileId
                    ?<div>
                    <button className="btn btn-danger ml-3 mb-3" onClick={() => navigate(`/commentDelete/${c.id}`)}>Delete</button> 
                    <button className="btn btn-danger ml-3 mb-3" onClick={() => navigate(`/commentEdit/${c.id}`)}>Edit</button> 
                    </div>
                    :""  } */}

                            </Card> </>
                        ))
                        : <h4>"No Comments"</h4>
                }
            </section>
        </div>)
}