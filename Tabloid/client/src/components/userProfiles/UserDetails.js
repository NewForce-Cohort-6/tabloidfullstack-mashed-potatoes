import React from "react";
import { getUserById } from "../../Managers/UserProfileManager";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const UserProfileDetails = () => {
    const [user, setUser] = useState({})
    const {id} = useParams();

    useEffect(
    () => {
        getUserById(id).then((u) => {setUser(u)})
    }, []);

    if (!user){
        return null;
    }
console.log(user)

    return (
        <>
        <div style={{width: '1190px', display: 'flex', justifyContent: 'left', marginLeft: '50px', marginTop: '50px', alignContent: 'center'}}>
            <div style={{borderBottom: '1px solid blue', width: '20%'}}>
            <h4>{user.displayName}</h4>
            <img src={user.imageLocation} />
            <h6 style={{marginTop: '15px'}}>Name: {user.firstName} {user.lastName}</h6>
            <p>UserType: {user?.userType?.name}
            <br></br>
            User Since: {user.createDateTime}</p>
        </div>
        
        </div>
        <div style={{marginLeft: '50px'}}>
         <Link to="/users">Go Back</Link>
         </div>
         </>
    )
}

export default UserProfileDetails;