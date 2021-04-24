import React, { useState , useEffect } from 'react'
import logo from '../Login/logo.png'
// import './StudentMyProfile.css';
import {Button} from "react-bootstrap";
export default function ChangePassword(props) {
    const [OldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [CnfPass , setCnfPass] = useState('');
    const [user , setUser] = useState({}); 
    useEffect(()=>{
        const address = 'https://iitp-isa-portal-backend.herokuapp.com/backend/admin/departments/';
        fetch(address , {
            method : 'get'
        })
        .then(res => {
            if(res.ok)
            return res.json();
        })
        .then(data => {
            console.log(data)
            const id = props.match?props.match.params.id : props.id; 
            const users =  data.departments.filter((hod)=>hod._id === id)[0];
            console.log(users)
            setUser(users);
            console.log(user);
        })
        .catch(err=>console.log(err))
    },[])
    const handleSubmit=()=>{
        if(CnfPass!=newPass)
        {
            console.log("New Password and confirm password are not matching");    
            return ;
        }
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/department/reset-password/"+user._id;
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
            else return {
                message : "Please enter correct old password"
            };
        }).then(data => {
            console.log(data);
            if(data.message === "Password Reset")
            {
                alert("the password was set successfully");
                props.funchome();
            }
            else {
                alert(data.message)
            }
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
                            <h1>Welcome ,  {user.name ? (user.name) : null}</h1>
                            <h3>Applicant Id: <span>{user._id ? (user.name) : null}</span></h3>
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
