import React , {useEffect , useState} from "react";
import {Link} from 'react-router-dom'
export default function AcadsecAccepted(props){

    const [accepted , setAccepted] =  useState([]);
    const [govtApplicants , setGovtApplicants] = useState([]);
    useEffect(()=>{
        const addresss = "https://iitp-isa-portal-backend.herokuapp.com/backend/acadsec/finalized"
        fetch(addresss , {
            method : 'get'
        })
        .then(res=>{
            if(res.ok)
            return res.json();
            else return new Error("Something went wrong, please try again later")
        })
        .then(data => {
            console.log(data)
            setAccepted(data.finalizedApplicants.finalizedApplicants);
        })
        .catch(err => {
            console.log(err)
        })

        const gApplicants = "https://iitp-isa-portal-backend.herokuapp.com/backend/acadSec/govtApplications/finalizedApplicants";
        fetch(gApplicants , {
            method : "get"
        })
        .then(res=>{
            if(res.ok)
            return res.json();
            else throw new Error("Something went wrong, please try again later")
        })
        .then(data => {
            console.log(data)
            setGovtApplicants(data.Applicants);            
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    const RenderApplicants = () => {
        return accepted.map(user => {
            const link =user.offerLetter;
            return(
                <tr>
                <td>{user.name}</td>
                
                <td>{user.contactDetails.email}</td>
                <td><a target="blank" href={link}><i className="fa fa-download"></i></a></td>
                <td>Online</td>
                <td>{user.applicationStatus}</td>
            </tr>
            )
        })
    }
    const RenderGovtApplicants = () => {
        return govtApplicants.map(user => {
            const link =user.offerLetter;
            return(
                <tr>
                <td>{user.name}</td>
                
                <td>{user.email}</td>
                <td><a target="blank" href={link}><i className="fa fa-download"></i></a></td>
                <td>{user.platform}</td>
                <td>{user.applicationStatus}</td>
            </tr>
            )
        })
    }
    return (
        <div className="margintop">
            <table className="table table-striped">
                    <thead>
                    <tr>
                            <th>Applicant Name</th>
                            <th>Email</th>
                            <th>Offer Letter Download</th>
                            <th>Platform</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                        <tbody>
                        <RenderApplicants />
                        <br />
                        <br />
                        <RenderGovtApplicants />
                        </tbody>
                    </table>
        </div>
    )
}