import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './Picwindow.css'
export default class Forwarded extends Component {
    constructor(props){
        super();
        this.state={
            forwarded : []
        }
    }
    componentDidMount() {
        const address = 'http://localhost:5000/backend/admin/forwarded';
            fetch(address,{
                method:'get'
            })
            .then(res=>res.json())
            .then(data =>{ console.log(data)
            this.setState({forwarded : data.ForwardedApplicants.forwardedApplicants})
            console.log(this.state.forwarded);
            })
            .catch(err => console.log(err))

            // console.log(this.state.registered);
    }

    render() {

        const RenderApplicants = () => {
            console.log("helloooo")
            const applicants = this.state.forwarded.map((applicant)=>{
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
                        < RenderApplicants/>
                        </tbody>
                    </table>
                    </div>
                    
                    
                </div>
            
        )
    }
}
