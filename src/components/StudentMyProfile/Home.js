import React from 'react'
import logo from '../Login/logo.png'
import './StudentMyProfile.css';
import {Button} from 'react-bootstrap';
export default function Home(props) {
    console.log(props);
    return (
        <div>
            <div className="container">
            <div className="home">
                <div className="profile">
                    <div className="profile_inner">
                        <div className="profile_img">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="name">
                            <h1>Welcome ,{!props.data?null:props.data.name}</h1>
                            <h3>Applicant Id: <span>{!props.data?null:props.data._id}</span></h3>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <div className="status">
                        <h4>Current Status</h4>
                        <div className="status_details">
                            <div className="det">
                                <h4>{!props.data?null:props.data._id}</h4>
                                <h4><Button onClick = {!props.data?null:props.toggleStatus} >Applicant Status</Button> </h4>
                            </div>
                        </div>
                    </div>
                    
            </div>
            </div>
            </div>
        </div>
    )
}
