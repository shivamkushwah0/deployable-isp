import React from 'react'
import logo from '../Login/logo.png'
import '../StudentMyProfile/StudentMyProfile.css';
import {Link} from 'react-router-dom'

export default function Pichome(props) {
    const piceditlink = "/piceditprofile/"+props.id; 
    return (
        <div className="container">
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
                        <h4>Edit Your Profile <Link to={piceditlink}><i className="fa fa-edit"></i></Link></h4>
                        <div className="status_details">
                            <div className="det stu_password">
                                <form action="">
                                    <label htmlFor=""> Name <p>Saransh Jain</p></label>
                                    <label htmlFor=""> Mobile <p> 9795829350</p></label>
                                    <label htmlFor=""> Email Address <p> Saranshj786@gmail.com</p></label>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
