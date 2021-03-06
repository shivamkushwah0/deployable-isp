import React from 'react'
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Select } from 'semantic-ui-react'
import '../Signup.css';
import logo from '../logo.png';
const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]


const SignupAsStudent = (props) => {
    const history = useHistory();

    const [firstName,setFirstName] = React.useState('');
    const [lastName,setLastName] = React.useState('');
    const [emailID,setEmailID] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [check , setCheck] = React.useState(false);
    const [stumessage, setStuMessage] = React.useState('');
    const [signupStuSuccess, setSignupStuSuccess] = React.useState(false)
    const [loading , setLoading] = React.useState(false);

    function firstNameChange(e){
        setFirstName(e.target.value)
        console.log(firstName)
    }
    function lastNameChange(e){
        setLastName(e.target.value)
        console.log(lastName)
    }
    function emailIDChange(e){
        setEmailID(e.target.value)
        console.log(emailID)
    }
    function passwordChange(e){
        setPassword(e.target.value) 
        console.log(password)
    }

    function phoneChange(e){
        setPhone(e.target.value)
        console.log(phone)
    }
    const onSubmit = () => {
        console.log(firstName)
        console.log(lastName)
        console.log(emailID)
        console.log(password)
        console.log(phone)
        if(firstName.length==0 || lastName.length===0 || emailID.length===0 || password.length===0 || password.length<8 || phone.length===0 || phone.length!=10)
        {
            alert("Please enter all asterisk marked fields \n Please enter valid information \n Note: password contains 8 or more characters\n Phone number should contain 10 numbers");
            return ;
        }
        if(check == false)
        {
            alert("Please tick the checkbox");
            return ;
        }
        setLoading(true);
        fetch('https://iitp-isa-portal-backend.herokuapp.com/backend/applicant/registration', {
            method: "post",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                userName:emailID,
                password:password,
                name:`${firstName} ${lastName}`,
                mobileNo:phone 
            })
        }).then(res => res.json())
        .then(data => { 
            console.log(data)
            setLoading(false);
            if(data.message)
            {
                alert(data.message);
                window.location.href="https://iitp-isa.netlify.app/login" 
                return ;
            }
            alert("A confirmation mail has been sent to your registered email\n Please activate your account before proceeding to next steps");
            window.location.href="https://iitp-isa.netlify.app/login" })
        .catch(error => {console.log(error); alert(error)})
    }

    return(
        <div>
            <div className="text-center Body">
                   <div className="container text-center">
                       <div className="col-12 col-md-9 text-center  LoginFormDiv">
                           <div className="row">
                               <div className="col-md-4 p-0 padding_0" >
                                <div className="text-center .d-none loginsignup">
                                    <img src={logo} alt="image" className="center logo_form"></img>
                                    <p>"Instructions for the candidate here"</p>
                                </div>
                               </div>
                               <div className="col-md-8 back_form signup_form">
                               <div centered raised fluid >
                                <Form onSubmit={onSubmit}>
                                    <h1>Student</h1>
                                <div className="form_login">  
        <Form.Group widths='equal'>
            <Form.Field
                required
                id='form-input-control-first-name'
                control={Input}
                label='First name'
                className="form_label"
            >
                <Input className="input_field" 
                    placeholder='First name' 
                    type="text"
                    value={firstName}
                    onChange={firstNameChange}
                    />
            </Form.Field>
            <Form.Field
                required
            id='form-input-control-last-name'
            control={Input}
            className="form_label"
            label='Last name'
            
            >
               <Input className="input_field" 
               placeholder='Last name' 
               type="text"
               value={lastName}
                onChange={lastNameChange}
               /> 
            </Form.Field>
            
        </Form.Group>
        <Form.Group widths='equal'>
            <Form.Field 
                className="form_label"
                required
                control={Input}
                label='Phone number'
                
            >
                <Input className="input_field" 
                placeholder='10 digit mobile number' 
                type="number"
                value={phone}
                onChange={phoneChange}
                /> 
            </Form.Field>
        
            <Form.Field
            className="form_label"
            control={Select}
            options={genderOptions}
            label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
            placeholder='Gender'
            search
            searchInput={{ id: 'form-select-control-gender' }}
            />
            
            </Form.Group>
        <Form.Group widths='equal'>
            <Form.Field
                className="form_label"
                required
                id='form-input-control-email'
                control={Input}
                label='Email'
                placeholder='name@gmail.com'  
                
            >
                <Input className="input_field" 
                    placeholder="name@gmail.com" 
                    type="email" 
                    value={emailID}
                    onChange={emailIDChange}>
                </Input>
            </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
            <Form.Field
                required
                className="form_label"
                label='Password'
                control={Input}
            > 
            <Input className="input_field" 
                placeholder='Must be more than 6 characters' 
                type='password'
                value={password}
                onChange={passwordChange}>
            </Input>
            </Form.Field>
        </Form.Group>
        <Form.Checkbox onClick={()=>{setCheck(!check)}} required label='I agree to the Terms and Conditions' />
        <div>
        <Form.Field as={Button}   className="mb-5 button_loginsignup" >
            Register
        </Form.Field>
        {loading ? <span className="fa fa-spin fa-spinner fa-2x"></span> : null }
        </div>
        </div>
                                    
                                </Form>
                                </div> 
                               </div>
                           </div>
                       </div>
                   </div>
                
            </div>
        </div>















    
)
}
export default SignupAsStudent
