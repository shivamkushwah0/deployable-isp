import React, {Component} from 'react'
import { Card, Form, Button} from 'semantic-ui-react'
import './Login.css';
import LoginAsStudent from './LoginAsStudent/LoginAsStudent';
import LoginAsEmployer from './LoginAsEmp/LoginAsEmployer'
import LoginAsHOD from './LoginAsHOD/LoginAsHOD';
import LoginAsAcadSec from './LoginAsAcadSec/LoginAsAcadSec'
import logo from './logo.png';

class Signup extends Component{ 
    constructor(props){
        super(props);
        this.state = {
          isEmployer: false,
          isStudent: true,
          isHOD : false,
          isAcadSec : false,
          sButtonActive:true,
          eButtonActive: false,
          HODButtonActive : false,
          AcadButtonActive : false
        };
        this.displaycomp = this.displaycomp.bind(this);
        this.toggleToEmployer = this.toggleToEmployer.bind(this);
        this.toggleToStudent = this.toggleToStudent.bind(this);
        this.toggleToHOD=this.toggleToHOD.bind(this);
        this.toggleToAcadSec = this.toggleToAcadSec.bind(this); 
        console.log(this.state)
      }

    toggleToStudent(){
        this.setState({
            isEmployer: false,
            isStudent: true,
            isHOD : false,
            isAcadSec : false,
            sButtonActive:true,
            eButtonActive: false,
            HODButtonActive : false,
            AcadButtonActive : false
        })
        // console.log(this.state)
    }

    toggleToEmployer(){
        this.setState({
          isEmployer: true,
          isStudent: false,
          isHOD : false,
          isAcadSec : false,
          sButtonActive:false,
          eButtonActive: true,
          HODButtonActive : false,
          AcadButtonActive : false
        })
        // console.log(this.state)
    }

    toggleToHOD(){
        this.setState ( {
          isEmployer: false,
          isStudent: false,
          isHOD : true,
          isAcadSec : false,
          sButtonActive:false,
          eButtonActive: false,
          HODButtonActive : true,
          AcadButtonActive : false
        })
    }
    toggleToAcadSec(){
        this.setState ( {
          isEmployer: false,
          isStudent: false,
          isHOD : false,
          isAcadSec : true,
          sButtonActive:false,
          eButtonActive: false,
          HODButtonActive : false,
          AcadButtonActive : true
        })
    }

//   Below is the function for switching between the logn/signup form for students or employers
    displaycomp = () => {
        let isStudent = this.state.isStudent;
        let isEmployer = this.state.isEmployer;
        let isHOD = this.state.isHOD;
        let isAcadSec = this.state.isAcadSec;
        if(isStudent=== true && isEmployer===false && isHOD===false && isAcadSec===false){
            return <LoginAsStudent/>
        }
        else if(isStudent===false && isEmployer=== true && isHOD===false && isAcadSec===false){
            return <LoginAsEmployer value={this.states}/>
            }
            else if (isStudent===false && isEmployer=== false  && isHOD===true && isAcadSec===false)
            {
                return <LoginAsHOD/>;
            }
            else if(isStudent===false && isEmployer=== false && isHOD===false && isAcadSec===true)
            {
                return <LoginAsAcadSec/>;
            }
        }
        
    render(){
    return(
    <div>
        {/* <NavigationBar a={this.toggleToEmployer} value={this.state} /> */}
        <div className="text-center Body">
            <div className="container text-center">
                <div className="col-12 col-md-9 text-center LoginFormDiv">
                    <div className="row">
                        <div className="col-md-4 p-0 padding_0">
                            <div className="text-center loginsignup">
                                <img src={logo} alt="image" className="center logo_form"></img>
                                <p> Guidelines Section here</p>
                                
                            </div>
                        </div>
                        
                        <div className="col-md-8 back_form">
                            <div centered  fluid className="LoginFormCard ">
                                <Form size='big' className="LoginForm">
                                    <div className="LoginPageButtonDiv">
                                    <Button.Group size='large' className="mb-5 StudentOrEmployerTogggle">
                                        <Button onClick={this.toggleToStudent} className={this.state.sButtonActive=== true ? 'activeClass':'normalClass'}>Student</Button>
                                        
                                        <Button onClick={this.toggleToEmployer} className={this.state.eButtonActive === true ? 'activeClass':'normalClass'}>Admin</Button>

                                        <Button onClick={this.toggleToHOD} className={this.state.HODButtonActive === true ? 'activeClass':'normalClass'}>HOD</Button>

                                        <Button onClick={this.toggleToAcadSec} className={this.state.AcadButtonActive === true ? 'activeClass':'normalClass'}>Academic Section</Button>
                                    </Button.Group>
                                    {this.displaycomp()}
                                    </div>
                                </Form>
                            </div> 
                        </div> 
                    </div>
                </div>
            </div>
            
        </div>
    </div>
)}}
export default Signup
