import React, { Component } from 'react'
import {Button , Col , Row} from 'react-bootstrap'
import '../Picwindow/Picwindow.css'
import AcadsecFinalized from './AcadsecFinalized';
import AcadsecAccepted from './AcadsecAccepted';
import Home from "./AcadSecHome";
export default class Forwarded extends Component {

    constructor(props){
        super(props);
        this.state = {
            AcceptedStudentsWindow : false,
            HomeWindow : true,
            FinalizedStudentsWindow : false 
        }
    }

    OpenHomeWindow = () => {
        this.setState({
            AcceptedStudentsWindow : false,
            HomeWindow : true,
            FinalizedStudentsWindow : false 
        })
    }

    OpenAcceptedWindow = () => {
        this.setState({
            AcceptedStudentsWindow : true,
            HomeWindow : false,
            FinalizedStudentsWindow : false 
        })
    }

    OpenFinalizedWindow = () => {
        this.setState({
            AcceptedStudentsWindow : false,
            HomeWindow : false,
            FinalizedStudentsWindow : true 
        })
    }

    render() {
        return (
            <div>
                 <div className="container margintop">
                    <Row>
                        <Col md={3}>
                        <button onClick={this.OpenHomeWindow} className={ this.state.HomeWindow ? "pic_btn_active" : "pic_btn"}>Home</button>
                        </Col>
                        <Col md={3}>
                        <button onClick={this.OpenAcceptedWindow} className={ this.state.AcceptedStudentsWindow ? "pic_btn_active" : "pic_btn"}>Accepted Applicants</button>
                        </Col>
                        <Col md={3}>
                        <button onClick={this.OpenFinalizedWindow} className={ this.state.FinalizedStudentsWindow ? "pic_btn_active" : "pic_btn"}>Finalized Applicants</button>
                        </Col>
                        <Col>
                        <button onClick={()=>{window.location.href="http://localhost:3000/login"}} className="pic_btn">Logout</button>
                        </Col>
                    </Row>
                    
                    </div>
                    <div className="container">
                    {this.state.HomeWindow ? <Home /> : null}
                    {this.state.AcceptedStudentsWindow ? <AcadsecAccepted /> : null}
                    {this.state.FinalizedStudentsWindow ? <AcadsecFinalized /> : null}
                    </div>
                    
                </div>           
        )
    }
}
