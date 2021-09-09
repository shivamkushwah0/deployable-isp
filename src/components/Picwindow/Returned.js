import React, { Component } from 'react'
import './Picwindow.css'
import {Link} from 'react-router-dom'
import NothingHere from '../extras/nothingHere';
export default class Returned extends Component {
    constructor(props){
        super();
        this.state={
            returned : []
        }
    }
    componentDidMount() {
        const address = 'http://localhost:5100/backend/admin/returned';
            fetch(address,{
                method:'get',
                headers : {
                    'x-auth-token': localStorage.getItem('refreshToken'),
                    'x-refresh-token': localStorage.getItem('refreshToken'),
                },
                payload : {
                    role : localStorage.getItem('role'),
                }
            })
            .then(res=>res.json())
            .then(data =>{ console.log(data)
            this.setState({returned : data.ReturnedApplicants.returnedApplicants})
            console.log(this.state.returned)
            })
            .catch(err => console.log(err))

            // console.log(this.state.registered);
    }

    render() {
        const RenderApplicants = () => {
            console.log("helloooo")
            const applicants = this.state.returned.map((applicant)=>{
                const link = '/stuprofile/'+applicant._id+"/"+this.props.aid;
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
                    
                 { this.state.returned.length !== 0 ?  (<table className="table table-striped">
                    <thead>
                    <tr>
                            <th>Applicant Name</th>
                            <th>Department</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Profile</th>
                           
                        </tr>
                    </thead>
                        <tbody>
                        < RenderApplicants/>
                        </tbody>
                    </table>)
                    : 
                    (<NothingHere />)
                    }
                    </div>
                    
                    
                </div>
            
        )
    }
}
