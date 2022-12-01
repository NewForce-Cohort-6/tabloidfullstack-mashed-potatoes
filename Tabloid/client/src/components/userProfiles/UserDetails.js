import React from "react";
import { getUserById, updateUser } from "../../Managers/UserProfileManager";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const UserProfileDetails = () => {
    const [user, setUser] = useState({})
    const [image, setImage] = useState("")
    const {id} = useParams();
    const navigate = useNavigate();

    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)

    useEffect(
    () => {
        getUserById(id).then((u) => {setUser(u)})
    }, []);

    const uploadImage = (image) => {
        console.log(image.files[0].name);

        const formData = new FormData();
        formData.append("image", image.files[0], image.files[0].name);
        console.log(formData);
        console.log(formData.getAll("image"));

        const userProfile = {
            id: user.id,
            FirstName: user.firstName, 
            LastName: user.lastName, 
            DisplayName: user.displayName, 
            Email: user.email,
            CreateDateTime: user.createDateTime, 
            ImageLocation: image.files[0].name, 
            UserTypeId: user.userTypeId
        }

        updateUser(userProfile)
            .then(() => {
                getUserById(id).then(setUser)
                document.getElementById('myFile').value = ""; //reset upload image form
            })
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
                        <input type="file" id="myFile" onChange={(e) => setImage(e.target)} name="filename"/>
                        <button type="button" onClick={() => uploadImage(image)}>Upload</button>
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