import React, { useState } from 'react'
import logo from '../Login/logo.png'
import './StudentMyProfile.css';
import {Button} from "react-bootstrap";
export default function ChangePassword(props) {
    const [OldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [CnfPass , setCnfPass] = useState('');
    const handleSubmit=()=>{
        if(CnfPass!=newPass)
        {
            console.log("New Password and confirm password are not matching");    
            return ;
        }
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/applicant/reset-password/"+props.data._id
        fetch(address,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'PATCH',
              body : JSON.stringify({
                  oldPassword : OldPass ,
                  newPassword : newPass
              })               
        }).then(res => {
            if(res.ok)
            return res.json();
        }).then(data => {
            console.log(data);
            console.log("Password is reset")
            alert("Password was resetted successfully");
            props.toHome();
        }).catch(err=>{
            console.log(err)
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
