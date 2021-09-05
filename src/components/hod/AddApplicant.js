import React, { useState , useEffect } from 'react';
import {Row, Col, InputGroup, Container , Label} from 'react-bootstrap';
import {TextField , MenuItem} from "@material-ui/core";


export default function AddApplicant (props) {
    const [name , setName]=useState('');
    const [email,setEmail] = useState('');
    const [dept , setDept] = useState(props.hid);
    const [platform , setPlatform] = useState('');
    const [file ,setFile] = useState(null);
    const [adminVar , setAdminVar] = useState({});
    const [blurEmail , setBlurEmail] = useState(false)
    const [loading , setLoading] = useState(false);

    const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
     
      const isEmail = (email) => {
          return (validEmailRegex.test(email))    
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
    const handleAdd = () => {
       
        console.log(file);
        if(file === null || ( file.type !=="application/x-zip-compressed" && file.type !=="application/zip"))
        {
            alert("Please select a valid file");
            setFile(null);
            return ;
        }
        else if(email.length ===0 || name.length===0 || dept.length===0 || platform.length===0)
        {
            alert("Please fill out all the fields marked with asterisk");
            return ;
        }
        setLoading(true);
        const formdata = new FormData();
        formdata.append("application" , file);
        formdata.append("department",dept);
        formdata.append("name",name);
        formdata.append("email",email);
        formdata.append("platform",platform);
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/department/govtApplications/addApplicant";
        fetch(address , {
            method : "post",
            body : formdata
        })
        .then((res)=>{
            setLoading(false);
            if(res.ok)
            return res.json();
            else throw new Error("Something went wrong, please try again later");
        })
        .then((data)=>{
            console.log(data);
            alert("The Applicant has been added");
            setDept('');
            setName('');
            setEmail('');
            setFile(null);
            setPlatform('');
            setBlurEmail(false);
            props.toHome();
        })
        .catch(err => {
            console.log(err);
        })
    }
    return(
        <Container className="margintop">
            <Row>
                <Col md={12} className=" text-center">
                <h3>Enter Applicant Details</h3>
                </Col>
                <Col md={3} className="text-center mt-3">
                
                    Name of the selected applicant <span className="text-red font-weight-bold">*</span> : 
                
                </Col>
                <Col md={9}>
                <TextField variant="filled" className="textfield" text name="name" value={name} onChange={(e)=>{setName(e.target.value); console.log(name)}}>
                </TextField>    
                </Col>  
                <Col md={3} className="text-center mt-3">
                
                     Email <span className="text-red font-weight-bold">*</span> : 
                
                </Col>
                <Col md={9}>
                <TextField onBlur={()=>{setBlurEmail(true)}} variant="filled" className="textfield" text name="name" value={email} onChange={(e)=>{setEmail(e.target.value); console.log(email)}}>
                </TextField>   
                <br />
                                {
                                    isEmail(email) || !blurEmail ? null : (<span className="text-red text-center">Please enter a valid email id</span>)
                                } 
                </Col>
                <Col md={3} className="text-center mt-3">
                
                     Department <span className="text-red font-weight-bold">*</span>: 
                
                </Col>
                <Col md={9}>
                <TextField variant="filled" className="textfield" text name="name" value={dept} onChange={(e)=>{setDept(e.target.value); console.log(dept)}}>
                </TextField>    
                </Col>  
                <Col md={3} className="text-center mt-3">
                
                    Platform  <span className="text-red font-weight-bold">*</span>: 
                
                </Col>
                <Col md={9}>
                <TextField variant="filled" className="textfield" select name="name" value={platform} onChange={(e)=>{setPlatform(e.target.value); console.log(platform)}}>
                {
                           adminVar.platForms ? adminVar.platForms.map((platform)=>{
                                return(
                                <MenuItem value={platform}>{platform}</MenuItem>
                                )
                            }) : null
                        }
                </TextField>    
                </Col>  
                <Col md={3} className="text-center mt-3">
                
                    Applicant Details in ZIP format <span className="text-red font-weight-bold">*</span>: 
                
                </Col>
                <Col md={9}>
                <TextField variant="filled" className="textfield" type="file" name="name" onChange={(e)=>{setFile(e.target.files[0]); console.log(file)}}>
                </TextField>    
                </Col> 

            </Row>
            <div className="text-center">
                <button onClick={handleAdd} className="pic_btn">ADD </button>
                {loading ? <span className = "fa fa-spin fa-spinner fa-3x"></span> : null }
            </div>
        </Container>
    )
}