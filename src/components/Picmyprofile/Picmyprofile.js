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
            method:'get',
            headers : {
                'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
            },
            
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
        fetch(detailAddress , {
            method : 'get',
            headers : {
                'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
            },
            
        })
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

        if(programme.length===0)
        {
            alert("No fields can be empty, make sure to add the required fields");
            return ;
        }
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/admin/programs";
        console.log([...details.programs , programme]);
        fetch(address , {
            method : 'PATCH',
            headers: {                            
                "Content-Type": "application/json",
                'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
              },
            body : JSON.stringify({ programs : [...details.programs , programme] }),
            
        })
        .then(res=> {
            if(res.ok)
            return res.json();
            else alert("Please check your internet connection and try again")
        })
        .then(data => {
            console.log(data);
            setModal(false);
            alert("Program "+ programme+" has been added, please refresh to see the changes");
        })
        .catch(err=>console.log(err))
    }

    const addDepartment = () => {
        if(department.department.length===0 || department.programme.length===0)
        {
            alert("No fields can be empty, make sure to add the required fields");
            return ;
        }
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/admin/programsAndDepartments";
         const b = details.programAndDepartments;
         var flag = false;
         var newProgramme = b.map((element) => {
             if(element.program === department.programme)
             {
                flag = true;
                var a = [...element.courses , department.department]
                a = a.filter(function(item, pos) {
                    return a.indexOf(item) == pos;
                })
                var c = {courses : a, program : element.program}; 
                return c;
             }
             else {
                 var c = {courses : element.courses , program : element.program}; 
                return  c;
             }
         });

         if(!flag)
         newProgramme = [...newProgramme, {
             courses : [department.department],
             program : department.programme 
         }] 

         console.log(newProgramme);
        fetch(address , {
            method : "PATCH",
            headers: {                             
                "Content-Type": "application/json" ,
                'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
              },
            body : JSON.stringify({
                programsAndDepartments : newProgramme
            }),
            
        })
        .then(res => { if(res.ok)
            return res.json();
            else alert("Please check your internet connection and try again")
        })
        .then(data => {console.log(data);
        if(data!==undefined)
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
     return ( <div>
    <div className="container text-center margintop">
        <div className="mb-5 tab_btn_section">
                  <Row>
                    <Col md={3}>
                         {
                              home ? 
                              <button onClick={funchome} type='btn' className="active tab_btn pic_btn_active">Home</button> : 
                              <button onClick={funchome} type='btn' className="pic_btn">Home</button>
                         }
                      
                    </Col>
                    <Col md={3}>
                        {
                            pass ? <button onClick={funcpass} type='btn' className="pic_btn_active">Reset Password</button> : 
                            <button onClick={funcpass} type='btn' className="pic_btn">Reset Password</button>
                        }
                    
                    </Col>
                    <Col md={3}>
                        {
                            managehod ? 
                            <button onClick={funmghod} type='btn' className="pic_btn_active">Manage Hod</button>:
                            <button onClick={funmghod} type='btn' className="pic_btn">Manage Hod</button>
                        }
                    
                    </Col>
                    <Col md={3}>
                    <Link to="/login" > <button onClick = {() => {localStorage.removeItem('refreshToken'); localStorage.removeItem('authToken')  }} className="pic_btn">Logout</button></Link>                 
                    </Col>
                    
                  </Row>
                </div>
            {
                home && log === false && pass === false && managehod===false  ? 
                (
                    <div>
                   <Pichome user={user} id={props.match.params.id}/>
                    
                    </div>
                )
                :home === false && log && pass === false && managehod===false  ?
                (<div>
                    sfdgfhv
                    
                    </div>
                )
                :home === false && log===false && pass && managehod===false ?
                (   <div>
                    <Picreset toHome={funchome} user={user}/>
                    
                    </div>
                )
                :home === false && log===false && pass===false && managehod ?
                (   <div>
                    <Picmanagehod id = {props.match.params.id}/>
                    
                    </div>
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
                    (<div className="text-center row" style={{width:"100%"}}>
                    <TextField
                        fullWidth
                        name="programme"
                        label="Enter name of the programme to be added"
                        value={programme}
                        variant="filled"
                        onChange={e=>{setProgramme(e.target.value)}} > </TextField>
                        <br/>
                        <br/>
                        <br/>
                        <div className="col-6 text-center">
                        <button type='btn' className="active tab_btn pic_btn mt-4" onClick={()=>{addProgramme()}}>Add Programme</button>
                        </div>
                        <div className="col-6 text-center">
                        <button onClick={()=>{setModal(false)}} type='btn' className="active tab_btn pic_btn float-right">Close</button>
                        </div>
                        
                        </div>
                        ) :
                    (
                        <div className="text-center row" style={{width:"100%"}}>
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
                        <br/>
                        <br/>
                        <div className = "col-6 text-center">
                        <button type='btn' className="active tab_btn pic_btn mt-4" onClick={addDepartment}>Add Department</button>
                        </div>
                        <div className = "col-6 text-center">
                        <button onClick={()=>{setModal(false)}} type='btn' className="active tab_btn pic_btn float-right">Close</button>
                        </div>
                        </div>
                    ) 
                }
                <br />
            </Modal>
            </div>
           
    )
}
