import React , {useEffect , useState} from 'react'
import logo from '../Login/logo.png'
import '../StudentMyProfile/StudentMyProfile.css';
import {Link} from 'react-router-dom'

export default function Hodhome(props) {
    const [user, setUser] = useState({});
    useEffect(()=>{
        const address = 'http://localhost:5000/backend/admin/departments/';
        fetch(address , {
            method : 'get'
        })
        .then(res => {
            if(res.ok)
            return res.json();
        })
        .then(data => {
            console.log(data)
            const id = props.match?props.match.params.id : props.id; 
            const users =  data.departments.filter((hod)=>hod._id === id)[0];
            setUser(users);
            console.log(user);
        })
        .catch(err=>console.log(err))
    },[])
    console.log(props);
    const id = props.match?props.match.params.id : props.id; 
    const link = "/edithodprofile/"+id;
    return (
        <div className="container">
            <div className="home">
                <div className="profile">
                    <div className="profile_inner">
                        <div className="profile_img">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="name">
                            <h1>Name : {user.name ? user.name : null }</h1>
                            <h3>Department Name :<span>{user.departmentName ? user.departmentName : null }</span></h3>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <div className="status">
                        {!props.id?<h4>Edit This Profile <Link to={link}><i className="fa fa-edit"></i></Link></h4>:null}
                        <div className="status_details">
                            <div className="det stu_password">
                                <form action="">
                                    <label htmlFor=""> Name <p>{user.name ? user.name : null }</p></label>
                                    <label htmlFor=""> Mobile <p> {user.mobileNo ? user.mobileNo : null }</p></label>
                                    <label htmlFor=""> Email Address <p>{user.email ? user.email : null }</p></label>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
