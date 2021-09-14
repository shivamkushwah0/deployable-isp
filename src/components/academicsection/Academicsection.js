import React, { Component } from 'react'
import {Button , Col , Row} from 'react-bootstrap'
import '../Picwindow/Picwindow.css'
import AcadsecFinalized from './AcadsecFinalized';
import AcadsecAccepted from './AcadsecAccepted';
import Home from "./AcadSecHome";
import {Link} from 'react-router-dom'
import AcadSecReset from "./AcadSecResetPassword";
export default class Forwarded extends Component {

    constructor(props){
        super(props);
        this.state = {
            AcceptedStudentsWindow : false,
            HomeWindow : true,
            FinalizedStudentsWindow : false,
            ResetPasswordWindow : false
        }
    }

    OpenHomeWindow = () => {
        this.setState({
            AcceptedStudentsWindow : false,
            HomeWindow : true,
            FinalizedStudentsWindow : false ,
            ResetPasswordWindow : false
        })
    }

    openResetPassword = () => {
        this.setState({
            AcceptedStudentsWindow : false,
            HomeWindow : false,
            FinalizedStudentsWindow : false ,
            ResetPasswordWindow : true
        })
    }

    OpenAcceptedWindow = () => {
        this.setState({
            AcceptedStudentsWindow : true,
            HomeWindow : false,
            FinalizedStudentsWindow : false ,
            ResetPasswordWindow : false
        })
    }

    OpenFinalizedWindow = () => {
        this.setState({
            AcceptedStudentsWindow : false,
            HomeWindow : false,
            FinalizedStudentsWindow : true ,
            ResetPasswordWindow : false
        })
    }

    render() {
        return (
            <div>
                 <div className="container margintop text-center">
                    <Row>
                        <Col md={3}>
                        <button onClick={this.OpenHomeWindow} className={ this.state.HomeWindow ? "pic_btn_active" : "pic_btn"}>Home</button>
                        </Col>
                        <Col md={2}>
                        <button onClick={this.OpenAcceptedWindow} className={ this.state.AcceptedStudentsWindow ? "pic_btn_active" : "pic_btn"}>Accepted Applicants</button>
                        </Col>
                        <Col md={2}>
                        <button onClick={this.OpenFinalizedWindow} className={ this.state.FinalizedStudentsWindow ? "pic_btn_active" : "pic_btn"}>Finalized Applicants</button>
                        </Col>
                        <Col md={2}>
                        <button onClick={this.openResetPassword} className={ this.state.ResetPasswordWindow ? "pic_btn_active" : "pic_btn"}>Reset Password</button>
                        </Col>
                        <Col md= {3}>
                        <Link to="/login" > <button onClick = {() => {localStorage.removeItem('refreshToken'); localStorage.removeItem('authToken')  }} className="pic_btn">Logout</button></Link>
                        </Col>
                    </Row>
                    
                    </div>
                    <div className="container">
                    {this.state.HomeWindow ? <Home /> : null}
                    {this.state.AcceptedStudentsWindow ? <AcadsecAccepted /> : null}
                    {this.state.FinalizedStudentsWindow ? <AcadsecFinalized /> : null}
                    {this.state.ResetPasswordWindow ? <AcadSecReset /> : null}
                    </div>
                    
                </div>           
        )
    }
}
