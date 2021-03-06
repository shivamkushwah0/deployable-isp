import React , { useState , useEffect } from 'react';
import {Container, Row, Col ,Button} from  'react-bootstrap';
import GovtForwarded from './GovtForwarded';
import GovtApplicants from './GovtApplicants'
import AddApplicant from './AddApplicant';
import NothingHere from '../extras/nothingHere'
export default function GovtApplications (props) {
    
    const [showApp, setShowApp] = useState(false);
    const [showForwarded, setShowForwarded] = useState(false);
    const [showadd , setShowAdd] = useState(true);
    const [applications , setApplications] = useState([]);
    const [downApp , ShowDownApp] = useState(false);

    useEffect(()=>{
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/department/govtApplications/applications/"+props.hid;
        fetch(address , {
            method : "get",
            headers : {
                'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
            },
            
        })
        .then(res => {
            if(res.ok)
            return res.json();
            else throw new Error ("Something went wrong, please try again later");
        })
        .then(data => {
            console.log(data);
            setApplications(data.Applications)
        })
        .catch(err => {
            console.log(err);
        })
    } , [])

    const showapplicants = () => {
        setShowApp(true);
        setShowForwarded(false);
        setShowAdd(false);
    }
    const showforwarded = () => {
        setShowApp(false);
        setShowForwarded(true);
        setShowAdd(false);
    }
    const showaddapplicant = () => {
        setShowApp(false);
        setShowForwarded(false);
        setShowAdd(true);
    }
    const handleRemove = (id) => {
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/department/govtApplications/removeApplication/"+id;
        fetch(address , {
            method : "PATCH",
            headers : {
                'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
            },
            
        })
        .then(res => {
            if(res.ok)
            return res.json();
            else throw new Error ("Something went wrong, please try again later");
        })
        .then(data => {
            console.log(data);
            alert(data.message);
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
        })
    }
    const RenderApplications = () => {
        const Applications = applications.map(application => {
            if(application.department === props.hid)
            return (
                <tr>
                        <td>{application.platform}</td>
                        <td> <a href={application.application} target="blank"><i className="fa fa-download" /></a></td>
                        <td><button onClick={()=>{handleRemove(application._id)}}>Remove</button></td>
                        
                </tr>
            )
        })
        return Applications;
    }
    return (
        <Container className="margintop">
            <hr />
            <Row>
            <Col md={4}>
                <button className={ showApp ? "pic_btn_active" : "pic_btn"} onClick={showapplicants}>Added Government Applicants</button>
            </Col>
            <Col md={4}>
            <button className={ showForwarded ? "pic_btn_active" : "pic_btn"} onClick={showforwarded}>Forwarded Government Applicants</button>
            </Col>
            <Col md={4}>
            <button className={ showadd ? "pic_btn_active" : "pic_btn"} onClick={showaddapplicant}>Add Selected Government Applicant</button>
            </Col>
            </Row>
            <Row>
            <Col md={12}>
            {showApp ? <GovtApplicants toHome={showapplicants} hid={props.hid}/> : null}
            {showForwarded ? <GovtForwarded toHome={showapplicants}  hid={props.hid}/> : null}
            {showadd ? <AddApplicant toHome={showapplicants} hid={props.hid}/> : null}
            </Col>
            </Row>
            <Row>
            <Col md={12} className="text-center margintop">
            <button onClick={()=>{ShowDownApp(!(downApp))}} className={ downApp ? "pic_btn_active text-center" : "pic_btn text-center"}>
                Download Applications
            </button>
            </Col>
            {downApp ? (<Col className="margintop" md={12}>
            {applications.length ?  <table className="table table-striped">
                    <thead>
                        <tr>
                            <th width="40%">Platform</th>
                            <th>Download Applications</th>
                            <th >Action</th>
                           
                        </tr>
                    </thead>
                        <tbody>
                            <RenderApplications />
                        </tbody>
                    </table> : 
                    <NothingHere />
                    }
            </Col>) : null }
            </Row>
            
        </Container>
    )
}