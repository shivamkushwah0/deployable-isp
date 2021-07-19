import React from 'react'
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Select } from 'semantic-ui-react'
import '../Signup.css';
import logo from '../logo.png';
const SignupAsStudent = (props) => {
    const history = useHistory();
    const [firstName,setFirstName] = React.useState('');
    const [lastName,setLastName] = React.useState('');
    const [emailID,setEmailID] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [signupSuccess, setSignupSuccess] = React.useState(false)

    function firstNameChange(e){
        setFirstName(e.target.value)
    }
    function lastNameChange(e){
        setLastName(e.target.value)
    }
    function emailIDChange(e){
        setEmailID(e.target.value)
    }
    function passwordChange(e){
        setPassword(e.target.value) 
    }

    function phoneChange(e){
        setPhone(e.target.value)
        console.log(phone)
    }

    function OnSignUp(){
        fetch('/signup',{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'Authorization': "Bearer" + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                firstname:firstName,
                lastname:lastName,
                companyname:'xyz',
                email:emailID,
                phone: phone,
                password:password,
            }),
        }).then(res=>res.json())
        .then(data=>{
            if(data.AuthErr){
                console.log(data.AuthErr)
                setMessage(data.AuthErr)
                setSignupSuccess(true)
            }
              else{
                console.log(data.usr)
                setMessage(data.usr)
                setSignupSuccess(true)
                history.push('/login')

            }
        })
        .catch(err=>{
            console.log(err)
          })
    }

    const categorys = [
        { key: 'a', text: 'PIC ISA and Dean (Resource)', value: 'PIC ISA and Dean (Resource)' },
        { key: 'b', text: 'Department Head', value: 'Department Head' },
        { key: 'c', text: 'Academic Section', value: 'Academic Section' },
        { key: 'd', text: 'Admin', value: 'Admin' },
      ]

    return(
<div>
            <div className="text-center Body">
                   <div className="container text-center">
                       
                       <div className="col-12 col-md-9 text-center  LoginFormDiv">
                      
                           <div className="row">
                               <div className="col-md-4 p-0 padding_0" >
                                <div className="text-center .d-none loginsignup">
                                    <img src={logo} alt="image" className="center logo_form"></img>
                                    <p>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "</p>
                                </div>
                               </div>
                               <div className="col-md-8 back_form signup_form">
                               <div centered raised fluid >
                                <Form>
                                <h1>Employer</h1>
                                    <div>
                                        {/* <div style={{paddingBottom:'8px'}}>
                                        <Button.Group size='large' className="mb-3 mt-4 StudentOrEmployerTogggle">
                                        <Button color='twitter' onClick={this.toggleToStudent} className={this.state.sButtonActive=== true ? 'activeClass':'normalClass'}>Student</Button>
                                    
                                        <Button color='twitter' onClick={this.toggleToEmployer} className={this.state.eButtonActive === true ? 'activeClass':'normalClass'}>Faculty</Button>
                                        </Button.Group>
                                        </div> */}
                                        <div className="form_login">
        <Form.Group widths='equal'>
        <Form.Field>
        <label className="form_label" >First Name</label>
        <Input className="input_field" type="text" placeholder='First Name' value= {firstName} onChange={firstNameChange}/>
      </Form.Field>
            <Form.Field
                required
                className="form_label"
            id='form-input-control-last-name'
            control={Input}
            label='Last name'
            >
             <Input type="text" className="input_field" placeholder='Last name' value={lastName} onChange={lastNameChange}/>
            </Form.Field>
            
        </Form.Group>
        <Form.Group widths='equal'>
            <Form.Field 
                className="form_label"
                required
                control={Input}
                label='Phone number'
                
            >
                 <Input type="number"
                  className="input_field"  
                  placeholder='10 digit mobile number'
                  value={phone}
                  onChange={phoneChange} />
            </Form.Field>
        
            <Form.Field
            className="form_label"
            control={Select}
            options={categorys}
            label={{ children: 'Category', htmlFor: 'form-select-control-gender' }}
            placeholder='Categorys'
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
                label='Official Email'
            >
                <Input type="email" className="input_field" placeholder='name@company_name.com'  value={emailID} onChange={emailIDChange} />
            </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
            <Form.Field
                className="form_label"
                required
                label='Password'
                control={Input}
                
               
            ><Input type="password" className="input_field" placeholder='password must be greater that 6 characters'  value={password}  onChange={passwordChange} />
            </Form.Field>
        </Form.Group>

        <Form.Checkbox className="mt-1" label='I agree to the Terms and Conditions' />

        <div>
        <Form.Field as={Button}
            
            
            onClick = {OnSignUp}
            className="mb-5 button_loginsignup"
        >Register
        </Form.Field>
        {(
            signupSuccess && <div>{message}</div>
        )}
        </div>
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
export default SignupAsStudent;