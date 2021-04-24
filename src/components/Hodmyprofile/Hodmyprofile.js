import React ,{useState} from 'react'
import {Container, Row, Col ,Button} from  'react-bootstrap';
import Hodhome from './Hodhome';
import {Link} from 'react-router-dom';
import Resetprofilehod from './Resetprofilehod';
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
        <>
    <div className="container text-center margintop">
        <div className="mb-5 tab_btn_section">
                  <Row>
                    <Col md={4}>
                         {
                              home ? 
                              <button onClick={funchome} type='btn' className="active tab_btn pic_btn">Home</button> : 
                              <button onClick={funchome} type='btn' className="pic_btn">Home</button>
                         }
                      
                    </Col>
                    <Col md={4}>
                    <button onClick={funcpass} type='btn' className="pic_btn">Reset password</button>
                    </Col>
                    <Col md={4}>
                    <Link to="/login"><button onClick={funclog} type='btn' className="pic_btn">log out</button></Link>
                    </Col>
                    
                  </Row>
                </div>
            {
                home && log === false && pass === false  ? 
                (
                    <>
                    <Hodhome id={props.match.params.id}/>
                    
                    </>
                )
                :home === false && log && pass === false  ?
                (<>
                    sfdgfhv
                    
                    </>
                )
                :home === false && log===false && pass  ?
                (   <>
                    <Resetprofilehod id={props.match.params.id} funchome={funchome}/>
                    
                    </>
                )
                 :null
            }
            <div className="margintop">
            <button onClick={()=>{window.location.href='https://iitp-isa.netlify.app/hodwindow/'+props.match.params.id}} className="active tab_btn pic_btn" >HOD window</button>
            </div>
            </div>
            
            </>
           
    )
}
