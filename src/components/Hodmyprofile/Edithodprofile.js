import React , {useState,useEffect} from 'react'
import logo from '../Login/logo.png'
import '../StudentMyProfile/StudentMyProfile.css';
import {Link} from 'react-router-dom'

export default function Edithodprofile(props) {

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});

    const handleSubmit =() => {
        const address = "http://localhost:5100/backend/admin/updateDeptHead/"+props.match.params.id;
        fetch(address , {
            method:'PATCH',
            headers : {
                "Content-Type":"application/json",
                'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
            },
            body:JSON.stringify({
                name : name ,
                email : email ,
                password : password ,
                mobileNo : mobile ,
                departmentName : user.departmentName
            }),
            payload : {
                role : localStorage.getItem('role'),
            }
        })
        .then(res => {
            if(res.ok)
            return res.json();
            else return new Error("Something went Wrong, please try again")
        })
        .then(data => {
            console.log(data);
            if(data.status)
            {
                alert("the given HOD profile is updated");
                window.location.href = 'http://localhost:3000/seehodprofile/'+props.match.params.id
            }
        })
        .catch(err => console.log(err))

    }

    useEffect(()=>{
        const address = 'http://localhost:5100/backend/admin/departments/';
        fetch(address , {
            method : 'get',
            headers : {
                'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
            },
            payload : {
                role : localStorage.getItem('role'),
            }
        })
        .then(res => {
            if(res.ok)
            return res.json();
        })
        .then(data => {
            console.log(data)
            const users =  data.departments.filter((hod)=>hod._id === props.match.params.id)[0];
            setUser(users);
            console.log(user);
        })
        .catch(err=>console.log(err))
    },[])
    return (
        <div className="container">
            <div className="home">
                <div className="profile">
                    <div className="profile_inner">
                        <div className="profile_img">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="name">
                            <h1>Name :{user.name ? user.name : null }</h1>
                            <h3>Department Name :<span>{user.departmentName ? user.departmentName : null }</span></h3>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <div className="status">
                        <h4>Edit HOD Profile</h4>
                        <div className="status_details">
                            <div className="det stu_password">
                                <form action="">
                                    <label htmlFor=""> Name <input value={name} onChange={(e)=>{setName(e.target.value); console.log(name)}} type="text" placeholder="Full Name"/></label>
                                    <label htmlFor=""> Mobile <input value={mobile} onChange={(e)=>{setMobile(e.target.value); console.log(mobile)}} type="text" placeholder="Mobile No"/></label>
                                    <label htmlFor=""> Email Address <input value={email} onChange={(e)=>{setEmail(e.target.value); console.log(email)}} type="email" placeholder="Email Address"/></label>
                                    <label htmlFor=""> Name <input value={password} onChange={(e)=>{setPassword(e.target.value); console.log(password)}} type="password" placeholder="Password"/></label>
                                    
                                </form>
                                <br/>
                               
                            </div>
                        </div>
                        <button onClick={handleSubmit} type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
