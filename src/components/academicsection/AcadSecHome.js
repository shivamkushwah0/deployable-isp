import React from "react";
import logo from "../Login/logo.png";
export default function AcadsecHome() {
    return (
        <div className="container">
            <div className="home">
                <div className="profile">
                    <div className="profile_inner">
                        <div className="profile_img">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="name">
                            <h1>WELCOME, Academic Section</h1>
                            
                        </div>
                    </div>
                </div>
                <div className="details">
                    <div className="status">
                        
                        <div className="status_details">
                            <div className="det stu_password">
                                <form action="">
                                    <label htmlFor=""> Name : Acad123 </label>
                                    <label htmlFor=""> Mobile : 9876543210</label>
                                    <label htmlFor=""> Email Address : acadsec@gmail.com</label>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}