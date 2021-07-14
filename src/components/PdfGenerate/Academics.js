import React from 'react';

export default function Academics (props) {

    console.log(props.details)
    const qual = props.details.map((item)=>{
        return (
            <tr>
                <td>{item.boardOrUniversity}</td>
                <td>{item.degree}</td>
                <td>{item.schoolOrCollege}</td>
                <td>{item.percentageOrCgpa}/{item.outOf}</td>
                <td>{item.year}</td>
            </tr>
        )
    })

return (<>
    <div className="container mt-4"> <h2>Academics: </h2></div>
    <table className="mt-2 table table-striped">
        <thead>
        <tr>
            <th>Board/University</th>
            <th>Degree/Specialization</th>
            <th>School/College</th>
            <th>Score</th>
            <th>Year</th>
        </tr>
        </thead>
        <tbody>
            {qual}
        </tbody>
        
    </table>
    </>)
}
