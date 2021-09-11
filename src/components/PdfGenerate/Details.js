<<<<<<< HEAD
import React from 'react';

export default function Details (props) {
    return (<>
    <div className="container m-3" > <h2>Personal Details: </h2>
    <div className="row">
        <div className="col-9">
        <div className="row mt-2">
        <div className="col-6">
            <b>Name: </b><br/> {props.details.name}
        </div>
        <div className="col-6"> <b>Date of Birth: </b><br/> {props.details.dob}</div>
    </div>
    <div className="row mt-2">
        <div className="col-6"><b>Gender: </b><br/>{props.details.gender}</div>
        <div className="col-6"><b>Nationality: </b><br/>{props.details.nationality}</div>
    </div>
    <div className="row mt-2">
        <div className="col-6"><b>Progam: </b><br/>{props.details.program}</div>
        <div className="col-6"><b>Department: </b> <br/>{props.details.department}</div>
    </div>
    <div className="row mt-2">
        <div className="col-6"><b>Category:</b> <br/>{props.details.category}</div>
        <div className="col-6"><b>Email: </b><br/> {props.details.email}</div>
    </div>
        </div>
        <div className="col-3">
            <img src={props.details.img} alt={props.details.name} height={100} width={100} />
        </div>
    </div>
    </div>
    </>)
=======
import React from 'react';

export default function Details (props) {
    return (<>
    <div className="container m-3" > <h2>Personal Details: </h2>
    <div className="row">
        <div className="col-9">
        <div className="row mt-2">
        <div className="col-6">
            <b>Name: </b><br/> {props.details.name}
        </div>
        <div className="col-6"> <b>Date of Birth: </b><br/> {props.details.dob}</div>
    </div>
    <div className="row mt-2">
        <div className="col-6"><b>Gender: </b><br/>{props.details.gender}</div>
        <div className="col-6"><b>Nationality: </b><br/>{props.details.nationality}</div>
    </div>
    <div className="row mt-2">
        <div className="col-6"><b>Progam: </b><br/>{props.details.program}</div>
        <div className="col-6"><b>Department: </b> <br/>{props.details.department}</div>
    </div>
    <div className="row mt-2">
        <div className="col-6"><b>Category:</b> <br/>{props.details.category}</div>
        <div className="col-6"><b>Email: </b><br/> {props.details.email}</div>
    </div>
        </div>
        <div className="col-3">
            <img src={props.details.image} alt={props.details.name} height={100} width={100} />
        </div>
    </div>
    </div>
    </>)
>>>>>>> 564ad86749eef578324d71da6fb6c16d606ace85
}