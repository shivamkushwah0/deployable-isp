import React ,{useState, useEffect} from 'react'
import {Container, Row, Col ,Button } from  'react-bootstrap';
import Forwarded from './Forwarded';
import Registered from './Registered';
import Returned from './Returned';
import Rejected from './Rejected';
import './Picwindow.css';
import Modal  from 'react-modal';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText} from 'reactstrap';
import {Link} from 'react-router-dom'
import {InputLabel, TextField , MenuItem} from "@material-ui/core";
import GovtApplicants from './GovtApplicants';
import nothingHere from '../extras/nothingHere';
// import ModalHeader from 'react-bootstrap/esm/ModalHeader';
// import {Modal , ModalHeader, ModalFooter, ModalBody} from 'reactstrap';
export default function Picwindow(props) {
    const [isregistered,setisregistered]=useState(true);
    const [isreturned,setisreturned]=useState(false);
    const [iscancelled,setiscancelled]=useState(false);
    const [isforwarded,setisforwarded]=useState(false);
    const [isModalOpen , setModalOpen] = useState(false);
    const [role , setRole] = useState("");
    const [ department , SetDepartment] = useState('');
    const [file,setFile] = useState(null);
    const [platModal,setPlatModal] = useState(false);
    const [newRole, setNewRole] = useState("");
    const [adminVar , setAdminVar] = useState({});
    const [activeTab, setActiveTab] = useState('1');
    const [isGovtAppOpen , setGovtApp] = useState(false);
    const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
    setNewRole('');
    }

    useEffect(()=>{
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/allDetails";
        fetch(address,
            {
                method:"get"
            })
            .then(res => {
                if(res.ok)
                return res.json();
                else throw new Error("Something went wrong while fetching all details");
            })
            .then(data => {
                console.log(data);
                setAdminVar(data);
            })
    },[])
    const funcGovtApplicants = () => {
        setGovtApp(true);
        setisregistered(false);
        setisreturned(false);
        setiscancelled(false);
        setisforwarded(false)
    }

    const funcRegistered = () => {
        setisregistered(true);
        setisreturned(false);
        setiscancelled(false);
        setisforwarded(false);
        setGovtApp(false);
   }
   const funcReturned = () => {
        setisregistered(false);
        setisreturned(true);
        setiscancelled(false);
        setisforwarded(false)
        setGovtApp(false);
   }
   const funcCancelled = () => {
        setisregistered(false);
        setisreturned(false);
        setiscancelled(true);
        setisforwarded(false)
        setGovtApp(false);
   }
   const funcForwarded = () => {
        setisregistered(false);
        setisreturned(false);
        setiscancelled(false);
        setisforwarded(true)
        setGovtApp(false);
   }
   const handleSubmitApplication = () => {
       console.log(role);
       console.log(department);
       console.log(file);
       const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/admin/govtApplications/addApplications";
       if(file == null || file.type !=="application/x-zip-compressed")
       {
           alert("Please insert a zip file to proceed");
           return ;
       }
       else if(role.length === 0 || department.length===0)
       {
           alert("Please fill the required fields")
           return ;
       }
       const filedata = new FormData();
       filedata.append("application",file);
       filedata.append("department",department);
       filedata.append("platform",role);
       console.log(filedata);
       fetch (address , {
           method : "post",
           body:filedata,  
       })
       .then(res=>{
           if(res.ok)
           return res.json();
           else throw new Error("Something went wrong, please try again");
       })
       .then(data => {
           console.log(data);
           setModalOpen(false);
           alert("The application has been sent to the concerned authorities");
           setFile(null);
           setRole('');
           SetDepartment('');
       })
       .catch(err => {
           console.log(err);
       })
   }

   const handleSubmitNewRoleAdd = () => {
       if(newRole.length===0)
       {
           alert("Please fill the required field");
           return ;
       }
       const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/admin/platForms";

       adminVar.platForms.push(newRole);

       fetch (address , {
           method : "PATCH",
           headers: {
            "Content-Type":"application/json"
            },
           body : JSON.stringify({
            platForms : adminVar.platForms
           })
       })
       .then(res => {
           if(res.ok)
           return res.json();
           else throw new Error("Something went wrong, please try again later");
       })
       .then(data => {
           console.log(data);
           alert("New Programe named "+newRole +" is added");
           setPlatModal(false);
           window.location.reload();
       })
       .catch(err=>{
           console.log(err);
       })
   }
   const handleSubmitNewRoleRemove = () => {
    if(newRole.length===0)
    {
        alert("Please fill the required field");
        return ;
    }
    const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/admin/platForms";

    const platforms = adminVar.platForms.filter((platform)=>platform!==newRole)
    console.log(platforms);
    fetch (address , {
        method : "PATCH",
        headers: {
         "Content-Type":"application/json"
         },
        body : JSON.stringify({
         platForms : platforms
        })
    })
    .then(res => {
        if(res.ok)
        return res.json();
        else throw new Error("Something went wrong, please try again later");
    })
    .then(data => {
        console.log(data);
        alert("Programe named "+newRole +" is removed");
        setPlatModal(false);
        window.location.reload();
    })
    .catch(err=>{
        console.log(err);
    })
}

    return (
        <div>
    <div className="container margintop">
        <div className="mb-5 tab_btn_section">
                  <Row>
                    <Col md={2}>
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
                    <Col md={2}>
                    <button onClick={funcForwarded} type='btn' className="pic_btn">Forwarded Students</button>
                    </Col>
                    <Col md={2}>
                    <button onClick={funcGovtApplicants} type='btn' className="pic_btn">Selected Governent Applicants</button>
                    </Col>
                  </Row>
                </div>
            {
                isregistered && iscancelled === false && isreturned === false && isforwarded === false && !isGovtAppOpen ? 
                (
                    <div>
                    <Registered aid={props.match.params.id}/>
                    
                    </div>
                )
                :isregistered === false && iscancelled && isreturned === false && isforwarded === false && !isGovtAppOpen ?
                (<div>
                    <Rejected aid={props.match.params.id}/>
                    
                    </div>
                )
                :isregistered === false && iscancelled===false && isreturned && isforwarded === false  && !isGovtAppOpen?
                (   <div>
                    <Returned aid={props.match.params.id}/>
                    
                    </div>
                )
                :isregistered === false && iscancelled===false && isreturned===false && isforwarded && !isGovtAppOpen?
                (   <div>
                    <Forwarded aid={props.match.params.id}/>
                    
                    </div>
                )  
                :isregistered === false && iscancelled===false && isreturned===false && !isforwarded && isGovtAppOpen?
                (   <div>
                    <GovtApplicants aid={props.match.params.id}/>
                    
                    </div>
                )  
                :null
            }
            <div className="row text-center">
                    <button className="pic_btn" onClick={()=>{setModalOpen(true);}}>Government Application</button>
                    <button className="pic_btn" onClick={()=>{setPlatModal(true);}}>Add/Remove Platforms</button>
                    </div>
                    <div  className="margintop text-center"> 
                    <Link to={`/picmyprofile/${props.match.params.id}`}><button type='btn' className="active tab_btn pic_btn">My Profile</button></Link>
                    

                    </div>
            </div>
            <Modal isOpen={isModalOpen} className="modal_stu container">                
                    <div className ="row">
                    <div className="col-sm-3">Branch<span style={{color:"red" , fontWeight:"bolder"}}>*</span></div>
                    <div className="col-sm-9">
                    <TextField variant="filled" className="textfield" select name="branch" value={department} onChange = {(e)=>{SetDepartment(e.target.value); console.log(department)}}>
                    {adminVar.departments ?
                    (
                        adminVar.departments.map(department=> {
                            return <MenuItem value={department}>{department}</MenuItem>
                        })
                    )
                    : null}
                    </TextField>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-sm-3">Platform<span style={{color:"red" , fontWeight:"bolder"}}>*</span></div>
                    <div className="col-sm-9">
                    <TextField variant="filled" className="textfield" select name="platform" value={role} onChange = {(e)=>{setRole(e.target.value); console.log(role)}}>
                        {/* <RenderPlatforms /> */}
                        {
                           adminVar.platForms ? adminVar.platForms.map((platform)=>{
                                return(
                                <MenuItem value={platform}>{platform}</MenuItem>
                                )
                            }) : null
                        }
                    </TextField>
                    </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-8 offset-sm-4">
                        <input onChange={(e)=>{setFile(e.target.files[0]); console.log(file) }} type="file" placeholder="Please select a zip file"></input>
                        </div>
                    </div>
                    <br />
                    <br/>
                
                <div>
                <button onClick={handleSubmitApplication} className ="pic_btn">Submit</button>
                <button onClick={()=>{setModalOpen(false)}} className ="pic_btn">Close</button>
                </div>
            </Modal>
            <Modal isOpen={platModal} className="modal_stu container">  
            <Nav style={{width:"100%"}} tabs>
                <NavItem style={{cursor:"pointer"}}>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                         onClick={() => { toggle('1'); }}
                    >
                        Add Platform
                    </NavLink>
                </NavItem>
                <NavItem style={{cursor:"pointer"}}>
                    <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => { toggle('2'); }}
                    >
                        Remove Platform
                    </NavLink>
                </NavItem>
            </Nav> 
            <TabContent style={{width:"100%"}} activeTab={activeTab}>
        <TabPane style={{width:"100%"}} tabId="1">
        <div className="row">
            <br />
                    <div className="col-sm-3">New Platform<span style={{color:"red" , fontWeight:"bolder"}}>*</span></div>
                    <div className="col-sm-9">
                    <TextField variant="filled" className="textfield" text name="platform" value={newRole} onChange = {(e)=>{setNewRole(e.target.value); console.log(newRole)}}>
                    </TextField>
                    </div>
                    </div>
                    <div className="text-center">
                    <br />
                    <br />
                    <button onClick={handleSubmitNewRoleAdd} className ="pic_btn">Add</button>
                    <button onClick={()=>{setPlatModal(false)}} className ="pic_btn">Close</button>
                    </div>        
        </TabPane >
        <TabPane style={{width:"100%"}} tabId="2">
        <div className="row"><br />
        <div className="col-sm-3">Platform to be Removed<span style={{color:"red" , fontWeight:"bolder"}}>*</span></div>
                    <div className="col-sm-9">
                    <TextField variant="filled" className="textfield" select name="platform" value={newRole} onChange = {(e)=>{setNewRole(e.target.value); console.log(newRole)}}>
                    {
                           adminVar.platForms ? adminVar.platForms.map((platform)=>{
                                return(
                                <MenuItem value={platform}>{platform}</MenuItem>
                                )
                            }) : null
                        }
                    </TextField>
                    </div>
                    </div>
                    <div className="text-center">
                    <br />
                    <br />
                    <button onClick={handleSubmitNewRoleRemove} className ="pic_btn">Remove</button>
                    <button onClick={()=>{setPlatModal(false)}} className ="pic_btn">Close</button>
        </div>   
        </TabPane>
      </TabContent>
                    
                    <br />
            
            </Modal>
            </div>
           
    )
}
