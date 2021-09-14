import React , {useState , useEffect} from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import logo from "../Login/logo.png";
import {Link} from 'react-router-dom'
export default function AcadsecHome() {
    const aseditlink = "/as-reset-profile/";
    const [user,setUser] = useState({});
    useEffect(()=>{
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/acadSec/profile"
        fetch(address,{
            method : "get",
            headers : {
                'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
            },
            
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            data = data.acadSec;
            setUser(data)
        })
    },[]);
    return (
        <div className="container">
            <div className="home">
                <div className="profile">
                    <div className="profile_inner">
                        <div className="profile_img">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="name">
                            <h1>WELCOME, {user.name}</h1>
                            <h3>Academic Section Portal</h3>
                            <h4>Edit Your Profile <Link to={aseditlink}><i className="fa fa-edit"></i></Link></h4>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <div className="status">
                        
                        <div className="status_details">
                            <div className="det stu_password">
                                <form action="">
                                    <label htmlFor=""> Name : {user.name} </label>
                                    <label htmlFor=""> Mobile : {user.mobileNo}</label>
                                    <label htmlFor=""> Email Address : {user.email}</label>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}