import React,{useEffect , useState} from 'react';

export default function GovtApplicants (props) {
    const [applicants, setApplicants] = useState([]); 
    const [notesheet , setNotesheet] = useState(null);

    
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
        })
    },[])

    const handleForward = (aid) => {
        console.log(notesheet);
        if(notesheet === null || notesheet.type !== "application/pdf")
        {
            alert("Please upload the notesheet and in pdf format");
            setNotesheet(null);
            return ;
        }
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/department/govtApplications/uploadNotesheet/"+aid;
        const file = new FormData();
        file.append("noteSheet",notesheet);
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
                    else throw new Error("Something went wrong, please try again later");
                })
                .then(data=>{
                    alert(data);
                    window.location.reload();
                })
            }
            else throw new Error("Something went wrong, try again later");
        })
        .catch(err=> {
            console.log(err);

        })

    }

    const RenderApplicants = () => {
        console.log("helloooo")
        const Applicants = applicants.map((applicant)=>{
            // const link = '/hodstuprofile/'+this.props.hid+"/"+applicant._id;
            // console.log(link);
            return(
                
                <tr>
                        <td>{applicant.name}</td>
                        <td>{applicant.platform}</td>
                        <td>{applicant.email}</td>
                        <td><a href={applicant.application} target="blank"><i className="fa fa-download"></i></a></td>
                        <td><input key={applicant._id} type="file" placeholder="Upload notesheet pdf format" onChange={(e)=>{setNotesheet(e.target.files[0]); console.log(notesheet)}} /></td>
                        <td><button onClick={() => {handleForward(applicant._id)}}>Forward</button></td>
                </tr>
                
            )
        })
        return Applicants;
    }

    return (
        
        <div className="margintop">
            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Applicant Name</th>
                            <th>Platform</th>
                            <th>Email</th>
                            <th>Download Files</th>
                            <th>Upload Notesheet</th>
                            <th>Action</th>
                           
                        </tr>
                    </thead>
                        <tbody>
                            <RenderApplicants />
                        </tbody>
                    </table>
        </div>
    )
} 