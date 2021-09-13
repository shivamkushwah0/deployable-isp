import React , {useState} from 'react'
import logo from '../Login/logo.png'
import '../StudentMyProfile/StudentMyProfile.css';
import {Link} from 'react-router-dom'
export default function Picreset(props) {

    const [oldPassword , setOldPassword] = useState('');
    const [newPassword , setNewPassword] = useState('');
    const [cnfNewPassword , setCnfNewPassword] = useState('');
    const handleSubmit = (e) => {
        if(newPassword.length < 8)
        {
            alert("The password length cannot be less than 9 characters");
            return ;
        }
        if(newPassword === cnfNewPassword)
        {
        const address = 'https://iitp-isa-portal-backend.herokuapp.com/backend/admin/reset-password';
        fetch (address,{
            headers : {
                "Content-Type" : "application/json",
                 'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
            },
            method:'PATCH',
            body : JSON.stringify({
                oldPassword : oldPassword ,
                newPassword : newPassword
            }),
            
        })
        .then(res=> {
            if(res.ok)
            {
                console.log(res.ok);
                return res.json();
            }
            else throw Error("Invalid Credentials, Please Try again");
        })
        .then(data => {
            console.log(data);
            alert("Password was resetted successfully");
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            alert("Please login again");
            window.location.href = "https://iitp-isa.netlfy.app/login";;

        })
        .catch(err=>{
            console.log(err)
            alert("Invalid Credentials");
        })
        }
        else alert("Confirm Password and New Password should match")
        e.preventDefault();
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
                            <h1>Welcome , {props.user.name}</h1>
                            <h3>Admin Portal</h3>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <div className="status">
                            <h4>Reset Your Password</h4>
                            <div className="status_details">
                                <div className="det stu_password">
                                    <form action="">
                                        <label htmlFor=""> Current Password <input value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value); console.log(oldPassword)}} type="Password" placeholder="Password"/></label>
                                        <label htmlFor=""> New Password <input value={newPassword} onChange={(e)=>{setNewPassword(e.target.value); console.log(newPassword)}} type="Password" placeholder="Password"/></label>
                                        <label htmlFor=""> Confirm New Password <input value={cnfNewPassword} onChange={(e)=>{setCnfNewPassword(e.target.value); console.log(cnfNewPassword)}} type="Password" placeholder="Password"/></label>
                                        <button onClick={(e)=>{handleSubmit(e)}} type="submit">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
