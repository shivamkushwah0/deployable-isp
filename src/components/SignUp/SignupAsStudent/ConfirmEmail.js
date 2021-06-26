import React from "react";
import axios from "axios";
import {Redirect} from 'react-router-dom';

export default class ConfirmEmail extends React.Component {
  constructor(props){
    super(props);
  this.state = {
    token: props.match.params.token
  };
}


  // handleChange = async (event) =>
  // {
  //   const target = event.target;
  //   const name = target.name;
  //   const value = target.value;
  //   await this.setState({
  //     [name]:value
  //   })
  //   if(this.state.password1===this.state.password2&&this.state.password1!='')
  //   {
  //     this.setState({match:1});
  //   }
  //   else
  //   {
  //     this.setState({match:0});
  //   }
  // }

  // validate(password1,password2) {
  //   const errors = {
  //     password:'',
  //   };

  //   const passwordreg = /^.{8,}$/;
		// if(!passwordreg.test(password1) || !passwordreg.test(password2))
		// 	errors.password = 'Password should have 8 or more characters';

  //   return errors;
  // }

  
  
  handleSubmit = (event)=>{
    event.preventDefault();
    // const errors = this.validate(this.state.password1,this.state.password2);
    // console.log(errors);
    
    // let payload={token:this.state.token}
    // axios.patch("https://iitp-isa-portal-backend.herokuapp.com/backend/confirmEmail",payload)
    // .then((s)=>{
    //   this.setState({redirect:"/"})
    // })
    // .catch((e)=>{
    //   alert("Could not confirm Email.\n Consult Admin");
    // });
    fetch("https://iitp-isa-portal-backend.herokuapp.com/backend/confirmEmail",{
      method : "post",
      headers : {
        "Content-Type": "application/json"
      },
      body : JSON.stringify({
        token : this.state.token
      })
    })
    .then((res)=>{
      if(res.ok)
     return  res.json()
      else alert("Something went wrong, please try again");
    }
     )
    .then(data => {
      console.log(data);
      alert("Your account have been activated, login now to proceed with your application")
      window.location.href = "https://iitp-isa.netlify.app/login"
    })
    .catch(err=>{
      console.log(err) 
      alert(err)});
    
  }
  render() {

    // const errors = this.validate(this.state.password1,this.state.password2);


    // if (this.state.redirect)
    // {
    //   return <Redirect to={this.state.redirect} />
    // }
    return (
      <div className="base-container register d-flex justify-content-center">
        <div className="shadow-lg border rounded border-dark p-5 m-4 text-light resetPassword" style={{
          background:"#00e7c9",
          padding:"40px",

        }}>
          <div className="container text-center">
            <form onSubmit={this.handleSubmit}>
              
            <button type="submit" className="btn btn-primary">Confirm Email</button>
            </form>
          </div>
        </div>
      </div>
    )};
}
