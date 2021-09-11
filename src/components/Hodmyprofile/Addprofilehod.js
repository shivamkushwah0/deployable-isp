import React , {useState} from 'react'
import logo from '../Login/logo.png'
import '../StudentMyProfile/StudentMyProfile.css';
import {Link} from 'react-router-dom';
export default function Addprofilehod(props) {
    const [name, SetName] = useState('');
    const [email , SetEmail] = useState('');
    const [mobileNo , SetMobileNo] = useState('');
    const [password , SetPassword] = useState('');
    const [departmentId , SetDepartmentId] = useState('');
    const [departmentName , SetDepartmentName] = useState('');
    const [blurEmail , setBlurEmail] = useState(false)
    const [loading , setLoading] = useState(false);

    const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
     
      const isEmail = (email) => {
          return (validEmailRegex.test(email))    
      }
    const handleSubmit = (e) => {
        if(name.length ===0 ||  email.length === 0 || mobileNo.length === 0 || password.length === 0 || departmentId.length===0 || departmentName.length === 0 )
        {
            alert("Please fill the required imformation");
            return ;
        }
        setLoading(true);
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/admin/assignDeptHead";
        fetch(address ,{
            headers : {
                "Content-Type":"application/json",
                'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
            },
            method:"post",
            body : JSON.stringify({
                name ,
                email,
                password,
                mobileNo,
                departmentName,
                departmentId
            }),
            
        })
        .then((res)=>{
            setLoading(false);
            if(res.ok)
            return res.json();
            else return new Error("Something Went wrong, please try again")
        })
        .then(data => {
            console.log(data);
            if(data.details)
            {
                alert("The following department head has been added " + data );
                window.location.href="http://localhost:3000/picmyprofile/"+props.match.params.id;            
            }
            else alert("Something went wrong, please try again");
        })
        .catch(err => {
            console.log(err)
        })
        e.preventDefault();
    }
    return (
        <div className="container">
            
            <div className="home">
                <div className="profile">
                    <div className="profile_inner">
                        <div className="profile_img">
                            <img src={logo} alt=""/>
                        </div>
                        
                    </div>
                </div>
                <div className="details">
                    <div className="status">
                            <h4>Create new HOD profile</h4>
                            <div className="status_details">
                                <div className="det stu_password">
                                    <form action="">
                                        <label htmlFor="">Name <input value={name} onChange={(e)=>{SetName(e.target.value); console.log(name)}} type="text" placeholder="Full name"/></label>
                                        <label htmlFor=""> Email <input onBlur={()=>{setBlurEmail(true)}} value={email} onChange={(e)=>{SetEmail(e.target.value); console.log(email)}} type="text" placeholder="Email"/>
                                        </label>
                                        {
                                    isEmail(email) || !blurEmail ? null : (<span className="text-red">Please enter a valid email id</span>)
                                } 
                                        <label htmlFor="">Mobile No. <input required value={mobileNo} onChange={(e)=>{SetMobileNo(e.target.value); console.log(mobileNo)}}  type="text" placeholder="Mobile No"/></label>
                                        <label htmlFor="">Department ID <input required value={departmentId} onChange={(e)=>{SetDepartmentId(e.target.value); console.log(departmentId)}} type="text" placeholder="Department ID"/></label>
                                        <label htmlFor="">Department Name <input required value={departmentName} onChange={(e)=>{SetDepartmentName(e.target.value); console.log(departmentName)}}  type="text" placeholder="Department Name"/></label>
                                        <label htmlFor=""> Password <input required value={password} onChange={(e)=>{SetPassword(e.target.value); console.log(password)}} type="Password" placeholder="Password"/></label>
                                        <button onClick={(e)=>{handleSubmit(e)}} type="submit" className=" tab_btn pic_btn">Create HOD Profie</button>
                                        {loading ? <span className= "fa fa-spin fa-spinner fa-3x" ></span> : null }
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                    <Link to={`/picmyprofile/${props.match.params.id}`} ><button className="pic_btn" >Back</button></Link>
                    </div>
                </div>  
            </div>
    )
}
