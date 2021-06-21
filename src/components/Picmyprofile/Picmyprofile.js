import React ,{useState , useEffect} from 'react'
import {Container, Row, Col ,Button} from  'react-bootstrap';
import Modal  from 'react-modal';
import {Link} from 'react-router-dom';
import Pichome from './Pichome';
import Picmanagehod from './Picmanagehod';
import Picreset from './Picreset';
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';

export default function Picmyprofile(props) {
    const [home,sethome]=useState(true);
    const [pass,setpass]=useState(false);
    const [log,setlog]=useState(false);
    const [managehod,setmanagehod]=useState(false);
    const [user , setUser] = useState({});
    const [mode, setMode] = useState('');
    const [details , setDetails] = useState({});
    const [programme , setProgramme] =useState('');
    const [department , setDepartment] = useState({department : '' , programme : ''});
    const [isOpen , setModal] = useState(false);
    useEffect(()=>{
        const address = 'https://iitp-isa-portal-backend.herokuapp.com/backend/admin/profile'
        fetch(address , {
            method:'get'
        })
        .then(res => {
            if(res.ok)
            return res.json();
            else alert("Please check your internet connection and try again")
        })
        .then(data => {
            console.log(data)
            setUser(data.admin)
        })
        .catch(err => {
            alert("Please check your internet connection and try again "+ err)
        })

        const detailAddress = 'https://iitp-isa-portal-backend.herokuapp.com/backend/allDetails';
        fetch(detailAddress , {method : 'get'})
        .then(res => {
            if(res.ok)
            return res.json();
            else alert("Something went wrong please try again, make sure you are conected");
        })
        .then(data => {
            console.log(data);
            setDetails(data);
        })
        .catch(err => {
            alert(err);
        })

    },[])
    const addProgramme = () => {
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/admin/programs";
        console.log([...details.programs , programme]);
        fetch(address , {
            method : 'PATCH',
            headers: {                              
                "Access-Control-Allow-Origin": "*",                             
                "Content-Type": "application/json" ,
                "mode" : "no-cors"  
              } ,
            body : JSON.stringify({ programs : [...details.programs , programme] })
        })
        .then(res=> {
            if(res.ok)
            return res.json();
            else alert("Please check your internet connection and try again")
        })
        .then(data => {
            console.log(data);
            setModal(false);
        })
        .catch(err=>console.log(err))
    }

    const addDepartment = () => {
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/admin/setProgramsAndDepartments";
         const b = details.programAndDepartments;
         const c=b.map((element)=>{
            if(element.program === department.programme)
            {
                var a = [...element.course , department.department]
                a = a.filter(function(item, pos) {
                    return a.indexOf(item) == pos;
                })
                element = {...element , course : a }
            }
            return element;
         })
         console.log(c);
        fetch(address , {
            method : "patch",
            headers: { 
                "Access-Control-Allow-Origin": "*",                             
                "Content-Type": "application/json" ,
                "mode" : "no-cors" 
              } ,
              
            body : JSON.stringify({
                programsWithDepartments : c
            })
        })
        .then(res => { if(res.ok)
            return res.json();
            else alert("Please check your internet connection and try again")
        })
        .then(data => {console.log(data);
        alert("Department " + department.department + " has been added in the "+department.programme+" programme");
        setModal(false);
        })
    }
    const funchome = () => {
        sethome(true);
        setpass(false);
        setlog(false);
        setmanagehod(false);
        
   }
   const funcpass = () => {
        sethome(false);
        setpass(true);
        setlog(false);
        setmanagehod(false);
   }
   const funclog = () => {
        sethome(false);
        setpass(false);
        setlog(true);
        setmanagehod(false);
        
   }
   const funmghod = () => {
        sethome(false);
        setpass(false);
        setlog(false);
        setmanagehod(true);
    
    }
     return (
        <>
    <div className="container text-center margintop">
        <div className="mb-5 tab_btn_section">
                  <Row>
                    <Col md={3}>
                         {
                              home ? 
                              <button onClick={funchome} type='btn' className="active tab_btn pic_btn">Home</button> : 
                              <button onClick={funchome} type='btn' className="pic_btn">Home</button>
                         }
                      
                    </Col>
                    <Col md={3}>
                    <button onClick={funcpass} type='btn' className="pic_btn">reset password</button>
                    </Col>
                    <Col md={3}>
                    <button onClick={funmghod} type='btn' className="pic_btn">Manage Hod</button>
                    </Col>
                    <Col md={3}>
                    <Link to="/login"><button onClick={funclog} type='btn' className="pic_btn">log out</button></Link>
                    </Col>
                    
                  </Row>
                </div>
            {
                home && log === false && pass === false && managehod===false  ? 
                (
                    <>
                   <Pichome user={user} id={props.match.params.id}/>
                    
                    </>
                )
                :home === false && log && pass === false && managehod===false  ?
                (<>
                    sfdgfhv
                    
                    </>
                )
                :home === false && log===false && pass && managehod===false ?
                (   <>
                    <Picreset toHome={funchome} user={user}/>
                    
                    </>
                )
                :home === false && log===false && pass===false && managehod ?
                (   <>
                    <Picmanagehod id = {props.match.params.id}/>
                    
                    </>
                )
                 :null
            }
            <div className="row text-center margintop">
                 <button className="pic_btn" onClick={()=>{setModal(true); setMode('programme')}}>Add Programme</button>
                 <button className="pic_btn" onClick={()=>{setModal(true); setMode('department')}}>Add Department in programme</button>
            </div>
            <div className="margintop text-center">
            <Link to={`/picwindow/${props.match.params.id}`}><button type='btn' className="active tab_btn pic_btn">Admin Window</button></Link>

            </div>
            </div>
            <Modal isOpen={isOpen} className="modal_stu container">
                {
                    mode==='programme' ?  
                    (<>
                    <TextField
                        fullWidth
                        name="programme"
                        label="Enter name of the programme to be added"
                        value={programme}
                        variant="filled"
                        onChange={e=>{setProgramme(e.target.value)}} > </TextField>
                        <br/>
                        <button type='btn' className="active tab_btn pic_btn" onClick={()=>{addProgramme()}}>Add Programme</button>
                        <br/>
                        </>
                        ) :
                    (
                        <>
                        <TextField
                        fullWidth
                        select
                        name="programme"
                        label="Available Programmes"
                        value={department.programme}
                        variant="filled"
                        onChange={(e)=>{setDepartment({...department,programme : e.target.value })}}>
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
                        <br />
                        <TextField
                        fullWidth
                        select
                        name="department"
                        label="Available Departments"
                        value={department.department}
                        variant="filled"
                        onChange={(e)=>{setDepartment({...department , department : e.target.value })}}>
                            {
                                (details.departments!==undefined)?
                                (details.departments.map(department => {
                                    return (
                                        <MenuItem  value= {department}>
                                            {department}
                                    </MenuItem>
                                    )
                                })): null
                            }
                        </TextField>
                        <br/>
                        <button type='btn' className="active tab_btn pic_btn" onClick={addDepartment}>Add Department</button>
                        </>
                    ) 
                }
                <br />
                <button onClick={()=>{setModal(false)}} type='btn' className="active tab_btn pic_btn float-right">Close</button>
            </Modal>

            
            </>
           
    )
}
