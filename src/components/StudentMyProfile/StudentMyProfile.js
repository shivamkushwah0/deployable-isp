import React ,{useState , useEffect} from 'react'
import {Container, Row, Col ,Button} from  'react-bootstrap';
import Home from './Home';
import {Link} from 'react-router-dom'
import ApplicationStatus from './ApplicationStatus';
import ChangePassword from './ChangePassword';

export default function StudentMyProfile(props) {
    const [home,sethome]=useState(true);
    const [status,setstatus]=useState(false);
    const [pass,setpass]=useState(false);
    const [log,setlog]=useState(false);
    const [data,setData] = useState({});
    const [aid,setaid] = useState('');

    useEffect(() => {
        console.log(props.match.params.id)
// const id = {props.match.params.id}
setaid(props.match.params.id);
console.log(aid);
const id = props.match.params.id;
const address = "http://localhost:5100/backend/applicant/profile/"+id;
console.log(address);
fetch(address , {
    method : 'get',
    headers : {
        'x-auth-token': localStorage.getItem('refreshToken'),
        'x-refresh-token': localStorage.getItem('refreshToken'),
    },
    payload : {
        role : localStorage.getItem('role'),
    }
}).then((res) => {
    if(res.ok)
        return res.json();
}).then((data)=> {
    console.log(data);
    setData(data);
}).catch(err=>console.log(err))
},[]);
    
    const funchome = () => {
        sethome(true);
        setstatus(false);
        setpass(false);
        setlog(false);
   }
   const funcstatus = () => {
    sethome(false);
    setstatus(true);
    setpass(false);
    setlog(false);
   }
   const funcpass = () => {
    sethome(false);
    setstatus(false);
    setpass(true);
    setlog(false);
   }
   const funclog= () => {
    sethome(false);
    setstatus(false);
    setpass(false);
    setlog(true);
   }
         
    return (
 
        <div>
    <div className="container margintop">
        <div className="mb-5 tab_btn_section">
                  <Row>
                    <Col md={4} className="text-center">
                         {
                              home ? 
                              <button onClick={funchome} type='btn' className="active tab_btn pic_btn_active">Home</button> : 
                              <button onClick={funchome} type='btn' className="pic_btn">Home</button>
                         }
                      
                    </Col>
                    <Col md={4} className="text-center" >
                    <button onClick={funcpass} type='btn' className={pass ? "pic_btn_active" : "pic_btn" }>Reset Password</button>
                    </Col>
                    <Col md={4} className="text-center">
                   <Link to="/login"> <button onClick={funclog} type='btn' className="pic_btn">Logout</button></Link>
                    </Col>
                  </Row>
                </div>
            {
                home && status === false && pass === false && log === false ? 
                (
                    <div>
                    <Home data={data.applicantDetails} toggleStatus={funcstatus}/>
                    
                    </div>
                )
                :home === false && status===false && pass && log === false ?
                (   <div>
                    <ChangePassword data={data.applicantDetails} toHome={funchome}/>
                    
                    </div>
                )
                :home === false && status===false && pass===false && log ?
                (   <div>
                    
                    <h1>ghhab sjmdvfb</h1>
                    </div>
                )  
                :null
            }
            </div>
            </div>
           
    )
}
