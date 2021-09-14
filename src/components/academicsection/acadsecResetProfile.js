import React, { useState } from 'react'
import logo from '../Login/logo.png'
import '../StudentMyProfile/StudentMyProfile.css';
import {Link} from 'react-router-dom'
import { propTypes } from 'react-bootstrap/esm/Image';

export default function AcadSecEditProfile(props) {
    console.log(props);
    const ashome = "/aswindow/";
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/acadSec/edit-profile/";
        fetch(address , {
            headers : {
                "Content-Type" : "application/json",
                'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
            },
            method : 'PATCH',
            body : JSON.stringify({
                name : name,
                email : email ,
                mobileNo : mobile
            }),
            
        })
        .then(res => {
            if(res.ok)
            return res.json();
            else throw Error("Somthing Went wrong, Please try again later")
        })
        .then(data => {
            console.log(data);
            if(data.message==="Profile Updated")
            {
                alert("profile Updated");
            window.location.href="https://iitp-isa.netlify.app/aswindow/";
            }
            else alert("Something Went Wrong");
        })
        .catch(err=>{
            console.log(err)
            alert("Please make sure you are connected to the internet and try again");
        })
        e.preventDefault();
    }
    return (
        <div className="container pt-5">
            <Link to = {ashome} ><button type='btn' className="active tab_btn pic_btn"> Academic Section Profile</button></Link> 
            <div className="home">
                <div className="profile">
                    <div className="profile_inner">
                        <div className="profile_img">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="name">
                            <h1>Welcome</h1>
                            <h3>Academic Section Portal</h3>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <div className="status">
                   
                        <div className="status_details">
                            <div className="det stu_password">
                                <form action="">
                                    <label htmlFor=""> Name <input value={name} onChange={(e)=>{setName(e.target.value); console.log(name)}} type="text" placeholder="Full Name"/></label>
                                    <label htmlFor=""> Mobile <input value={mobile} onChange={(e)=>{setMobile(e.target.value); console.log(mobile)}} type="text" placeholder="Mobile No"/></label>
                                    <label htmlFor=""> Email Address <input value={email} onChange={(e)=>{setEmail(e.target.value); console.log(email)}} type="email" placeholder="Email Address"/></label>
                                    <button className = "pic_btn" onClick={(e)=>{handleSubmit(e)}} >Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
