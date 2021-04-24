import React from 'react'
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'semantic-ui-react'
import '../Login.css';

const LoginAsHOD = () => {
 
    const [emailID, setEmailID] = React.useState('')
    const [password, setPassword] = React.useState('')
    function emailIDChange(e){
        setEmailID(e.target.value)
        console.log(emailID)
    }
    function passwordChange(e){
        setPassword(e.target.value) 
        console.log(password)
    }

    function handleClick(){ 
        global.header = true;
        sessionStorage.setItem('value', 'employer')
        console.log(sessionStorage.getItem('value'));
        window.open('/','_self')
        // console.log(global.header);
      } 

    function OnSubmit(){ 
        console.log(emailID,password)

        fetch('https://iitp-isa-portal-backend.herokuapp.com/backend/department/login', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName:emailID,
                password:password
            })

        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.message === "Invalid Credentials") {
                    alert('Invalid Credentials, please try again')
                    setPassword('');
                } else {
                    const hodwindow = "http://localhost:3000/hodwindow/"+data._id;
                    window.location.href=hodwindow;
                }
            }).catch(err => {
                console.log(err)
            })
        
    }
        return(
            <div className="form_login login_margin">
                <Form.Group widths='equal'>
                    <Form.Field
                        className="form_label"
                        required
                        id='form-input-control-email'
                        control={Input}
                        label='Official Email'
                        >
                            <Input  className="input_field" 
                                value={emailID} 
                                onChange={(e) => setEmailID(e.target.value)}
                                placeholder='name@gmail.com' 
                                type='email'>
                            </Input>
                        </Form.Field>
                    
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field
                        className="form_label"
                        required
                        label='Password'
                        control={Input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                        <Input  className="input_field" 
                        placeholder='Must be more than 6 characters' 
                        type='password'
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        >
                        </Input>
                    </Form.Field>
                </Form.Group>
                
                <div>
                    <Form.Field as={Button }
                        className="button_loginsignup"
                        onClick={OnSubmit}
                    >
                        Login
                        
                    </Form.Field>
                    {/* <Link style={{fontSize:'12px'}} className="newuser" to='/signup'>New User ? SignUp</Link> */}
                </div>
                <div className="row form_icons">
            <i class="fa fa-google"></i>
            <i className="fa fa-facebook"></i>
            <i className="fa fa-linkedin"></i>
            <i className="fa fa-github"></i>
            </div>
                <Link style={{fontSize:'12px'}}>Forgot Password?</Link>
            </div>
        )
    
}
export default LoginAsHOD;
