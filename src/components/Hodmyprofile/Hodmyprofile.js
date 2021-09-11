import React ,{useState} from 'react'
import {Container, Row, Col ,Button} from  'react-bootstrap';
import Hodhome from './Hodhome';
import {Link} from 'react-router-dom';
import Resetprofilehod from './Resetprofilehod';
import { PagesSharp } from '@material-ui/icons';
export default function Picwindow(props) {
    const [home,sethome]=useState(true);
    const [pass,setpass]=useState(false);
    const [log,setlog]=useState(false);
    const funchome = () => {
        sethome(true);
        setpass(false);
        setlog(false);
        
   }
   const funcpass = () => {
        sethome(false);
        setpass(true);
        setlog(false);
        
   }
   const funclog = () => {
        sethome(false);
        setpass(false);
        setlog(true);
        
   }
     return (
        <div>
    <div className="container text-center margintop">
        <div className="mb-5 tab_btn_section">
                  <Row>
                    <Col md={4}>
                         {
                              home ? 
                              <button onClick={funchome} type='btn' className="active tab_btn pic_btn_active">Home</button> : 
                              <button onClick={funchome} type='btn' className="pic_btn">Home</button>
                         }
                      
                    </Col>
                    <Col md={4}>
                    <button onClick={funcpass} type='btn' className={ pass ? "pic_btn_active" : "pic_btn"}>Reset password</button>
                    </Col>
                    <Col md={4}>
                    <Link to="/login" > <button onClick = {() => {localStorage.removeItem('refreshToken'); localStorage.removeItem('authToken')  }} className="pic_btn">Logout</button></Link>
                    </Col>
                    
                  </Row>
                </div>
            {
                home && log === false && pass === false  ? 
                (
                    <div>
                    <Hodhome id={props.match.params.id}/>
                    
                    </div>
                )
                :home === false && log && pass === false  ?
                (<div>
                    sfdgfhv
                    
                    </div>
                )
                :home === false && log===false && pass  ?
                (   <div>
                    <Resetprofilehod id={props.match.params.id} funchome={funchome}/>
                    
                    </div>
                )
                 :null
            }
            <div className="margintop">
                <Link to={`/hodwindow/${props.match.params.id}`}><button className="active tab_btn pic_btn" >HOD window</button></Link>
            
            </div>
            </div>
            
            </div>
           
    )
}
