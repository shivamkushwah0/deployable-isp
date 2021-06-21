import Modal  from 'react-modal';
import React,{useEffect , useState} from 'react';
import NothingHere from '../extras/nothingHere'
export default function GovtApplicants (props) {
    const [applicants, setApplicants] = useState([]); 
    const [notesheet , setNotesheet] = useState([]);
    const [isModalOpen , setModal] = useState(false);
    const [note , setNote] = useState(0);
    useEffect(()=>{
        const  address = 'https://iitp-isa-portal-backend.herokuapp.com/backend/department/govtApplications/applicants/'+props.hid;
        console.log(address);
        fetch(address , {
            method : 'get'
        })
        .then(res => {
            if(res.ok)
            return res.json();
            else throw new Error("Something went wrong please try again later");
        })
        .then(data => {
            console.log(data);
            setApplicants(data.Applicants);
            const a = data.Applicants.length;
            var notes = [];
            notes.length = a;
            setNotesheet(notes);
        })
    },[])

    const handleForward = (aid,index) => {
        console.log(notesheet[index]);
        if(notesheet[index] === undefined || notesheet[index].type !== "application/pdf")
        {
            alert("Please upload the notesheet and in pdf format");
            setNotesheet(null);
            return ;
        }
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/department/govtApplications/uploadNotesheet/"+aid;
        const file = new FormData();
        file.append("noteSheet",notesheet[index]);
        fetch(address , {
            method : "PATCH",
            body:file
        })
        .then(res => {
            if(res.ok)
            return res.json();
            else throw new Error("Something went wrong, please try again later");
        })
        .then(data => {
            console.log(data);
            if(data.message)
            {
                const acceptAddress = "https://iitp-isa-portal-backend.herokuapp.com/backend/department/govtApplications/acceptApplicant/"+aid;
                fetch(acceptAddress , {
                    method : "PATCH"
                })
                .then(res=>{
                    if(res.ok)
                    return res.json();
                    else {
                        alert("Something went wrong, please try again later");
                        throw new Error("Something went wrong, please try again later");
                    }
                })
                .then(data=>{
                    console.log(data);
                    alert(data.message);
                    props.toHome();
                })
            }
            else throw new Error("Something went wrong, try again later");
        })
        .catch(err=> {
            console.log(err);

        })

    }
    const handleNotesheetchange = (e,index) => {
        const a = [...notesheet];
        a[index] = e.target.files[0];
        setNotesheet(a);
        console.log(a);
    }
    const RenderApplicants = () => {
        console.log("helloooo")
        const Applicants = applicants.map((applicant,index)=>{
            return(
                <tr>
                        <td>{applicant.name}</td>
                        <td>{applicant.platform}</td>
                        <td>{applicant.email}</td>
                        <td><a href={applicant.application} target="blank"><i className="fa fa-download"></i></a></td>
                        <td><button onClick={()=>{setModal(true); setNote(index)}}><i className="fa fa-upload"></i></button></td>
                        <td>{notesheet[index]!=undefined ? notesheet[index].name : "No files added"}</td>
                        <td><button onClick={() => {handleForward(applicant._id,index)}}>Forward</button></td>
                </tr>
                
            )
        })
        return Applicants;
    }

    return (<>
    <div className="margintop">
            {applicants.length!==0 ?  <table className="table table-striped text-center">
                    <thead>
                        <tr>
                            <th>Applicant Name</th>
                            <th>Platform</th>
                            <th>Email</th>
                            <th>Download Files</th>
                            <th>Upload Notesheet</th>
                            <th>File Name</th>
                            <th>Action</th>
                           
                        </tr>
                    </thead>
                        <tbody>
                            <RenderApplicants />
                        </tbody>
                    </table> : 
                    <NothingHere />
                    }
        </div>
        <Modal isOpen={isModalOpen} className="modal_stu container">                
                    <br />
                    <div className="row">
                        <div className="col-sm-8 offset-sm-4">
                        <input onChange={(e)=>{handleNotesheetchange(e,note); }} type="file" placeholder="Please select a pdf file"></input>
                        </div>
                    </div>
                    <br />
                    <br/>
                <div>
                <button onClick={()=>{setModal(false)}} className ="pic_btn">Close</button>
                </div>
            </Modal>
    </>
    )
} 