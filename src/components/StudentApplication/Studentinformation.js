import React,{useState,useEffect} from 'react'
import Professional from './Professional'
import Refree from './Refree'
import Academics from './Academics'
import ContactDetails from './ContactDetails'
import Gre from './Gre'
import './StudentApplication.css'
import Tofel from './Tofel'
import TextField from '@material-ui/core/TextField'
// import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Upload from './Upload'
import Label from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem';
import { ThemeProvider } from 'react-bootstrap';
import "./StudentApplication.css"
import {Publications} from "./Publications"
import {Link} from 'react-router-dom'
export default function Studentinformation(props) {
    
    const [checkbox , setCheckbox] = useState("off");
    const [user, setUser] = useState({});
    const [error , setError] = useState(false);
    const [statement , setStatement] = useState('');
    const [publications , setPublications] = useState(['']); 
    const [details , setDetail] = useState({});
    useEffect(()=>{
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
            data = data.applicantDetails;
            if(data.contactDetails === undefined)
            return ;
            setinputField([{
                name:`${data.name}`,dob:`${data.dob}`,nationality:`${data.nationality}`,gender:`${data.gender}`,program:`${data.program}`,category:`${data.category}`,department:`${data.department}`
            }])
            if(data.contactDetails !== undefined)
            setContactDetails([
                {
                    presentadress : `${data.contactDetails.presentAddress}`,
                    permanentAdress:`${data.contactDetails.permanentAddress}`,
                    phonenum:`${data.contactDetails.mobileNumber}`,
                    email:`${data.contactDetails.email}`,
                    pasno:`${data.contactDetails.passportNo}`
                }
            ])
            if(data.toeflScore !== undefined)
            setToeflScores([{
                registerno:`${data.toeflScore.registrationNo}`,
                year:`${data.toeflScore.year}`,
                nameofinst:`${data.toeflScore.institute}`,
                // ls:`${user.totalScore.}`,
                rs:`${data.toeflScore.readingScore}`,
                ss:`${data.toeflScore.speakingScore}`,
                ws:`${data.toeflScore.writingScore}`,
                ts:`${data.toeflScore.totalScore}`
            }])
            if(data.greScore !== undefined)
            setGreScores([{
                registerno:`${data.greScore.registrationNo}`,
                year:`${data.greScore.year}`,
                nameofinst:`${data.greScore.institute}`,
                gts:`${data.greScore.genTestScore}`,
                sts:`${data.greScore.subTestScore}`
            }])
            var a = [];
            if(data.academicQualification.length !== 0 )
            for(var i=0 ; i < data.academicQualification.length ; i++)
            {
                a = [...a , {degreeSpecialization:`${data.academicQualification[i].degree}`,
                schoolCollege:`${data.academicQualification[i].schoolOrCollege}`,
                universityBoard:`${data.academicQualification[i].boardOrUniversity}`,
                year:`${data.academicQualification[i].year}`,
                percentage:`${data.academicQualification[i].percentageOrCgpa}`}]
            }
            setAcademicQual(a);
            a=[];
            if(data.professionalExperience.length !== 0)
            for(var i=0 ; i<data.professionalExperience.length ; i++)
            {
                a = [...a , {organization:`${data.professionalExperience[i].organization}`,
                positionHeld:`${data.professionalExperience[i].positionHeld}`,
                period:`${data.professionalExperience[i].period}`,} ]
            }
            setProfessionalExp(a);
            a=[];
            if(data.refereeDetails.length !== 0)
            for(var i=0 ; i<data.refereeDetails.length ; i++)
            {
                a=[...a,{
                    name:`${data.refereeDetails[i].name}`,
                    position:`${data.refereeDetails[i].position}`,
                    organization:`${data.refereeDetails[i].organization}`,
                    email:`${data.refereeDetails[i].email}`,
                    contact:`${data.refereeDetails[i].phoneNo}`}]
                
            }
            setRefreeFields(a);
            setPublications(data.publications);
            setStatement(data.statementOfPurpose);
        })
        .catch(err => console.log(err))

        const detailAddress = 'https://iitp-isa-portal-backend.herokuapp.com/backend/allDetails';
        fetch(detailAddress , {method : 'get'})
        .then(res => {
            if(res.ok)
            return res.json();
            else alert("Something went wrong please try again, make sure you are conected");
        })
        .then(data => {
            console.log(data);
            setDetail(data);
        })
        .catch(err => {
            alert(err);
        })
    
    },[]);

    const [inputFields,setinputField]=useState([
        {name:'',dob:'',nationality:'',gender:'',program:'',category:'',department:''},
        
    ])
 
    const [contactDetails,setContactDetails]=useState([
        {presentadress:'',permanentAdress:'',phonenum:'',email:'',pasno:''},  
    ])
    
    const [toeflScores,setToeflScores]=useState([
        {registerno:'',year:'',nameofinst:'',ls:'',rs:'',ss:'',ws:'',ts:''},
    ])
    
    const [greScores,setGreScores]=useState([
        {registerno:'',year:'',nameofinst:'',gts:'',sts:''},
    ])

    const handleChangeInputGre=(index,event)=>{
        console.log(index,event.target.name)
        const values=[...greScores];
        values[index][event.target.name]=event.target.value
        setGreScores(values);
        console.log(greScores);
    }
    const handleChangeInputToefl=(index,event)=>{
        console.log(index,event.target.name)
        const values=[...toeflScores];
        values[index][event.target.name]=event.target.value
        setToeflScores(values);
        console.log(toeflScores);
    }
    const handleChangeInputContact=(index,event)=>{
        console.log(index,event.target.name)
        const values=[...contactDetails];
        values[index][event.target.name]=event.target.value
        setContactDetails(values);
        console.log(contactDetails);
    }
    const genderOptions = [
        {  label: 'Male', value: 'male' },
        {  label: 'Female', value: 'female' },
        {  label: 'Other', value: 'other' },
      ]
    const handleChangeInput=(index,event)=>{
        console.log(event.target.value)
        const values=[...inputFields];
        values[index][event.target.name]=event.target.value
        setinputField(values);
        console.log(inputFields);
    }
   
    // functions and state to pass into the academics component
    const [academicQual,setAcademicQual]=useState([
        {degreeSpecialization:'',schoolCollege:'',universityBoard:'',year:'',percentage:''},
    ])

    const handleChangeInputAcademics=(index,event)=>{
        console.log(index,event.target.name)
        const values=[...academicQual];
        values[index][event.target.name]=event.target.value
        setAcademicQual(values);
        console.log(academicQual);
    }
    const handleAddFieldsAcads=()=>{
        setAcademicQual([...academicQual,{degreeSpecialization:'',schoolCollege:'',universityBoard:'',year:'',percentage:''}])
    }
    const handleRemoveFieldsAcads=(index)=>{
        const values=[...academicQual];
        values.splice(index,1);
        setAcademicQual(values);
    }
    // ending of the academic component functions

    //professional component functions props starts
    const [professionalExp,setProfessionalExp]=useState([
        {organization:'',positionHeld:'',period:'',},
        
    ])

    const handleChangeInputProfessional=(index,event)=>{
        console.log(index,event.target.name)
        const values=[...professionalExp];
        values[index][event.target.name]=event.target.value
        setProfessionalExp(values);
        console.log(professionalExp)
    }
    const handleAddFieldsProfessional=()=>{
        setProfessionalExp([...professionalExp,{organization:'',positionHeld:'',period:'',}])
    }
    const handleRemoveFieldsProfessional=(index)=>{
        const values=[...professionalExp];
        values.splice(index,1);
        setProfessionalExp(values);
    }
    // ending of the professional component functions
    // starting of the refree component functions
    const [refreeFields,setRefreeFields]=useState([
        {name:'',position:'',organization:'',email:'',contact:''},
    ])

    const handleChangeInputRefree=(index,event)=>{
        console.log(index,event.target.name)
        const values=[...refreeFields];
        values[index][event.target.name]=event.target.value
        setRefreeFields(values);
        console.log(refreeFields)
    }
    const handleAddFieldsRefree=()=>{
        setRefreeFields([...refreeFields, {name:'',position:'',organization:'',email:'',contact:''}])
    }
    const handleRemoveFieldsRefree=(index)=>{
        const values=[...refreeFields];
        values.splice(index,1);
        setRefreeFields(values);
    }
    // ending of refree component functions
    const handleChangeInputPublication=(index,event)=>{
        console.log(index +  event.target.value)
        console.log(index,event.target.value)
        const values = [...publications]
        values[index]=event.target.value;
        setPublications(values);
        console.log(publications);
    }
    const handleAddFieldsPublication=()=>{
        setPublications([...publications, ''])
    }
    const handleRemoveFieldsPublication=(index)=>{
        const values=[...publications];
        values.splice(index,1);
        setPublications(values);
    }
    // handling of the file upload system
    const [files,setFiles] = useState(
        {marksheets : null , GreAndToefl:null,fellowshipCertificate:null,profExpCertificate:null,passportImage:null}
    )
    const onSuccess =(file,name)=> {
        console.log(name);
        if(name=="marksheets")
        setFiles({...files,marksheets:file});
        if(name=="GreAndToefl")
        setFiles({...files,GreAndToefl:file});
        if(name=="fellowshipCertificate")
        setFiles({...files,fellowshipCertificate:file});
        if(name=="profExpCertificate")
        setFiles({...files,profExpCertificate:file});
        if(name=="passportImage")
        setFiles({...files,passportImage:file});
        console.log("success");
        console.log(files);
    }
    const onFail = () => {
        alert("The file was unable to upload, please try again");
    }

    // for saving response messages
    const [responseMess , setResponseMess] = useState('');
    // function for applying for admission 
    const Apply = () => {
        const applyaddress = 'https://iitp-isa-portal-backend.herokuapp.com/backend/applicant/apply/'+props.match.params.id;
        fetch (applyaddress , {
            method : 'PATCH'
        }).
        then(res => res.json())
        .then(res => {
            console.log(res)
            const setback = () => {
                window.location.href="http://localhost:3000/stumyprofile/"+props.match.params.id;
                alert("Your form has been submitted, Please keep logging to know the status of the form, Thankyou");
            }

            setback();
        })
        .catch(error => console.log(error));
    }
    // ending handling file upload 
    const handleSubmit = () => {
        console.log(error);
        if(error)
        {
            alert("Check all the inputs and try again");
            return ;
        }
        if(inputFields[0].name.length===0 ||
            inputFields[0].dob.length===0 ||
            inputFields[0].nationality.length===0 ||
            inputFields[0].department.length===0 ||
            inputFields[0].category.length===0 ||
            inputFields[0].program.length===0 
            )
            {
                alert("Please fill the required information before continuing")
                return ;
            }
            else if(contactDetails[0].presentadress.length===0 ||
                contactDetails[0].permanentAdress.length===0 ||
                contactDetails[0].email.length===0 ||
                contactDetails[0].phonenum.length===0 ||
                contactDetails[0].pasno.length===0
            ){
                alert("Please fill the required information before continuing")
                return ;
            }
        else if(statement.length===0)
        {
            alert("[ Statement of purpose ] section cannot be empty");
            return ;
        }
        else if(files.marksheets === null)
            {
                alert("Marksheet is compulsory to add")
                return ;
            }
        else if(checkbox==="off")
        {
            alert("Tick the checkbox first")
            return ;
        }
        var a = false;
        Object.values(files).forEach(val => {
            console.log(val);
            if(val!=null && val.type !=="application/x-zip-compressed" && val.type!=="application/zip")
            {
                alert("Please Upload files in ZIP format");
                a = true;
                return ;
            }
        })
        if(a)
        return ;
        console.log(inputFields);
        console.log(contactDetails);
        console.log(toeflScores);
        console.log(greScores);
        console.log(academicQual);
        console.log(professionalExp);
        console.log(refreeFields);
        console.log(files);
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/applicant/saveDetails/"+props.match.params.id;
        fetch(address,{
            method:"post",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name:inputFields[0].name,
                dob : inputFields[0].dob,
                nationality : inputFields[0].nationality,
                department : inputFields[0].department,
                category : inputFields[0].category,
                program : inputFields[0].program,
                contactDetails : {
                    presentAddress : contactDetails[0].presentadress,
                    permanentAddress : contactDetails[0].permanentAdress,
                    email : contactDetails[0].email,
                    mobileNumber : contactDetails[0].phonenum,
                    passportNo : contactDetails[0].pasno
                },
                academicQualification : academicQual.map((fields)=>{
                    const obj = {
                        degree:fields.degreeSpecialization,
                        schoolOrCollege : fields.schoolCollege,
                        boardOrUniversity : fields.universityBoard,
                        year : fields.year,
                        percentageOrCgpa:fields.percentage
                    }
                    return obj;
                }) ,
                // statementOfPurpose : statement,
                gender : inputFields[0].gender,
                greScore : {
                    registrationNo : greScores[0].registerno ,
                    year : greScores[0].year ,
                    institute : greScores[0].nameofinst ,
                    genTestScore : greScores[0].gts ,
                    subTestScore : greScores[0].sts 
                },
                toeflScore : {
                    registrationNo : toeflScores[0].registerno ,
                    year : toeflScores[0].year ,
                    institute : toeflScores[0].nameofinst ,
                    listeningScore : toeflScores[0].ls ,
                    readingScore : toeflScores[0].rs ,
                    speakingScore : toeflScores[0].ss ,
                    writingScore : toeflScores[0].ws ,
                    totalScore :  toeflScores[0].ts 
                },
                professionalExperience : professionalExp,
                publications : publications,
                statementOfPurpose : statement,
                refereeDetails : refreeFields.map((field) => {
                    const obj = {
                        name : field.name,
                        position : field.position,
                        organization : field.organization,
                        email:field.email,
                        phoneNo : field.contact
                    }
                    return obj;
                }),
                // publications : publications
            })
        }).then(res=>{
            return res.json() 
          })
        .then(res=> {
            console.log(res)
            setResponseMess(res.message);
            console.log(responseMess)
            const uploadaddress = "https://iitp-isa-portal-backend.herokuapp.com/backend/applicant/documentsUpload/"+props.match.params.id;
        const formdata = new FormData();
        formdata.append(
            "documentFiles",
            files.marksheets,
            "markSheets.zip"
        )
        if(files.GreAndToefl)
        formdata.append(
            "documentFiles",
            files.GreAndToefl,
            "otherExamCertificates.zip"
        )
        if(files.fellowshipCertificate)
        formdata.append(
            "documentFiles",
            files.fellowshipCertificate,
            "fellowshipCertificates.zip"
        )
        if(files.profExpCertificate)
        formdata.append(
            "documentFiles",
            files.profExpCertificate,
            "profExperienceCertificates.zip"
        )
        if(files.passportImage)
        formdata.append(
            "documentFiles",
            files.passportImage,
            "passportImages.zip"
        )
        console.log(files.marksheets)
        fetch(uploadaddress,{
            method : 'PATCH',
            body : formdata
        }).then((res)=>{return res.json()})
        .then(data=>{
            console.log(data)
            alert("The details have been saved");
        })
        .catch((err)=>console.log(err))
        })
        .catch(err => console.log(err))

        

        // console.log("success saving details and files");
    }
    //form validation

      //Name validation
      const [blurName , setBlurName] = useState(false)
      const isName = (name) => {
        const validName = RegExp(/[a-zA-Z][a-zA-Z ]*/i);
        return validName.test(name)
      }
      
    return (
        <div className="container">
            <div className="row">
                {inputFields.map((inputField,index)=>(
                    <div className="p-5 si_div" key={index}>
                        <Link to={`/stumyprofile/${props.match.params.id}`}><button className="pic_btn">Go back Home</button></Link>
                        <h1 className="text-center si_subhead">Student Information</h1>
                        <div><b><i>Fields marked with <span className="text-red">*</span> are required</i></b></div><br /><br/>
                        <div className="row">
                            <div className="col-sm-6 text-center">
                                <Label htmlFor="name">Name of the Applicant:<span className="text-red">*</span></Label>
                                <TextField onBlur={()=>{setBlurName(true)}} className="textfield" name="name" value={inputField.name} variant="filled" onChange={event=>handleChangeInput(index,event)} ></TextField>
                                <br />
                                {
                                    isName(inputField.name) || !blurName ? null : (<span className="text-red">Name can only contain characters</span>)
                                }
                            </div>
                            <div className="col-sm-6 text-center">
                            <Label>Date of Birth:<span className="text-red">*</span> </Label>
                                <TextField className="textfield" name="dob" type="date" value={inputField.dob} variant="filled"onChange={event=>handleChangeInput(index,event)}></TextField>
                            </div>
                            
                        </div>
                        <div className="row mt-5">
                        <div className="col-sm-6 text-center">
                            <Label>Nationality:<span className="text-red">*</span></Label>
                                <TextField className="textfield" name="nationality" value={inputField.nationality} variant="filled" onChange={event=>handleChangeInput(index,event)}></TextField>
                            </div>
                            <div className="col-sm-6 text-center">
                            <Label>Gender:<span className="text-red">*</span></Label>
                                <TextField className="textfield" select name="gender" value={inputField.gender} variant="filled" onChange={event=>handleChangeInput(index,event)}>
                                {genderOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                                </TextField>
                            </div>
                        </div>
                        <div className="row mt-5">
                            
                            <div className="col-sm-6 text-center">
                            <Label>Program :<span className="text-red">*</span></Label>
                                <TextField defaultValue={inputField.program} select className="textfield" name="program" value={inputField.program} variant="filled" onChange={event=>handleChangeInput(index,event)}>
                                {
                                details.programs!==undefined ? 
                                details.programs.map(programme => {
                                    return (
                                        <MenuItem  value= {programme}>
                                            {programme}
                                    </MenuItem>
                                    )
                                }) : null
                                }
                                </TextField>
                            </div>
                            <div className="col-sm-6 text-center">
                            <Label>Category:(Self spons./Govt. Fellowship)<span className="text-red">*</span></Label>
                                <TextField defaultValue={inputField.category} select className="textfield" name="category" value={inputField.category} variant="filled" onChange={event=>handleChangeInput(index,event)}>
                                <MenuItem  value= "Self sponsored">
                                Self sponsored
                                    </MenuItem>
                                <MenuItem  value=  "Govt. Fellowship">
                                Govt. Fellowship
                                    </MenuItem>
                                </TextField>
                            </div>
                            <div className="col-sm-6 text-center">
                            <Label>Department<span className="text-red">*</span></Label>
                                <TextField defaultValue={inputField.department} className="textfield" select name="department" value={inputField.department} variant="filled" onChange={event=>handleChangeInput(index,event)}>
                                {
                                (details.programAndDepartments!==undefined)?
                                (details.programAndDepartments.map(programAndDepartments => {
                                    if(programAndDepartments.program===inputField.program)
                                    return (
                                        programAndDepartments.course.map(department => {
                                            return (
                                                <MenuItem  value= {department}>
                                                    {department}
                                            </MenuItem>
                                            )}
                                        ))
                                })): null
                                }
                                </TextField>
                            </div>
                        </div>
                    </div>
                ))}
                      <hr/>
                    <ContactDetails setError={setError} handleChangeInput={handleChangeInputContact} inputFields={contactDetails}/>
                
            </div>
            <div className="row">
                
                    <Tofel setError={setError} handleChangeInput={handleChangeInputToefl} inputFields={toeflScores}/>
                
                
                    <Gre setError={setError} handleChangeInput={handleChangeInputGre} inputFields={greScores}/>
                
            </div>
            <div className="row text-center">
                <div className="col-md-12 py-5"><br/>
                    <Academics setError={setError} handleChangeInput={handleChangeInputAcademics} inputFields={academicQual} handleAddFields={handleAddFieldsAcads} handleRemoveFields={handleRemoveFieldsAcads}/>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-md-12 py-5"><br/>
                    <Professional setError={setError} handleChangeInput={handleChangeInputProfessional} inputFields={professionalExp} handleAddFields={handleAddFieldsProfessional} handleRemoveFields={handleRemoveFieldsProfessional}/>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-md-12 py-5"><br/>
                    <Refree setError={setError} handleChangeInput={handleChangeInputRefree} inputFields={refreeFields} handleAddFields={handleAddFieldsRefree} handleRemoveFields={handleRemoveFieldsRefree}/>
                </div>
            </div>
            <div className="row text-center">
                <h1 className = "text-center my-5">Statement of Purpose<span className="text-red">*</span></h1>
                <div className="col-md-12">
                <TextField fullWidth
                        multiline
                        rows={4}
                        name="statement"
                        label="Statement of Purpose"
                        value={statement}
                        variant="filled"
                        onChange={(e)=>{setStatement(e.target.value)}}
                        >
                </TextField>

                </div>
            </div>
            <hr/>
            <div className="row text-center">
                <div className="col-md-12 py-5">
                    <br/>
                    <Publications setError={setError} handleChangeInput={handleChangeInputPublication} inputFields={publications} handleAddFields={handleAddFieldsPublication} handleRemoveFields={handleRemoveFieldsPublication} /> 
                </div>
            </div>
            <hr/>
            <div className="row text-center">
                <div className="col-md-12">
                    <br/>
                    <Upload onSuccess={onSuccess} onFail={onFail} files ={files}/>
                </div>
            </div>
            <div className="declaration">
                <h1 className="text-center">Decalaration:</h1>
                <input type="checkbox" onChange = {(e)=>{setCheckbox(e.target.value); console.log(checkbox)}} className="checkbox" required />
                
                <span className="my-5">
                        I hereby declare that the entries made in this application form are correct to the best of my knowledge and belief. If selected for admission, I promise to abide by the rules and regulations of the Institute. The Institute shall have the right to take any action it deems fit, including expulsion, against me at any time after my admission, if it is found that any information furnished by me is incorrect. I note that the decision of the Institute is final in regard to selection for admission and assignment to a particular department and field of study.
                </span>
                <br/>
                <button onClick={handleSubmit}>Save Details and Upload Documents</button>
                {responseMess==="Details Saved" && (user.applicationStatus === "Not Submitted" || user.applicationStatus==="Returned") ? <button className="m-5" onClick={Apply}>Apply for Admission</button>  : null }
            </div>
        </div>
    )
}
