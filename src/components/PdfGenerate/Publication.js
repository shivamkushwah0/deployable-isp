import React from 'react';

export default function Publication (props) {
    var qual = props.details.map((item,index) => {
        return (<>
        <li className="mt-1">Google Drive Link - {item} </li>
        </>)
    })
    return (<>
        <div className="container mt-4" > <h2>Publications: </h2></div>
        <div style={{fontSize:17 }}>
        <ul className ="ml-1">
            {qual}
        </ul>
        </div>
        </>)
}