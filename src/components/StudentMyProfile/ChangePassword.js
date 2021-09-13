import React, { useState } from 'react'
import logo from '../Login/logo.png'
import './StudentMyProfile.css';
import {Button} from "react-bootstrap";
export default function ChangePassword(props) {
    const [OldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [CnfPass , setCnfPass] = useState('');
    const handleSubmit=()=>{

        if (OldPass.length == 0 || newPass.length ==0 )
        {
            alert("Please fill in the required details");    
            return ;
        }

        if(newPass.length <= 8)
        {
            alert("The password length cannot be less than 9 characters");
            return ;
        }
        if(CnfPass!=newPass)
        {
            alert("New Password and confirm password are not matching");    
            return ;
        }

        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/applicant/reset-password/"+props.data._id
        fetch(address,{
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
              },
              method: 'PATCH',
              body : JSON.stringify({
                  oldPassword : OldPass ,
                  newPassword : newPass
              })               
        }).then(res => {
            if(res.ok)
            {
                console.log(res.ok);
                return res.json();
            }
            else throw Error("Invalid Credentials, Please Try again");
            
        }).then(data => {
            console.log(data);
            alert("Password was resetted successfully");
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            alert("Please login again");
            window.location.href = "https://iitp-isa.netlify.app/login";
        }).catch(err=>{
            console.log(err)
            alert("Invalid Credentials");
        })
        

    }
    return (
        <div>
            <div className="home">
                <div className="profile">
                    <div className="profile_inner">
                        <div className="profile_img">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="name">
                            <h1>Welcome , {props.data.name}</h1>
                            
                        </div>
                    </div>
                </div>
                <div className="details">
                    <div className="status">
                        <h4>Reset Your Password</h4>
                        <div className="status_details">
                            <div className="det stu_password">
                                <form action="" onSubmit = {handleSubmit}>
                                    <label htmlFor=""> Current Password <input type="Password" placeholder="Password" onChange = {(e)=>{setOldPass(e.target.value); console.log(OldPass)}}/></label>
                                    <label htmlFor=""> New Password <input type="Password" placeholder="Password" onChange={(e)=>{setNewPass(e.target.value); console.log(newPass)}}/></label>
                                    <label htmlFor=""> Confirm New Password <input type="Password" placeholder="Password" onChange = {(e)=>{setCnfPass(e.target.value); console.log(CnfPass)}}/></label>
                                    <Button role="submit" onClick={handleSubmit}>Submit</Button> 
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
