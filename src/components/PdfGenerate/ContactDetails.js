import React from 'react';

export default function ContactDetails (props) {
    return (<>
       <div className="container mt-4" > <h2>Contact Details: </h2>
    <div className="row mt-2">
        <div className="col-6">
            <b>Email Address: </b><br/> {props.details.email}
        </div>
        <div className="col-6"> <b>Contact Number: </b><br/> {props.details.mobileNumber}</div>
    </div>
    <div className="row mt-2">
        <div className="col-6"><b>Passport Number: </b><br/>{props.details.passportNo}</div>
        <div className="col-6"><b>Permanent Address: </b><br/><span>{props.details.permanentAddress}</span></div>
    </div>
    <div className="row mt-2">
        <div className="col-6"><b>Present Address: </b><br/>{props.details.presentAddress}</div>
        <div className="col-6"></div>
    </div>
    </div>
        </>)
    }
