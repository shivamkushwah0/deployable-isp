import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom';
import ReactDOM from 'react-dom'
import { useHistory } from "react-router-dom";
import '../Login.css';
const LoginAsStudent = () => {
    const [emailID, setEmailID] = React.useState('')
    const [password, setPassword] = React.useState('')


    function handleSubmit(){
        global.header = true;
        sessionStorage.setItem('value', 'student')
        console.log(sessionStorage.getItem('value'));
        window.open('/','_self')
        // console.log(global.header);
    }
    function handleKeypress (e) {
        //it triggers by pressing the enter key
      if (e.target.keyCode === 13) {
          console.log(e)
          console.log("enter")
        OnSubmit();
      }
    };
    function OnSubmit(){ 
        // console.log(emailID,password)

        fetch('https://iitp-isa-portal-backend.herokuapp.com/backend/applicant/login', {
            method: "post",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                userName:emailID,
                password:password
            })
        }).then((res) => {
            // console.log(res);
                 return res.json()
             
         })
            .then(data => {
                console.log(data);
                if(data._id!=undefined)
                window.location.href="https://iitp-isa.netlify.app/stumyprofile/"+data._id;
                else {alert("Invalid Credentials, please try again")
                setPassword('');
                }
                            }).catch(err => {
                console.log(err)
        })

    }
   
    return(
        <div className="form_login login_margin" onKeyPress={handleKeypress}>  
            <Form.Group widths='equal'>
                <Form.Field
                    className="form_label"
                    required
                    id='form-input-control-email'
                    control={Input}
                    label='Email'
                >

                    <Input  className="input_field" 
                    placeholder='name@gmail.com' 
                    type='email'
                    value={emailID} 
                    onChange={(e) => setEmailID(e.target.value)}
                    ></Input>
                </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field 
                    className="form_label"
                    required
                    label='Password'
                    control={Input}
                    
                >
                    <Input className="input_field" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Must be more than 6 characters' 
                        
                        type='password'>
                    </Input>
                </Form.Field>
            </Form.Group>
            
            <div>
                <Form.Field as={Button}
                    className="button_loginsignup"
                    onClick={OnSubmit} 
                   
                >
                Login
                </Form.Field>
                <Link style={{fontSize:'12px'}} className="newuser" to='/signup'>New User ? SignUp</Link>
            </div>
            <div className="row form_icons">
            <i class="fa fa-google"></i>
            <i className="fa fa-facebook"></i>
            <i className="fa fa-linkedin"></i>
            <i className="fa fa-github"></i>
            </div>
            <Link style={{fontSize:'12px'}} to="/user-reset-password">Forgot Password?</Link>
           
        </div>
    )
   
}
export default LoginAsStudent
