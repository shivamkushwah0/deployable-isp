import React,{useEffect , useState} from 'react';

export default function GovtApplicants (props) {
    const [applicants, setApplicants] = useState([]); 
    useEffect(()=>{
        const  address = 'https://iitp-isa-portal-backend.herokuapp.com/backend/admin/govtApplications/applicants';
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
        .catch(err => {
            alert("Someting went wrong, please try again later");
        })
    },[])

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
                        <td>{applicant.applicationStatus}</td>
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
                            <th>Status</th>
                        </tr>
                    </thead>
                        <tbody>
                            <RenderApplicants />
                        </tbody>
                    </table>
        </div>
    )
}