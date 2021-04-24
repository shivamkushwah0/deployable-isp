import React , {useEffect , useState} from "react";
import {Link} from 'react-router-dom'
import { Form } from "semantic-ui-react";
export default function AcadsecAccepted(props){
    const [file, setFile] = useState(null);
    const [accepted , setAccepted] =  useState([]);
    const [OfferLetter, setOfferLetter] = useState(null);
    const [govtApplicants , setGovtApplicants] = useState([]);
    useEffect(()=>{
        const addresss = "https://iitp-isa-portal-backend.herokuapp.com/backend/acadsec/accepted"
        fetch(addresss , {
            method : 'get'
        })
        .then(res=>{
            if(res.ok)
            return res.json();
            else throw new Error("Something went wrong, please try again later")
        })
        .then(data => {
            console.log(data)
            setAccepted(data.AcceptedApplicants.acceptedApplicants);
        })
        .catch(err => {
            console.log(err);
        })

        const gApplicants = "https://iitp-isa-portal-backend.herokuapp.com/backend/acadSec/govtApplications/applicants";
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
    const handleUpload = (id) => {
        if(file===null || OfferLetter===null)
        {
            alert("Please Select the documents");
            return ;
        }
        const formdata = new FormData();
        formdata.append(
            "SignedNoteSheet",
            file,
            "SignedNoteSheet+"+id+".pdf"
        )
        const address = 'https://iitp-isa-portal-backend.herokuapp.com/backend/acadsec/signedNoteSheetsUpload/'+id;
        fetch(address , {
            method:"PATCH",
            body : formdata
        })
        .then(res => {
            if(res.ok)
            return res.json();
            else throw new Error("Something went wrong, please try again later")

        })
        .then(data => {
            console.log(data)
            if(data.message === "Signed NoteSheet Uploaded")
            {
                const offerletter = new FormData();
                offerletter.append(
                    "offerLetter",
                    file,
                    "OfferLetter+"+id+".pdf"
                )
                const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/acadsec/offerLetterUpload/"+id;
                fetch(address , {
                    method:"PATCH",
                    body : offerletter
                })
                .then(res => {
                    if(res.ok)
                    return res.json();
                    else throw new Error("Something went wrong, please try again later")
                })
                .then(data => {
                    console.log(data)
                    if(data.message === "OfferLetter Uploaded")
                    {
                        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/acadsec/confirmAcceptance/"+id
                        fetch(address, {
                            method : 'PATCH'
                        }) 
                        .then(res => {
                            if(res.ok)
                            return res.json();
                            else throw new Error("Something went wrong, please try again later")
                        })
                        .then(data => {
                            console.log(data)
                            if(data.message === "Process finished")
                            alert("The documents have been uploaded and the applicant has been finalized, please refresh the page to avoid confusions")
                            window.location.reload();
                        })
                        .catch(err => {
                            console.log("Error Confirming Acceptance")
                            console.log(err)
                        })
                    }
                    else alert("Problem Uploading Offer Letter")
                })
                .catch(err => {
                    console.log("Uploading Offer Letter Error")
                    console.log(err)
                })
            }
            else alert("Problem uploading signed notesheet, please try again later")
        })
        .catch(err => {
            console.log("Uploading Signed Notesheet Error")
            console.log(err)
        })
    }
    const handleGovtUpload = (id) => {
        if(file===null || OfferLetter===null)
        {
            alert("Please Select the documents");
            return ;
        }
        const formdata = new FormData();
        formdata.append(
            "SignedNoteSheet",
            file,
            "SignedNoteSheet+"+id+".pdf"
        )
        const address = 'https://iitp-isa-portal-backend.herokuapp.com/backend/acadsec/govtApplications/signedNoteSheetsUpload/'+id;
        fetch(address , {
            method:"PATCH",
            body : formdata
        })
        .then(res => {
            if(res.ok)
            return res.json();
            else throw new Error("Something went wrong, please try again later")

        })
        .then(data => {
            console.log(data)
            if(data.message === "Signed NoteSheet Uploaded")
            {
                const offerletter = new FormData();
                offerletter.append(
                    "offerLetter",
                    file,
                    "OfferLetter+"+id+".pdf"
                )
                const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/acadsec/govtApplications/offerLetterUpload/"+id;
                fetch(address , {
                    method:"PATCH",
                    body : offerletter
                })
                .then(res => {
                    if(res.ok)
                    return res.json();
                    else throw new Error("Something went wrong, please try again later")
                })
                .then(data => {
                    console.log(data)
                    if(data.message === "OfferLetter Uploaded")
                    {
                        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/acadsec/govtApplications/confirmAcceptance/"+id
                        fetch(address, {
                            method : 'PATCH'
                        }) 
                        .then(res => {
                            if(res.ok)
                            return res.json();
                            else throw new Error("Something went wrong, please try again later")
                        })
                        .then(data => {
                            console.log(data)
                            if(data.message === "Process finished")
                            alert("The documents have been uploaded and the applicant has been finalized, please refresh the page to avoid confusions")
                            window.location.reload();
                        })
                        .catch(err => {
                            console.log("Error Confirming Acceptance")
                            console.log(err)
                        })
                    }
                    else alert("Problem Uploading Offer Letter")
                })
                .catch(err => {
                    console.log("Uploading Offer Letter Error")
                    console.log(err)
                })
            }
            else alert("Problem uploading signed notesheet, please try again later")
        })
        .catch(err => {
            console.log("Uploading Signed Notesheet Error")
            console.log(err)
        })
    }
    const RenderApplicants = () => {
        return accepted.map(user => {
            const link =user.noteSheet;
            return(
                <tr>
                <td>{user.name}</td>
                
                <td>{user.contactDetails.email}</td>
                <td>Online</td>
                <td><a target="blank" href={link}><i className="fa fa-download"></i></a></td>
                <td><input className="form-input" type="file" onChange={(e)=>{setFile(e.target.files[0]); console.log(file)}} placeholder="Signed Notesheet" /></td>
                <td><input className="form-input" type = "file" onChange={(e)=>{setOfferLetter(e.target.files[0]); console.log(OfferLetter)}} placeholder="Offer Letter" /></td>
                <td><button onClick = {()=>{handleUpload(user._id)}}>Upload</button></td>

            </tr>
            )
        })
    }
    const RenderGovtApplicants = () => {
        return govtApplicants.map(user => {
            const link =user.noteSheet;
            return(
                <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.platform}</td>
                <td><a target="blank" href={link}><i className="fa fa-download"></i></a></td>
                <td><input className="form-input" type="file" onChange={(e)=>{setFile(e.target.files[0]); console.log(file)}} placeholder="Signed Notesheet" /></td>
                <td><input className="form-input" type = "file" onChange={(e)=>{setOfferLetter(e.target.files[0]); console.log(OfferLetter)}} placeholder="Offer Letter" /></td>
                <td><button onClick = {()=>{handleGovtUpload(user._id)}}>Upload</button></td>

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
                <th>Platform</th>
                <th>Notesheet Download</th>
                <th>Signed Notesheet</th>
                <th>Offer Letter</th>
                <th>Upload Documents</th>
               
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