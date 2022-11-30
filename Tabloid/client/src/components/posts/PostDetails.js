import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardImg, CardBody } from "reactstrap";
import { getPost } from "../../Managers/PostManager";
import { addSubscription, getAllSubscriptions } from "../../Managers/SubscriptionManager";


export const PostDetails = () => {
    const [post, setPost] = useState("");
    const [subscriptions, setSubscriptions] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [subscribed, setSubscribed] = useState(false)

    //all post image links are broken, so need to replace them all with a default image
    const handleBrokenImage = (image) => {
        const defaultImage = "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg";
        image.target.src = defaultImage;
    };

    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)
    
    useEffect(() => {
        getPost(id)
            .then(p => setPost(p));
        
        getAllSubscriptions()
            .then(setSubscriptions)
            .then(() => {
                for (const s of subscriptions) {
                    if (s.subscriberUserProfileId == userObject.id && s.providerUserProfileId == post.userProfileId) {
                        setSubscribed(true)
                    }                    
                }
            });  

    }, [subscriptions]);
    

    const Subscribe = (e) => {
        e.preventDefault();

        const newSubscription = {
            SubscriberUserProfileId: userObject.id,
            ProviderUserProfileId: post.userProfileId
        }

        addSubscription(newSubscription)
            .then(() => setSubscribed(true));
    }
    
    if (!post) {
        return null;
    }

    return (
    <Card className="m-4">
        <CardBody>
            <strong>{post.title}</strong>
            {/* <Link to={`/posts/${post.id}`}> */}
                <p>Author: {post.userProfile.displayName}
                {!subscribed && post.userProfileId != userObject.id
                    ? <button onClick={ e => Subscribe(e) }>Subscribe</button>
                    : ""                
                }
                {subscribed
                    ? <span>  | Subscribed ✅</span>
                    : ""
                }
                </p>
            {/* </Link> */}
            <p>Published: {post.publishDateTime.substring(0, 10)}</p>
            <CardImg top src={post.imageLocation} alt={post.title} onError={handleBrokenImage} />
            <p>{post.content}</p>

            {/* making sure a user only has access to the delete button if they were the one who created it */}
            {userObject.id == post.userProfileId 
                ? <>
                    <button onClick={ e => navigate(`/deletePost/${id}`) }>Delete</button>
                    <button onClick={ e => navigate(`/editPost/${id}`) }>Edit</button>
                  </>
                : ""
            }
            {/* {post?.comments.length ? post?.comments?.map(comment => 
                <p key={comment?.id} className="text-left px-2">Comment: {comment?.message}</p>) : ""} */}
        
        </CardBody>

    </Card>
    );
};