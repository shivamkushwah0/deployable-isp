import React , {useEffect , useState} from "react";
import {Link} from 'react-router-dom'
import { Form } from "semantic-ui-react";
export default function AcadsecAccepted(props){
    const [file, setFile] = useState(null);
    const [accepted , setAccepted] =  useState([]);
    const [OfferLetter, setOfferLetter] = useState(null);
    useEffect(()=>{
        const addresss = "http://localhost:5000/backend/acadsec/accepted"
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
            setAccepted(data.AcceptedApplicants.acceptedApplicants);
        })
    },[])
    const handleUpload = (id) => {
        const formdata = new FormData();
        formdata.append(
            "SignedNoteSheet",
            file,
            "SignedNoteSheet+"+id+".pdf"
        )
        const address = 'http://localhost:5000/backend/acadsec/signedNoteSheetsUpload/'+id;
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
                const address = "http://localhost:5000/backend/acadsec/offerLetterUpload/"+id;
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
                        const address = "http://localhost:5000/backend/acadsec/confirmAcceptance/"+id
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
                <td><a target="blank" href={link}><i className="fa fa-download"></i></a></td>
                <td><input className="form-input" type="file" onChange={(e)=>{setFile(e.target.files[0]); console.log(file)}} placeholder="Signed Notesheet" /></td>
                <td><input className="form-input" type = "file" onChange={(e)=>{setOfferLetter(e.target.files[0]); console.log(OfferLetter)}} placeholder="Offer Letter" /></td>
                <td><button onClick = {()=>{handleUpload(user._id)}}>Upload</button></td>

            </tr>
            )
        })
    }
    return (
        <table className="table table-striped">
        <thead>
        <tr>
                <th>Applicant Name</th>
                <th>Email</th>
                <th>Notesheet Download</th>
                <th>Signed Notesheet</th>
                <th>Offer Letter</th>
                <th>Upload Documents</th>
               
            </tr>
        </thead>
            <tbody>
            <RenderApplicants />
            </tbody>
        </table>
    )
}