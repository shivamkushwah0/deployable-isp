import React from 'react';

export default function Toefl (props) {
    return (<>
        <div className="container mt-4" > <h2>TOEFL: </h2>
    <div className="row mt-2">
        <div className="col-6">
            <b>Institute: </b> <br/>{props.details.institute}
        </div>
        <div className="col-6"> <b>Registration Number: </b> <br/>{props.details.registrationNo}</div>
    </div>
    <div className="row mt-2">
        <div className="col-6"><b>Reading Score: </b> <br/>{props.details.readingScore}</div>
        <div className="col-6"><b>Speaking Score: </b><br/>{props.details.speakingScore}</div>
    </div>
    <div className="row mt-2">
        <div className="col-6"><b>Writing Score: </b><br/>{props.details.writingScore}</div>
        <div className="col-6"><b>Total Score: </b><br/>{props.details.totalScore}</div>
    </div>
    <div className="row mt-2">
        <div className="col-6"><b>Year: </b><br/>{props.details.year}</div>
    </div>
    </div>
        </>)
}