import React from "react";

const UserProfile = ({user}) => {
    return (
        <div style={{borderBottom: '2px solid blue', width: '20%'}}>
            <h5>{user.displayName}</h5>
            <h6>User Name: {user.firstName} {user.lastName}</h6>
            <h6>UserType: {user.userType.name}</h6>
        </div>
    )
}

export default UserProfile;