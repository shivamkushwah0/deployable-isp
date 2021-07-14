import React from 'react';

export default function Profession (props) {
    console.log(props.details)
    const qual = props.details.map((item)=>{
        return (
            <tr>
                <td>{item.organization}</td>
                <td>{item.period}</td>
                <td>{item.positionHeld}</td>
            </tr>
        )
    })

    return (<>
        <div className="container mt-4"> <h2>Professional Experience: </h2></div>
    <table className="mt-2 table table-striped">
        <thead>
        <tr>
            <th>Organisation</th>
            <th>Period </th>
            <th>positionHeld</th>
        </tr>
        </thead>
        <tbody>
            {qual}
        </tbody>
        
    </table>
        </>)
}