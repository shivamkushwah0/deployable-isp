import React , {useEffect , useState} from "react";
import {Link} from 'react-router-dom'
export default function AcadsecAccepted(props){

    const [accepted , setAccepted] =  useState([]);
    useEffect(()=>{
        const addresss = "http://localhost:5000/backend/acadsec/finalized"
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
    },[])

    const RenderApplicants = () => {
        return accepted.map(user => {
            const link =user.offerLetter;
            return(
                <tr>
                <td>{user.name}</td>
                
                <td>{user.contactDetails.email}</td>
                <td><a target="blank" href={link}><i className="fa fa-download"></i></a></td>
                
            </tr>
            )
        })
    }
    return (
        <div>
            <table className="table table-striped">
                    <thead>
                    <tr>
                            <th>Applicant Name</th>
                            <th>Email</th>
                            <th>Offer Letter Download</th>
                            
                           
                        </tr>
                    </thead>
                        <tbody>
                        <RenderApplicants />
                        </tbody>
                    </table>
        </div>
    )
}