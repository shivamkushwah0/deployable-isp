import React ,{useState , useEffect} from 'react'
import {Container, Row, Col ,Button} from  'react-bootstrap';
import Hodforward from './Hodforward';
import Hodregis from './Hodregis';
import GovtApplications from './GovtApplications';
import Hodreject from './Hodreject';
import {Link} from 'react-router-dom'

export default function Picwindow(props) {
    const [isregistered,setisregistered]=useState(true);
    const [govtApplications , setGovtApplications] = useState(false);
    const [iscancelled,setiscancelled]=useState(false);
    const [isforwarded,setisforwarded]=useState(false);
    const [user, setUser] = useState({});
    useEffect(()=>{
        const address = 'https://iitp-isa-portal-backend.herokuapp.com/backend/admin/departments/';
        fetch(address , {
            method : 'get',
            headers : {
                'x-auth-token': localStorage.getItem('refreshToken'),
                'x-refresh-token': localStorage.getItem('refreshToken'),
            },
            
        })
        .then(res => {
            if(res.ok)
            return res.json();
        })
        .then(data => {
            console.log(data)
            const id = props.match?props.match.params.id : props.id; 
            const users =  data.departments.filter((hod)=>hod._id === id)[0];
            setUser(users);
            console.log(user);
        })
        .catch(err=>console.log(err))
    },[])

    const funcRegistered = () => {
        setisregistered(true);
        setGovtApplications(false);
        setiscancelled(false);
        setisforwarded(false)
   }
   const funcGovtApplications = () => {
        setisregistered(false);
        setiscancelled(false);
        setGovtApplications(true);
        setisforwarded(false)
   }
   const funcCancelled = () => {
        setisregistered(false);
        setiscancelled(true);
        setGovtApplications(false);
        setisforwarded(false)
   }
   const funcForwarded = () => {
        setisregistered(false);
        setiscancelled(false);
        setGovtApplications(false);
        setisforwarded(true)
   }
    return (
        <div>
    <div className="container margintop text-center">
        <div className="mb-5 tab_btn_section text-center">
                  <Row>
                    <Col md={3}>
                         {
                              isregistered ? 
                              <button onClick={funcRegistered} type='btn' className="active tab_btn pic_btn_active">Registered Students</button> : 
                              <button onClick={funcRegistered} type='btn' className="pic_btn">Registered Students</button>
                         }
                      
                    </Col>
                    
                    <Col md={3}>
                    <button onClick={funcCancelled} type='btn' className={ iscancelled ? "pic_btn_active" : "pic_btn"}>Cancelled Students</button>
                    </Col>
                    <Col md={3}>
                    <button onClick={funcForwarded} type='btn' className={ isforwarded ? "pic_btn_active" : "pic_btn"}>Forwarded Students</button>
                    </Col>
                    <Col md={3}>
                    <button onClick={funcGovtApplications} type="btn" className={ govtApplications ? "pic_btn_active" : "pic_btn"}>Government Applications</button>
                    </Col>
                  </Row>
                </div>
            {
                isregistered && iscancelled === false  && isforwarded === false && govtApplications===false ? 
                (
                    <div>
                    <Hodregis hid={props.match.params.id}/>
                    
                    </div>
                )
                :isregistered === false && iscancelled  && isforwarded === false && govtApplications===false?
                (<div>
                    <Hodreject hid={props.match.params.id}/>
                    
                    </div>
                )
               
                :isregistered === false && iscancelled===false && isforwarded && govtApplications===false?
                (   <div>
                    <Hodforward hid={props.match.params.id}/>
                    
                    </div>
                )  
                :isregistered === false && iscancelled===false && isforwarded===false && govtApplications ?
                (   <div>
                    <GovtApplications hid={user.departmentId}/>
                    </div>
                )  
                :null
            }
            <div className="margintop text-center">
                <Link to={`/hodmyprofile/${props.match.params.id}`}><button className="active tab_btn pic_btn">My Profile</button></Link>
            
            </div>
            </div>
            </div>
           
    )
}
