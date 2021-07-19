import React ,{useEffect,useState , useRef} from 'react'
import './StudentProfile.css'
import Container from '@material-ui/core/Container'
import Label from '@material-ui/core/InputLabel'
import Modal from 'react-modal'
import {Link} from 'react-router-dom'
import PDF from "../PdfGenerate/PDF"
import {useReactToPrint} from "react-to-print";
export default function StudentProfile(props) {
    const [modalIsOpen,setModalIsOpen] =useState(false)
    const [user , setUser] = useState({});
    const [returnModal , setReturnModal] = useState(false);
    const [returnMess , setReturnMess] = useState('');
    const [rejectMess , setRejectMess] = useState('');
    useEffect(() => {
        setModalIsOpen(false);
        
        const id = props.match.params.id;
        const address = 'https://iitp-isa-portal-backend.herokuapp.com/backend/applicant/profile/'+id;
        fetch(address , {
            method : "get"
        })
        .then(res => {
            if(res.ok)
            return res.json();
            else throw Error("Something went wrong , please try again later")
        })
        .then(data => {
            console.log(data.applicantDetails)
            setUser(data.applicantDetails);
            console.log(user);
        })
        .catch(err => console.log(err))

    },[])
    const handleForward =() => {
        const address = 'https://iitp-isa-portal-backend.herokuapp.com/backend/admin/forwardApplication/'+props.match.params.id;
        fetch(address , {
            method : 'PATCH',
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify({
                departmentId : user.department
            })
        })
        .then(res=>res.json())
        .then(data => {
             console.log(data)
             console.log("the application is forwarded");
             window.location.href="https://iitp-isa.netlify.app/picwindow/"+props.match.params.aid;
        })
        .catch(err => console.log(err))
        
    }
    const handleReturn =() => {
        const address = 'https://iitp-isa-portal-backend.herokuapp.com/backend/admin/returnApplication/'+props.match.params.id;
        fetch(address , {
            method : 'PATCH',
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify({
                message : returnMess
            })
        })
        .then(res=>res.json())
        .then(data => {
            console.log(data)
            window.location.href="https://iitp-isa.netlify.app/picwindow/"+props.match.params.aid;
        })
        .catch (err => console.log(err))
    }
    const handleReject = () => {
        const address = 'https://iitp-isa-portal-backend.herokuapp.com/backend/admin/cancelApplication/'+props.match.params.id;
        fetch(address , {
            method : 'PATCH',
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify({
                message : rejectMess
            })
        })
        .then(res=>res.json())
        .then(data => {
            console.log(data)
            window.location.href="https://iitp-isa.netlify.app/picwindow/"+props.match.params.aid;
        })
        .catch (err => console.log(err))
    }
    const componentRef = useRef();
    const handlePrint =  useReactToPrint({
            content : () => componentRef.current,
    });
    return (
        <div>
            <div style={{position:'relative'}}>
            <div style={{float:"left",marginTop:"20px",marginLeft:"35px"}} >
                <Link to={`/picwindow/${props.match.params.aid}`}><button className="pic_btn"> Back</button></Link>
                
            </div>
            <div className = "d-none">
                { user.name ?  <PDF details = {user}  ref = {componentRef} /> : null} 
            </div>
           {user.applicationStatus != undefined && user.applicationStatus =="Submitted" ? ( <div className="row" style={{float:"left",marginTop:"20px",marginLeft:"35px"}}>
                <button onClick={handleForward} className="pic_btn">Forward</button>
                <button onClick={()=>setReturnModal(true)} className="pic_btn">Return</button>
            </div>):null}
            <div style={{float:"left",marginTop:"20px",marginLeft:"35px"}}>
            <button onClick={handlePrint} className="pic pic_btn">Download application <span className = "fa fa-download"></span></button>
            </div>
            <div style={{position:'absolute' , right : 40+'px', top:30+'px'}} >
                <img className="img img-fluid" src={user.image} alt='Applicant Image' height="200px" width="200px" />
            </div>
            </div>
            
            
            <Modal isOpen={modalIsOpen} className="modal_stu" toggle={()=>{setModalIsOpen(false)}}>
            <p  className="modal_para"><strong className="mt-5 modal_text">want to reject student ?</strong></p>
            <textarea value={rejectMess} className="modal_textarea" placeholder="justify why you want to reject" onChange={(e)=>{setRejectMess(e.target.value); console.log(rejectMess)}}/>
            <div className="row text-center py-5 button_div">
            
                 <button onClick={handleReject} className="pic_btn">Reject</button>
            
            
                <Link> <button  className="pic_btn" onClick={()=>setModalIsOpen(false)}>no</button></Link>
            
            </div>
            </Modal> 
            <Modal isOpen={returnModal} className="modal_stu" toggle={()=>{setReturnModal(false)}}>
            <p  className="modal_para"><strong className="mt-5 modal_text">want to return student ?</strong></p>
            <textarea value={returnMess} className="modal_textarea" placeholder="justify why you want to return" onChange={(e)=>{setReturnMess(e.target.value); console.log(returnMess) }} />
            <div className="row text-center py-5 button_div">
            
                 <button onClick={handleReturn}  className="pic_btn">Return</button>
                <button  className="pic_btn" onClick={()=>setReturnModal(false)}>no</button>
            
            </div>
            </Modal> 

           <div className="row">
               
               
                   <div className="p-5 si_div">
                       <h1 className="text-center si_subhead">Student Information</h1>
                       <div className="row mt-5">
                           <div className="col-sm-6 text-center">
                               <Label>Name of the Applicant:</Label>
                               <p className="textfield para_profile" name="name"  >{user.name}</p>
                           </div>
                           <div className="col-sm-6 text-center">
                           <Label>Date of Birth: </Label>
                               <p className="textfield para_profile" name="dob">{user.dob}</p>
                           </div>
                           
                       </div>
                       <div className="row mt-5">
                       <div className="col-sm-6 text-center">
                           <Label>Nationality:</Label>
                               <p className="textfield para_profile" name="nationality"  >{user.nationality}</p>
                           </div>
                           <div className="col-sm-6 text-center">
                           <Label>Gender:</Label>
                               <p className="textfield para_profile" select name="gender"  >{user.gender}</p>
                           </div>
                       </div>
                       <div className="row mt-5">
                           
                           <div className="col-sm-6 text-center">
                           <Label>Program (M-Tech/Ph.D.):</Label>
                               <p className="textfield para_profile" name="program"   >{user.program}</p>
                           </div>
                           <div className="col-sm-6 text-center">
                           <Label>Category:(Self spons./Govt. Fellowship)</Label>
                               <p className="textfield para_profile" name="category"   >{user.category}</p>
                           </div>
                           <div className="col-sm-6 text-center  mt-5">
                           <Label>Department</Label>
                               <p className="textfield para_profile" name="category"   >{user.department}</p>
                           </div>
                       </div>
                   </div>
               
                     
                  
               
           </div>
           <div>
             
          { user.contactDetails!=undefined ?  (<div className="p-5 si_div">
                <h1 className="text-center si_subhead">Contact Details</h1>
                <div className="row mt-5">
                            <div className="col-sm-6 text-center">
                                <Label>Present address</Label>
                                <p className="textfield para_profile" name="presentadress">{user.contactDetails.presentAddress}</p>
                            </div>
                            <div className="col-sm-6 text-center">
                                <Label>Permanent Address</Label>
                                <p className="textfield para_profile" name="permanentAdress" >{user.contactDetails.permanentAddress}</p>
                            </div>
                        </div>
                        <div className="row mt-5">
                        <div className="col-sm-6 text-center">
                            <Label>Phone number</Label>
                                <p className="textfield para_profile" name="phonenum" >{user.contactDetails.mobileNumber}</p>
                            </div>
                            <div className="col-sm-6 text-center">
                            <Label>Email Id</Label>
                                <p className="textfield para_profile" type="email" name="email" >{user.contactDetails.email}</p>
                            </div>
                        </div>
                        <div className="row mt-5">
                            
                            <div className="col-sm-6 text-center">
                                <Label>Passport No.</Label>
                                <p className="textfield para_profile" name="pasno" >{user.contactDetails.passportNo}</p>
                            </div>
                           
                        </div>
            </div>) : null
             }
             
        </div>
        <div>
            { user.greScore!=undefined ? 
            (<div className="p-5 si_div">
                <h1 className="text-center si_subhead">Gre</h1>
                
                <div className="row  mt-5">
                            <div className="col-sm-6 text-center">
                                <Label>Registeration No.</Label>
                                <p className="textfield para_profile" name="registerno">{user.greScore.registrationNo}</p>
                            </div>
                            <div className="col-sm-6 text-center">
                                <Label>Year</Label>
                                <p className="textfield para_profile" name="year" >{user.greScore.year}</p>
                            </div>
                            
                </div>
                <div className="row mt-5">
                <div className="col-sm-6 text-center">
                                <Label>Name of Institute</Label>
                                <p className="textfield para_profile" name="nameofinst">{user.greScore.institute}</p>
                            </div>
                            <div className="col-sm-6 text-center">
                                <Label>General Test Score </Label>
                                <p className="textfield para_profile" name="gts">{user.greScore.genTestScore}</p>
                            </div>

                </div>
                        <div className="row mt-5">
                            
                            <div className="col-sm-6 text-center">
                                <Label>Subject Test Score</Label>
                                <p className="textfield para_profile" name="sts">{user.greScore.subTestScore}</p>
                            </div>
                           
                </div>
            </div>) :  null
            }
             </div>
             <div>
             {user.toeflScore != undefined ? (
            <div className="p-5 si_div">
                <h1 className="text-center si_subhead">Tofel</h1>
                <div className="row mt-5">
                            <div className="col-sm-6 text-center">
                                <Label>REGISTERATION NO</Label>
                                <p className="textfield para_profile" name="registerno">{user.toeflScore.registrationNo}</p>
                            </div>
                            <div className="col-sm-6 text-center">
                            <Label>YEAR</Label> 
                                <p className="textfield para_profile" name="year" va>{user.toeflScore.year}</p>
                            </div>
                            
                </div>
                <div className="row mt-5">
                <div className="col-sm-6 text-center">
                            <Label>NAME OF INSTITUTE</Label>
                                <p className="textfield para_profile" name="nameofinst">{user.toeflScore.institute}</p>
                            </div>
                            <div className="col-sm-6 text-center">
                            <Label>LISTENING SCORE</Label>
                                <p className="textfield para_profile" name="ls" >{user.toeflScore.listeningScore}</p>
                            </div>
                </div>
                <div className="row mt-5">
                            
                            <div className="col-sm-6 text-center">
                            <Label>READING SCORE</Label>
                                <p className="textfield para_profile" name="rs" >{user.toeflScore.readingScore}</p>
                            </div>
                            <div className="col-sm-6 text-center">
                            <Label>SPEAKING SCORE</Label>
                                <p className="textfield para_profile" name="ss" >{user.toeflScore.speakingScore}</p>
                            </div>
                </div>
                <div className="row mt-5">
                            <div className="col-sm-6 text-center">
                            <Label>Writing Score</Label>
                                <p className="textfield para_profile" name="ws" >{user.toeflScore.writingScore}</p>
                            </div>
                            <div className="col-sm-6 text-center">
                            <Label>Test Score</Label>
                                <p className="textfield para_profile" name="ts" >{user.toeflScore.totalScore}</p>
                            </div>
                            
                </div>
            </div>
            
             )
            :null}
             </div>
             {
             user.academicQualification!=undefined ? (
                <Container>
                <h1 className="my-5">Academic Qualifications</h1>
             {user.academicQualification.map(quals => {

                return (
                    <div>
                    <form>
                       
                            <div>
                                <Label>Degree Specialization</Label>
                                <p className="para_profile">{quals.degree}</p>
                                <Label>School/College</Label>
                                <p className="para_profile">{quals.schoolOrCollege}</p>
                                <Label>University/Board</Label>
                                <p className="para_profile">{quals.boardOrUniversity} </p>
                                <Label>year</Label>
                                <p className="para_profile">{quals.year}</p>
                                <Label>Percentage/CGPA/CPI</Label>
                                <p className="para_profile">{quals.percentageOrCgpa}</p><br/>
                                <Label>Out Of</Label>
                                <p className="para_profile">{quals.outOf}</p><br/>
                             </div>
                        </form>
                        <hr width="75%"/>
                    </div>
                
                )
             })}
             </Container>
            ):null}

        {user.professionalExperience!=undefined ? (
        <Container>
            <h1 className="my-5">Professional Experience</h1>

            {
                user.professionalExperience.map(experience => {
                    return( <form>
                
                        <div>

                             <Label>Organization</Label>
                             <p className="para_profile" ame="organization" >{experience.organization}</p>
                             <Label>Position Held</Label><p className="para_profile" name="positionHeld">{experience.positionHeld}</p>
                             <Label>Period (From/to)</Label>
                             <p className="para_profile" name="period" >{experience.period}</p>
                             <Label>Roles/Responsibilities</Label>
                             <p className="para_profile" name="period" >{experience.rolesAndResponsibilities}</p>
                            <br/>
                            
                        </div>
                   
                </form>)
               
            })
                }
            
        </Container>) : null }
        {user.refereeDetails!=undefined ? (
        <Container>
            <h1 className="my-5">Refree Details</h1>
            {
                user.refereeDetails.map(refree=> (<form>
                
                    <div>
                        <Label>Name</Label>
                        <p className="para_profile">{refree.name}</p>
                        <Label>Position</Label>
                        <p className="para_profile" name="position">{refree.position}</p>
                        <Label>organization</Label>
                        <p className="para_profile"
                        name="organization">{refree.organization}</p>
                        <Label>Email Id</Label>
                        <p className="para_profile" name="email">{refree.email}</p>
                        <Label>Contact</Label>
                        <p className="para_profile" name="contact">{refree.phoneNo}</p>
                        <br/>
                    </div>
                </form>))
            
            }    
        </Container>) : null}
        {
            (user.statementOfPurpose!=undefined) ?
            (
                <Container>
                    <h1 className="mt-5">Statement of Purpose</h1>
                    <form>
                    <div>
                        <p className="para_profile" name="statement">{user.statementOfPurpose}</p>
                        <Label>G-Drive Link for further read</Label>
                        <p className="para_profile" name="statement">{user.statementOfPurposeLink}</p>
                        <br/>
                    </div>
                </form>
                </Container>
            ) : 
            null }
            {
            (user.publications!=undefined) ?
            (
                <Container>
                    <h1 className="mt-5">Publications</h1>
                    
                    {user.publications.map((publication)=>(<form>
                
                    <div>
                        <p className="para_profile" name="statement">{publication}</p>
                        <br/>
                    </div>
                </form>))}
                </Container>
            ) : 
            null }
        <Container>
            <h1>Uploaded Documents</h1>
            <div className="row">
            <div className="col-md-4 p-5">
            <div className="row text-center">
                <div className="form-group upload_form ">
                    <label>Mark Sheets/certificates(from class X to Highest degree obtained/appeared)(both sides)</label>
                    <h3 name="uploadMarksheets">uploaded file</h3>
                    <a target="blank" href={user.markSheets}><i className="fa fa-download"></i></a>
                </div>
            </div>
            </div>
            <div className="col-md-4 p-5">
            <div className="row text-center">
                <div className="form-group upload_form">
                    <label>GRE & TOEFL(if any)</label>
                    <h3 name="uploadGreToefl">uploaded file</h3>
                    <a target="blank" href={user.otherExamCertificates}><i className="fa fa-download"></i></a>
                </div>
            </div>
            </div>
            <div className="col-md-4 p-5">
            <div className="row m-3 text-center">
                <div className="form-group upload_form">
                    <label>Certificate related to any fellowship (both sides)</label>
                    <h3 name="uploadFellowshipDocuments">uploaded file</h3>
                    <a target="blank" href={user.fellowshipCertificates}><i className="fa fa-download"></i></a>
                </div>
            </div>
            </div>
            </div>


            <div className="row">
            <div className="col-md-4 p-5">
            <div className="row text-center">
                <div className="form-group upload_form ">
                    <label>Professional experience certificate (if any)(both sides)</label>
                    <h3 name="uploadProfessionalExperience">uploaded file</h3>
                    <a target="blank" href={user.profExperienceCertificates}><i className="fa fa-download"></i></a>
                </div>
            </div>
            </div>
            <div className="col-md-4 p-5">
            <div className="row text-center">
                <div className="form-group upload_form">
                    <label>Passport (1 st and last page)</label>
                    
                    <h3 name="uploadPassport">uploaded file</h3>
                    <a target="blank" href={user.passportImages}><i className="fa fa-download"></i></a>
                </div>
            </div>
            </div>
            
            </div>
            
            
        </Container>
        </div>
    )
}
