import React , { useState , useEffect } from 'react';
import {Container, Row, Col ,Button} from  'react-bootstrap';

export default function GovtApplications () {
    
    const [asean , setAsean ] = useState({});
    const [studyIndia, setStudyIndia] = useState({});
    const AddApplicant = () => {

    }
    const [platform, setPlatform] = useState('');
    const RenderApplicants = () => {
        return ;
    }
    return (
        <Container>
            <Row>
                <Col md={4}>
                <h3>Study In India Scholarship</h3>
                <br />

                <a style={{fontFamily:"sans-serif" , fontSize:"18px"}} href={studyIndia.application}>Download Study India Applicants<span className="ml-5 fa fa-download"></span></a>
                <br />
                <button className=""></button>
                </Col>
                
                <Col md={8}>
                    <h4>Forwarded Applicants</h4>
                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Applicant Name</th>
                            <th>Email</th>
                            <th>Application Download</th>
                        </tr>
                    </thead>
                        <tbody>
                        {/* <RenderApplicants /> */}
                        </tbody>
                    </table>
                </Col>
            </Row>
            <hr  />
            <Row>
            <Col md={4}>
                <h3>ASEAN Scholarship</h3>
                <br />
                <a style={{fontFamily:"sans-serif" , fontSize:"18px"}} href={asean.application}>Download ASEAN Applicants<span className="ml-5 fa fa-download"></span></a>
                </Col>
                
                <Col md={8}>
                    <h4>Forwarded Applicants</h4>
                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Applicant Name</th>
                            <th>Email</th>
                            <th>Application Download</th>
                        </tr>
                    </thead>
                        <tbody>
                        {/* <RenderApplicants /> */}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    )
}