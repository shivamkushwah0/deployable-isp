import React from 'react';

export default function Refree (props) {
    const qual = props.details.map((item)=>{
        return (
            <tr>
                <td>{item.organization}</td>
                <td>{item.name}</td>
                <td>{item.position}</td>
                <td>{item.email}</td>
                <td>{item.phoneNo}</td>
            </tr>
        )
    })

return (<>
    <div className="container mt-4"> <h2>Refree Details: </h2></div>
    <table className="mt-2 table table-striped">
        <thead>
        <tr>
            <th>Organization</th>
            <th>Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Contact Number</th>
        </tr>
        </thead>
        <tbody>
            {qual}
        </tbody>
        
    </table>
    </>)
}