import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardImg, CardBody } from "reactstrap";
import CardLink from "reactstrap/lib/CardLink";
import { getPost } from "../../Managers/PostManager";
import { addSubscription, getAllSubscriptions, unSubscribe } from "../../Managers/SubscriptionManager";
import { getAllTags } from "../tags/TagManager";



export const PostDetails = ({ isMy }) => {
    const [post, setPost] = useState("");
    const [subscriptions, setSubscriptions] = useState([]);
    const [tag, setTag] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const [subscribed, setSubscribed] = useState(false)
    const [foundSubscription, setFoundSubscription] = useState("")

    //all post image links are broken, so need to replace them all with a default image
    const handleBrokenImage = (image) => {
        const defaultImage = "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg";
        image.target.src = defaultImage;
    };

    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)
    
    //set all state variables inside the useEffect instead of inside this component's methods    


    useEffect(() => {
        getPost(id)
            .then(p => setPost(p));

        getAllTags(id).then(setTag);

        getAllSubscriptions()
            .then(setSubscriptions)
            .then(() => {
                for (const s of subscriptions) {
                    if (s.subscriberUserProfileId == userObject.id && s.providerUserProfileId == post.userProfileId) {
                        setSubscribed(true);
                        setFoundSubscription(s);
                    }                    
                        setSubscribed(true)
                    }
                }
            }).then(() => {
                if(foundSubscription.endDateTime != "0001-01-01T00:00:00") {
                    setSubscribed(false);
                }
            });
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

    const Unsubscribe = (e) => {
        e.preventDefault();
                   
        const subscription = {
            id: foundSubscription.id,
            SubscriberUserProfileId: userObject.id,
            ProviderUserProfileId: post.userProfileId,
            BeginDateTime: foundSubscription.beginDateTime
        }

        unSubscribe(subscription)
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
                    ? <>
                        <span>  |  </span><button onClick={ e => Subscribe(e) }>Subscribe</button>
                    </>
                    : ""                
                }
                {subscribed && foundSubscription?.endDateTime == "0001-01-01T00:00:00" /*make sure the subscription has not already ended*/
                    ? <>
                        <span>  | Subscribed ✅ | </span><span><button onClick={ e => Unsubscribe(e) }>Unsubscribe</button></span>
                    </>
                    : ""
                }
                    {!subscribed && post.userProfileId != userObject.id
                        ? <button onClick={e => Subscribe(e)}>Subscribe</button>
                        : ""
                    }
                    {subscribed
                        ? <span>  | Subscribed ✅</span>
                        : ""
                    }
                </p>
            {/* </Link> */}
            <p>Published: {post.publishDateTime.substring(0, 10)}</p>
            <div>
                Tags: {post.tags.map((t) => <p>{t.name}</p>)} 
            </div>
            <button onClick={(e) => {
            navigate(`/addTag/${id}`)
          }} style={{marginTop: '15px', width: '120px'}}
          >Manage Tags</button>
            <CardImg top src={post.imageLocation} alt={post.title} onError={handleBrokenImage} />
            <p>{post.content}</p>
                {/* </Link> */}
                <p>Published: {post.publishDateTime.substring(0, 10)}</p>
                <div>
                    Tags: {post.tags.map((t) => <p>{t.name}</p>)}
                </div>
                <button onClick={(e) => {
                    navigate('/addTag')
                }} style={{ marginTop: '15px', width: '120px' }}
                >Manage Tags</button>
                <CardImg top src={post.imageLocation} alt={post.title} onError={handleBrokenImage} />
                <p>{post.content}</p>

                {/* making sure a user only has access to the delete button if they were the one who created it */}
                {userObject.id == post.userProfileId
                    ? <>
                        <button onClick={e => navigate(`/deletePost/${id}`)}>Delete</button>
                        <button onClick={e => navigate(`/editPost/${id}`)}>Edit</button>
                    </>
                    : ""
                }
                {/* {post?.comments?.map(comment => 
                <p key={comment?.id} className="text-left px-2">Comment: {comment?.content}</p>)} */}

            </CardBody>
            <CardBody>
                {isMy ?
                    <CardLink href="/posts">
                        Go back to list
                    </CardLink>
                    :
                    <CardLink href="/myposts">
                        Go back to list
                    </CardLink>
                }
                {isMy ?
                    <CardLink href={`/posts/${id}/comments`}>
                        View Comments
                    </CardLink>
                    :
                    <CardLink href={`/myposts/${id}/comments`}>
                        View Comments
                    </CardLink>
                }
                {isMy ?
                    <CardLink href={`/posts/${id}/addComment`}>
                        Add Comment
                    </CardLink>
                    :
                    <CardLink href={`/myposts/${id}/addComment`}>
                        Add Comment
                    </CardLink>
                }
            </CardBody>
        </Card>
    );
};