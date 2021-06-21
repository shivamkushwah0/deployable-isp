import React, { useState } from 'react'
import logo from '../Login/logo.png'
import '../StudentMyProfile/StudentMyProfile.css';
import {Link} from 'react-router-dom'
import { propTypes } from 'react-bootstrap/esm/Image';

export default function Piceditprofile(props) {
    console.log(props);
    const pichome = "/picmyprofile/"+props.match.params.id;
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const handleSubmit = (e) => {
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/admin/edit-profile";
        fetch(address , {
            headers : {
                "Content-Type" : "application/json"
            },
            method : 'PATCH',
            body : JSON.stringify({
                name : name,
                email : email ,
                mobileNo : mobile
            })
        })
        .then(res => {
            if(res.ok)
            return res.json();
        })
        .then(data => {
            console.log(data);
            if(data.message==="Profile Updated")
            {
                alert("profile Updated");
            window.location.href="https://iitp-isa.netlify.app//picmyprofile/"+props.match.params.id;
            }
            else alert("Something Went Wrong");
        })
        .catch(err=>console.log(err))
        e.preventDefault();
    }
    return (
        <div className="container pt-5">
            <Link to = {pichome} ><button type='btn' className="active tab_btn pic_btn"> Admin Profile</button></Link> 
            <div className="home">
                <div className="profile">
                    <div className="profile_inner">
                        <div className="profile_img">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="name">
                            <h1>Welcome</h1>
                            <h3>Admin Portal</h3>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <div className="status">
                        <h4>Edit Your Profile</h4>
                        <div className="status_details">
                            <div className="det stu_password">
                                <form action="">
                                    <label htmlFor=""> Name <input value={name} onChange={(e)=>{setName(e.target.value); console.log(name)}} type="text" placeholder="Full Name"/></label>
                                    <label htmlFor=""> Mobile <input value={mobile} onChange={(e)=>{setMobile(e.target.value); console.log(mobile)}} type="text" placeholder="Mobile No"/></label>
                                    <label htmlFor=""> Email Address <input value={email} onChange={(e)=>{setEmail(e.target.value); console.log(email)}} type="email" placeholder="Email Address"/></label>
                                    <button onClick={(e)=>{handleSubmit(e)}} >Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
