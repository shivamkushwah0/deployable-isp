import React ,{useState , useEffect} from 'react'
import {Container, Row, Col ,Button} from  'react-bootstrap';

import {Link} from 'react-router-dom';
import Pichome from './Pichome';
import Picmanagehod from './Picmanagehod';
import Picreset from './Picreset';

export default function Picmyprofile(props) {
    const [home,sethome]=useState(true);
    const [pass,setpass]=useState(false);
    const [log,setlog]=useState(false);
    const [managehod,setmanagehod]=useState(false);
    const [user , setUser] = useState({});
    useEffect(()=>{
        const address = 'https://iitp-isa-portal-backend.herokuapp.com/backend/admin/profile'
        fetch(address , {
            method:'get'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUser(data.admin)
        })
        .catch(err => {
            alert("Please check your internet connection and try again")
        })
    },[])

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
            <div className="margintop text-center">
            <Link to={`/picwindow/${props.match.params.id}`}><button type='btn' className="active tab_btn pic_btn">Admin Window</button></Link>

            </div>
            </div>
            </>
           
    )
}
