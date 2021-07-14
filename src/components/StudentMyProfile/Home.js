import React, {useRef} from 'react'
import logo from '../Login/logo.png'
import './StudentMyProfile.css';
import {Button} from 'react-bootstrap';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import PDF from '../PdfGenerate/PDF';

export default function Home(props) {
    console.log(props);
    const componentRef = useRef();
    const handlePrint =  useReactToPrint({
            content : () => componentRef.current,
    });
    return (
        <div>
            <div className = "d-none">
                { props.data ?  <PDF details = {props.data}  ref = {componentRef} /> : null} 
            </div>
            <div className="home">
                <div className="profile">
                    <div className="profile_inner">
                        <div className="profile_img">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="name">
                            <h1>Welcome , {!props.data?null:props.data.name} </h1>
                            
                        </div>
                    </div>
                </div>
                <div className="details">
                    <div className="status">
                        <h4>Current Status</h4>
                        <div className="status_details">
                            <div className="det">
                                <h4 style={{padding:"20px"}}>{!props.data?null:props.data.applicationStatus}</h4>
                                { props.data && props.data.applicationStatus==="Returned"  ? <h4 style={{padding:"20px"}}>{props.data.statusComment}</h4> : null }
                            </div>
                            <div>
                                
                                {!props.data?null:props.data.applicationStatus==='Not Submitted' || props.data.applicationStatus==='Returned' || props.data.applicationStatus==='Submitted'  ? <Button onClick ={()=>{window.location.href = "https://iitp-isa.netlify.app/stuinfo/"+props.data._id}} >Submit or Edit Application</Button> : null }
                                {!props.data?null : props.data.applicationStatus != 'Not Submitted' ? <Button onClick={handlePrint} className = "btn btn-secondary ml-3">Download application <span className = "fa fa-download"></span></Button> : null }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
