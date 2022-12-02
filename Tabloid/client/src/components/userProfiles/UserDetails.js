import React from "react";
import { getUserById, updateUser } from "../../Managers/UserProfileManager";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { UploadWidget } from "./UploadWidget";

const UserProfileDetails = () => {
    const [user, setUser] = useState({})
    const [image, setImage] = useState("")
    const [publicId, setPublicId] = useState("")
    //const [errors, setErrors] = useState({})
    const {id} = useParams();
    const navigate = useNavigate();

    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)

    
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

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

    //id is your public_id file in cloudinary
    const getImageAttachment = async (id) => {
        return await window.cloudinary.url(id, {
            flags: "attachment:imgname"
        })
    }

    const uploadImage = (image, e) => {
        //might end up needing prevent default here
        e.preventDefault()
        //console.log(image.files[0].name);

        const formData = new FormData();        
        formData.append("file", image.files[0]);
        formData.append("upload_preset", "a4ogqwyb");    


        const userProfile = {
            id: user.id,
            FirstName: user.firstName, 
            LastName: user.lastName, 
            DisplayName: user.displayName, 
            Email: user.email,
            CreateDateTime: user.createDateTime, 
            imageLocation: user.imageLocation, 
            UserTypeId: user.userTypeId
        }

        fetch("https://api.cloudinary.com/v1_1/dkndgz1ge/image/upload", {
            method: "POST",
            body: formData
        }).then(r => {return r.text()})
            .then((data) => {
                const dataObject = JSON.parse(data)
                console.log(dataObject)
                userProfile.imageLocation = dataObject.url
                let downloadString = userProfile.imageLocation.slice(0, 49) + "f_png/fl_attachment/"
                let public_id = userProfile.imageLocation.slice(49);
                setPublicId(`${downloadString + public_id}`);
                console.log(publicId)
            })
            .then(() => updateUser(userProfile))
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
            {/* <img src={user.imageLocation} /> */}
            <Image cloudName="dkndgz1ge" publicId={user.imageLocation}/>
            {publicId != "" ? <a href={publicId}>Download</a> : ""}
            {userObject.id == user.id
                ? <> 
                    <UploadWidget publicId={publicId} setPublicId={setPublicId}/>
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