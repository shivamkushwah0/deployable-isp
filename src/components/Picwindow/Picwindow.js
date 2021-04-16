import React ,{useState} from 'react'
import {Container, Row, Col ,Button } from  'react-bootstrap';
import Forwarded from './Forwarded';
import Registered from './Registered';
import Returned from './Returned';
import Rejected from './Rejected';
import './Picwindow.css';
import Modal  from 'react-modal';
import {InputLabel, TextField , MenuItem} from "@material-ui/core";
// import ModalHeader from 'react-bootstrap/esm/ModalHeader';
// import {Modal , ModalHeader, ModalFooter, ModalBody} from 'reactstrap';
export default function Picwindow(props) {
    const [isregistered,setisregistered]=useState(true);
    const [isreturned,setisreturned]=useState(false);
    const [iscancelled,setiscancelled]=useState(false);
    const [isforwarded,setisforwarded]=useState(false);
    const [isModalOpen , setModalOpen] = useState(false);
    const [role , setRole] = useState('');
    const [ department , SetDepartment] = useState('');
    const [file,setFile] = useState(null);
    const funcRegistered = () => {
        setisregistered(true);
        setisreturned(false);
        setiscancelled(false);
        setisforwarded(false)
   }
   const funcReturned = () => {
        setisregistered(false);
        setisreturned(true);
        setiscancelled(false);
        setisforwarded(false)
   }
   const funcCancelled = () => {
        setisregistered(false);
        setisreturned(false);
        setiscancelled(true);
        setisforwarded(false)
   }
   const funcForwarded = () => {
        setisregistered(false);
        setisreturned(false);
        setiscancelled(false);
        setisforwarded(true)
   }
    return (
        <>
    <div className="container margintop">
        <div className="mb-5 tab_btn_section">
                  <Row>
                    <Col md={3}>
                         {
                              isregistered ? 
                              <button onClick={funcRegistered} type='btn' className="active tab_btn pic_btn">Registered Students</button> : 
                              <button onClick={funcRegistered} type='btn' className="pic_btn">Registered Students</button>
                         }
                      
                    </Col>
                    <Col md={3}>
                    <button onClick={funcReturned} type='btn' className="pic_btn">Returned Students</button>
                    </Col>
                    <Col md={3}>
                    <button onClick={funcCancelled} type='btn' className="pic_btn">Cancelled Students</button>
                    </Col>
                    <Col md={3}>
                    <button onClick={funcForwarded} type='btn' className="pic_btn">Forwarded Students</button>
                    </Col>
                  </Row>
                </div>
            {
                isregistered && iscancelled === false && isreturned === false && isforwarded === false ? 
                (
                    <>
                    <Registered aid={props.match.params.id}/>
                    
                    </>
                )
                :isregistered === false && iscancelled && isreturned === false && isforwarded === false ?
                (<>
                    <Rejected aid={props.match.params.id}/>
                    
                    </>
                )
                :isregistered === false && iscancelled===false && isreturned && isforwarded === false ?
                (   <>
                    <Returned aid={props.match.params.id}/>
                    
                    </>
                )
                :isregistered === false && iscancelled===false && isreturned===false && isforwarded ?
                (   <>
                    <Forwarded aid={props.match.params.id}/>
                    
                    </>
                )  
                :null
            }
            <div className="row text-center">
                    <button className="pic_btn" onClick={()=>{setModalOpen(true); setRole("study_in_india"); console.log(role)}}>Study In India</button>
                    <button className="pic_btn" onClick={()=>{setModalOpen(true); setRole("asean"); console.log(role)}}>Asean</button>
                    </div>
            <button onClick={()=> {window.location.href='http://localhost:3000/picmyprofile/'+props.match.params.id}} type='btn' className="active tab_btn pic_btn">My Profile</button>
            </div>
            <Modal isOpen={isModalOpen} className="modal_stu container">                
                    <div className ="row">
                    <div className="col-sm-3">Branch<span style={{color:"red" , fontWeight:"bolder"}}>*</span></div>
                    <div className="col-sm-9">
                    <TextField variant="filled" className="textfield" select name="branch" value={department} onChange = {(e)=>{SetDepartment(e.target.value); console.log(department)}}>
                    <MenuItem value="CSE">CSE</MenuItem>
                    <MenuItem value="EE">EE</MenuItem>
                    <MenuItem value="EEE">EEE</MenuItem>
                    <MenuItem value="CCSE">CCSE</MenuItem>
                    <MenuItem value="PPP">PPP</MenuItem>
                    </TextField>
                    </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-8 offset-sm-4">
                        <input onChange={(e)=>{setFile(e.target.files[0])}} type="file" placeholder="Please select a zip file"></input>
                        </div>
                    </div>
                    <br />
                    <br/>
                
                <div style={{float:'right'}}>
                <button className ="pic_btn">Submit</button>
                <button onClick={()=>{setModalOpen(false)}} className ="pic_btn">Close</button>
                </div>
            </Modal>
            </>
           
    )
}
