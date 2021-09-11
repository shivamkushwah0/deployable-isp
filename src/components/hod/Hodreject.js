import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import NothingHere from '../extras/nothingHere'
export default class Rejected extends Component {
    constructor(props){
        super();
        this.state={
            rejected : []
        }
        this.clicking=this.clicking.bind(this)
    }
    
    clicking=files=>{
        console.log(files)
        this.props.history.push("/hodstuprofile")
    }
    componentDidMount() {
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/department/rejected/" + this.props.hid;
        fetch(address , {
            method:'get',
            headers : {
                'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
            },
            
        })
        .then(res=>{
            if(res.ok)
                return res.json();
            else throw new Error ("Something went wrong, please try again later");    
        })
        .then(data=>{
            console.log(data)
            this.setState({rejected : data.RejectedApplicants.rejectedApplicants})
        })
    }
    render() {
        {console.log(this.state.accepted)}
        const RenderApplicants = () => {
            console.log("helloooo")
            const applicants = this.state.rejected.map((applicant)=>{
                const link = '/hodstuprofile/'+this.props.hid+"/"+applicant._id;
                console.log(link);
                return(
                    
                    <tr>
                            <td>{applicant.name}</td>
                            <td>{applicant.department}</td>
                            <td>{applicant.userName}</td>
                            <td>{applicant.applicationStatus}</td>
                            <td><Link to={`${link}`}><i className="fa fa-user"> view profile</i></Link></td>
                    </tr>
                    
                )
            })
            return applicants;
        }
        return (
            <div>
                 <div className="container margintop">
                    
                 {this.state.rejected.length ?  <table className="table table-striped">
                    <thead>
                    <tr>
                            <th>Applicant Name</th>
                            <th>Department</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                           
                        </tr>
                    </thead>
                        <tbody>
                        <RenderApplicants />
                        </tbody>
                    </table> : <NothingHere /> }
                    </div>
                    
                </div>
            
        )
    }
}
