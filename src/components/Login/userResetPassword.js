import React from "react";
import axios from "axios";
import {Redirect} from 'react-router-dom';

export default class userResetPassword extends React.Component {
  state = {
    userName:'',
    role:'',
    loading:false
  }
  handleChange = async (event) =>
  {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    await this.setState({
      [name]:value
    })
  }
  handleSubmit = async (event)=>{
    event.preventDefault();
    this.setState({
      loading:true,
    })

    let payload = {
      userName:this.state.userName,
      role:this.state.role,
    }
    if(this.state.role==="Applicant"||this.state.role==="Admin")
    {
      payload={
        userName:this.state.userName,
        role:this.state.role,
      }
    }
     await axios.post('http://localhost:5100/backend/forgotPassword',payload)
    .then((s)=>
    {
      alert("Mail has been sent to your personal email");
      setTimeout(() => {
        this.setState({
          loading:false,
          redirect:"/login",
        })
      }, 2000);

    })
    .catch((e)=>{
      alert(e);
      this.setState({loading:false});
    })
  }
  render() {
    if (this.state.redirect)
    {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="base-container register d-flex justify-content-center">
        {this.state.loading===true?(
          <div className="d-flex justify-content-center">
          <div className="spinner-grow text-success"></div>
          <div className="spinner-grow text-success"></div>
          <div className="spinner-grow text-success"></div>
          </div>
        ):(
        <div className="shadow-lg border rounded border-dark p-5 m-4 text-light resetPassword" style={{
          background:"#00e7c9",
          padding:"40px",

        }}>
          <div className="container text-center">
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="role">Account Type:</label>
                  <select name="role"className="form-control" id="role" value={this.state.role}>
                    <option value=''>Select</option>
                    <option value="Admin">Admin</option>
                    <option value="Applicant">Student</option>
                    <option value="DeptHead">Hod</option>
                    <option value="AcadSec">Academic Section</option>
                  </select>
              </div>
              <div className="form-group">
                <label htmlFor="userName">Username (Email Id):</label>
                <input type="text" className="form-control" placeholder="Enter Username" id="userName" name="userName" value={this.state.userName} required/>
              </div>

              <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
          </div>
        </div>)}
      </div>
    )};
}
