import React, { Component} from 'react'
import './Picwindow.css';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';
import StudentProfile from '../StudentProfile/StudentProfile';



export default class Registered extends Component {
    constructor(props){
        super();
        this.state={
            registered : []
        }
        this.clicking=this.clicking.bind(this)
    }
    
    clicking=files=>{
        console.log(files)
        this.props.history.push("/stuprofile")
    }
    
    componentDidMount() {
        const address = 'https://iitp-isa-portal-backend.herokuapp.com/backend/admin/registered';
            fetch(address,{
                method:'get'
            })
            .then(res=>res.json())
            .then(data =>{ console.log(data)
            this.setState({registered : data.RegisteredApplicants.registeredApplicants})
            })
            .catch(err => console.log(err))

            // console.log(this.state.registered);
    }

   

    render() {
        {console.log(this.state.registered)}
        
        const RenderApplicants = () => {
            console.log("helloooo")
            const applicants = this.state.registered.map((applicant)=>{
                const link = '/stuprofile/'+applicant._id+"/"+this.props.aid;
                console.log(link);
                return(
                    
                    <tr>
                            <td>{applicant.name}</td>
                            <td>{applicant.department}</td>
                            <td>{applicant.userName}</td>
                            <td><i className="fa fa-download"></i></td>
                            <td><Link to={`${link}`}><i className="fa fa-user"> view profile</i></Link></td>
                    </tr>
                    
                )
            })
            return applicants;
        }

        return (
            <div>
                <div className="container margintop">
                    
                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Applicant Name</th>
                            <th>Department</th>
                            <th>Email</th>
                           
                        </tr>
                    </thead>
                        <tbody>
                        <RenderApplicants />
                        </tbody>
                    </table>
                    </div>
                   
                    
                </div> 
            
        )
    }
}
