import React from 'react';

export default function Gre (props) {
    return (<>
        <div className="container mt-4" > <h2>GRE: </h2>
    <div className="row mt-2">
        <div className="col-6">
            <b>Institute: </b> <br/>{props.details.institute}
        </div>
        <div className="col-6"> <b>Registration Number: </b> <br/>{props.details.registrationNo}</div>
    </div>
    <div className="row mt-2">
        <div className="col-6"><b>General Test Score: </b><br/> {props.details.genTestScore}</div>
        <div className="col-6"><b>Subject Test Score: </b><br/>{props.details.subTestScore}</div>
    </div>
    <div className="row mt-2">
        <div className="col-6"><b>Year: </b><br/>{props.details.year}</div>
    </div>
    </div>
        </>)
}