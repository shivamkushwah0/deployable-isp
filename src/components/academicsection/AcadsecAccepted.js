import React , {useEffect , useState} from "react";
import Modal  from 'react-modal';
import {Link} from 'react-router-dom'
import Label from '@material-ui/core/InputLabel'
import { Form } from "semantic-ui-react";
import NothingHere from '../extras/nothingHere'
export default function AcadsecAccepted(props){
    const [byOnlineFile, setByOnlineFile] = useState([]);
    const [byGovtFile, setByGovtFile ] = useState([]);
    const [accepted , setAccepted] =  useState([]);
    const [byOnlineOfferLetter, setByOnlineOfferLetter] = useState([]);
    const [byGovtOfferLetter,setByGovtOfferLetter] = useState([]);
    const [govtApplicants , setGovtApplicants] = useState([]);
    const [onlineIndex , setOnlineIndex] = useState(0);
    const [govtIndex , setGovtIndex] = useState(0); 
    const [mode , setMode] = useState('online');
    const [isModalOpen , setModal ] = useState(false);
    const [loading , setLoading] = useState(false);
    useEffect(()=>{
        const addresss = "http://localhost:5100/backend/acadsec/accepted"
        fetch(addresss , {
            method : 'get',
            headers : {
                'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
            },
            payload : {
                role : localStorage.getItem('role'),
            }
        })
        .then(res=>{
            if(res.ok)
            return res.json();
            else throw new Error("Something went wrong, please try again later")
        })
        .then(data => {
            console.log(data)
            setAccepted(data.AcceptedApplicants.acceptedApplicants);
            var b = [];
            b.length = data.AcceptedApplicants.acceptedApplicants.length;
            setByOnlineFile(b);
            setByOnlineOfferLetter(b);
        })
        .catch(err => {
            console.log(err);
        })

        const gApplicants = "http://localhost:5100/backend/acadSec/govtApplications/applicants";
        fetch(gApplicants , {
            method : "get",
            headers : {
                'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
            },
            payload : {
                role : localStorage.getItem('role'),
            }
        })
        .then(res=>{
            if(res.ok)
            return res.json();
            else throw new Error("Something went wrong, please try again later")
        })
        .then(data => {
            console.log(data)
            setGovtApplicants(data.Applicants); 
            var b = [];
            b.length = data.Applicants.length;
            setByGovtFile(b);  
            setByGovtOfferLetter(b);         
        })
        .catch(err => {
            console.log(err);
        })

    },[])

    const handleChangeOfferLetter = (e,mode) => {
        if(mode==="online")
        {
            var b = [...byOnlineOfferLetter];
            b[onlineIndex] = e.target.files[0];
            setByOnlineOfferLetter(b);
        }
        else {
            var b = [...byGovtOfferLetter];
            b[govtIndex] = e.target.files[0];
            setByGovtOfferLetter(b);
        }
    }
    const handleChangeNotesheet = (e,mode) => {
        if(mode==="online")
        {
            var b = [...byOnlineFile];
            b[onlineIndex] = e.target.files[0];
            setByOnlineFile(b);
        }
        else {
            var b = [...byGovtFile];
            b[govtIndex] = e.target.files[0];
            setByGovtFile(b);
        }
    }

    const handleUpload = (id,index) => {
        if(byOnlineFile[index]===undefined || byOnlineOfferLetter[index]===undefined)
        {
            alert("Please upload the documents");
            return ;
        }

        if(( byOnlineFile[index].type !=="application/pdf"))
        {
            alert("Please select a valid PDF file");
            return ;
        }
        if(( byOnlineOfferLetter[index].type !=="application/pdf"))
        {
            alert("Please select a valid PDF file");
            return ;
        }
        setLoading(true);
        const formdata = new FormData();
        formdata.append(
            "SignedNoteSheet",
            byOnlineFile[index],
            "SignedNoteSheet+"+id+".pdf"
        )
        const address = 'http://localhost:5100/backend/acadsec/signedNoteSheetsUpload/'+id;
        fetch(address , {
            method:"PATCH",
            body : formdata,
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
            setLoading(false);
            throw new Error("Something went wrong, please try again later")

        })
        .then(data => {
            
            console.log(data)
            if(data.message === "Signed NoteSheet Uploaded")
            {
                const offerletter = new FormData();
                offerletter.append(
                    "offerLetter",
                    byOnlineOfferLetter[index],
                    "OfferLetter+"+id+".pdf"
                )
                const address = "http://localhost:5100/backend/acadsec/offerLetterUpload/"+id;
                fetch(address , {
                    method:"PATCH",
                    body : offerletter,
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
                    setLoading(false);
                    throw new Error("Something went wrong, please try again later")
                })
                .then(data => {
                    console.log(data)
                    if(data.message === "OfferLetter Uploaded")
                    {
                        const address = "http://localhost:5100/backend/acadsec/confirmAcceptance/"+id
                        fetch(address, {
                            method : 'PATCH',
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
                            setLoading(false);
                            throw new Error("Something went wrong, please try again later")
                        })
                        .then(data => {
                            setLoading(false);
                            console.log(data)
                            if(data.message === "Process finished")
                            alert("The documents have been uploaded and the applicant has been finalized, please refresh the page to avoid confusions")
                            window.location.reload();
                        })
                        .catch(err => {
                            console.log("Error Confirming Acceptance")
                            alert("Error Confirming Acceptance") 
                            console.log(err)
                        })
                    }
                    else alert("Problem Uploading Offer Letter")
                })
                .catch(err => {
                    console.log("Uploading Offer Letter Error")
                    alert("Uploading Offer Letter Error")
                    console.log(err)
                })
            }
            else alert("Problem uploading signed notesheet, please try again later")
        })
        .catch(err => {
            console.log("Uploading Signed Notesheet Error")
            alert("Problem uploading signed notesheet, please try again later")
            console.log(err)
        })
    }
    const handleGovtUpload = (id,index) => {
        if(byGovtFile[index]===undefined || byGovtOfferLetter[index]===undefined )
        {
            alert("Please upload the documents");
            return ;
        }

        if(( byGovtFile[index].type !=="application/pdf"))
        {
            alert("Please select a valid PDF file");
            return ;
        }
        if(( byGovtOfferLetter[index].type !=="application/pdf"))
        {
            alert("Please select a valid PDF file");
            return ;
        }
        setLoading(true);
        const formdata = new FormData();
        formdata.append(
            "SignedNoteSheet",
            byGovtFile[index],
            "SignedNoteSheet+"+id+".pdf"
        )
        const address = 'http://localhost:5100/backend/acadsec/govtApplications/signedNoteSheetsUpload/'+id;
        fetch(address , {
            method:"PATCH",
            body : formdata,
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
            setLoading(false);
            throw new Error("Something went wrong, please try again later")

        })
        .then(data => {
            console.log(data)
            if(data.message === "Signed NoteSheet Uploaded")
            {
                const offerletter = new FormData();
                offerletter.append(
                    "offerLetter",
                    byGovtOfferLetter[index],
                    "OfferLetter+"+id+".pdf"
                )
                const address = "http://localhost:5100/backend/acadsec/govtApplications/offerLetterUpload/"+id;
                fetch(address , {
                    method:"PATCH",
                    body : offerletter,
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
                    setLoading(false);
                    throw new Error("Something went wrong, please try again later")
                })
                .then(data => {
                    console.log(data)
                    if(data.message === "OfferLetter Uploaded")
                    {
                        const address = "http://localhost:5100/backend/acadsec/govtApplications/confirmAcceptance/"+id
                        fetch(address, {
                            method : 'PATCH',
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
                            setLoading(false);
                            throw new Error("Something went wrong, please try again later")
                        })
                        .then(data => {

                            setLoading(false);
                            console.log(data)
                            if(data.message === "Process finished")
                            alert("The documents have been uploaded and the applicant has been finalized, please refresh the page to avoid confusions")
                            window.location.reload();
                        })
                        .catch(err => {
                            console.log("Error Confirming Acceptance")
                            alert("Error Conforming acceptance, please try again")
                            console.log(err)
                        })
                    }
                    else alert("Problem Uploading Offer Letter")
                })
                .catch(err => {
                    alert("Problem Uploading Offer Letter")
                    console.log("Uploading Offer Letter Error")
                    console.log(err)
                })
            }
            else alert("Problem uploading signed notesheet, please try again later")
        })
        .catch(err => {
            console.log("Uploading Signed Notesheet Error")
            alert("Problem uploading signed notesheet, please try again later")
            console.log(err)
        })
    }
    const RenderApplicants = () => {
        return accepted.map((user,index) => {
            const link =user.noteSheet;
            return(
                <tr>
                <td>{user.name}</td>
                <td>{user.contactDetails.email}</td>
                <td>Online</td>
                <td><a target="blank" href={link}><i className="fa fa-download"></i></a></td>
                <td><button onClick={()=>{setModal(true); setOnlineIndex(index); setMode('online')}}>Upload</button></td>
                <td>{byOnlineFile[index]!==undefined ? byOnlineFile[index].name : "No file uploaded" }</td>
                <td>{byOnlineOfferLetter[index]!==undefined ? byOnlineOfferLetter[index].name : "No file uploaded"}</td>
                <td><button onClick = {()=>{handleUpload(user._id,index)}}>Confirm</button></td>

            </tr>
            )
        })
    }
    const RenderGovtApplicants = () => {
        return govtApplicants.map((user,index) => {
            const link =user.noteSheet;
            return(
                <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.platform}</td>
                <td><a target="blank" href={link}><i className="fa fa-download"></i></a></td>
                <td><button onClick={()=>{setModal(true); setGovtIndex(index); setMode('govt')}}>Upload</button></td>
                <td>{byGovtFile[index]!==undefined ? byGovtFile[index].name : "No file uploaded" }</td>
                <td>{byGovtOfferLetter[index]!==undefined ? byGovtOfferLetter[index].name : "No file uploaded"}</td>
                <td><button onClick = {()=>{handleGovtUpload(user._id,index)}}>Confirm</button></td>
            </tr>
            )
        })
    }
    return (
        <div>
        <div className="margintop">
        { (accepted.length || govtApplicants.length) ? <table className="table table-striped">
        <thead>
        <tr>
                <th>Applicant Name</th>
                <th>Email</th>
                <th>Platform</th>
                <th>Notesheet Download</th>
                <th>Upload Documents</th>
                <th>Signed Notesheet</th>
                <th>Offer Letter</th>
                <th>Confirm Acceptance</th>
               
            </tr>
        </thead>
            <tbody>
            <RenderApplicants />
            <br />
            <br />
            
            <RenderGovtApplicants />
            </tbody>
        </table> : <NothingHere /> }
        </div>
        {
            loading ? ( <div className = "text-center margintop">
            Please wait while the Acceptance is being confirmed
            <br/>
            <span className="fa fa-spin fa-spinner fa-5x"></span>
            </div> ) : null
        }
       
       
        <Modal isOpen={isModalOpen} className="modal_stu container">                
                    <br />
                    <div className="row">
                        <div className="col-sm-8 offset-sm-4">
                        <Label>Upload Notesheet</Label>
                        <input onChange={(e)=>{handleChangeNotesheet(e,mode); }} type="file" placeholder="Please select a pdf file"></input>
                        </div>
                    </div>
                    <br />
                    <div className="row mt-5">
                        <div className="col-sm-8 offset-sm-4">
                        <Label>Upload OfferLetter</Label>
                        <input onChange={(e)=>{handleChangeOfferLetter(e,mode); }} type="file" placeholder="Please select a pdf file"></input>
                        </div>
                    </div>
                    <br/>
                <div>
                <button onClick={()=>{setModal(false)}} className ="pic_btn">Close</button>
                </div>
            </Modal>
        </div>
        
    )
}