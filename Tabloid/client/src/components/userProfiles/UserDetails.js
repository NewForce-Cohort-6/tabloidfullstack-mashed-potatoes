import React from "react";
import { getUserById, updateUser } from "../../Managers/UserProfileManager";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const UserProfileDetails = () => {
    const [user, setUser] = useState({})
    const [image, setImage] = useState("")
    //const [errors, setErrors] = useState({})
    const {id} = useParams();
    const navigate = useNavigate();

    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)

    useEffect(
    () => {
        getUserById(id).then((u) => {setUser(u)})
    }, []);


    //#region    
    //for future reference - might try to do validation in capstone 
    //- reference image upload vid in capstone proposal 
    const validate = () => {
        let temp = {}
        temp.imageLocation = user.imageLocation == "" ? false : true;
        //setErrors(temp)
        return Object.values(temp).every(x => x==true);
    }

    //const applyErrorClass = field => ((field in errors && errors[field]==false)?' invalid-field':'')
    //#endregion


    const uploadImage = (image, e) => {
        //might end up needing prevent default here
        e.preventDefault()
        console.log(image.files[0].name);

        const formData = new FormData();
        /* formData.append("id", user.id);
        formData.append("firstName", user.firstName);
        formData.append("lastName", user.lastName);
        formData.append("displayName", user.displayName);
        formData.append("email", user.email);
        formData.append("createDateTime", user.createDateTime);
        formData.append("userTypeId", user.userTypeId); */
        formData.append("imageLocation", ""); // imageName
        formData.append("imageFile", image.files[0]);
        
        console.log(formData);
        console.log(formData.get("imageFile"));
        console.log(image.files[0]);

        const userProfile = {
            id: user.id,
            FirstName: user.firstName, 
            LastName: user.lastName, 
            DisplayName: user.displayName, 
            Email: user.email,
            CreateDateTime: user.createDateTime, 
            ImageLocation: "", 
            ImageFile: formData.get("imageFile"),
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
                        <input type="file" id="myFile" accept="image/*" onChange={(e) => setImage(e.target)} name="filename"/>
                        <button type="button" onClick={(e) => uploadImage(image, e)}>Upload</button>
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