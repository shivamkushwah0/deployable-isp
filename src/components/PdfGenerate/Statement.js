import React from 'react';

export default function Statement (props) {
    return (<>
        <div className="container mt-4" > <h2>Statement of Purpose: </h2></div>
        <div className="mt-2">
            {props.details}
        </div>
        </>)
}