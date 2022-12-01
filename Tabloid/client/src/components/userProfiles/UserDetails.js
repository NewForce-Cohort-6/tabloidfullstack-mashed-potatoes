import React from "react";
import { getUserById } from "../../Managers/UserProfileManager";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const UserProfileDetails = () => {
    const [user, setUser] = useState({})
    const {id} = useParams();

    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)

    useEffect(
    () => {
        getUserById(id).then((u) => {setUser(u)})
    }, []);

    const uploadImage = (e) => {
        console.log(e.target.value);
    }

    if (!user){
        return null;
    }

    return (
        <>
        <div style={{width: '1300px', display: 'flex', justifyContent: 'left', marginLeft: '50px', marginTop: '50px', alignContent: 'center'}}>
            <div style={{borderBottom: '1px solid blue', width: '20%'}}>
            <h4>{user.displayName}</h4>
            <img src={user.imageLocation} />
            {userObject.id == user.id
                ? <> 
                    <form action="/action_page.php">
                        <input type="file" onChange={(e) => uploadImage(e)} id="myFile" name="filename"/>
                    </form>
                </>
                : ""
            }
            <h6 style={{marginTop: '15px'}}>Name: {user.firstName} {user.lastName}</h6>
            <h6>Email: {user.email}</h6>
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