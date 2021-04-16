import React ,{useState} from 'react'
import {Container, Row, Col ,Button} from  'react-bootstrap';
import Hodforward from './Hodforward';
import Hodregis from './Hodregis';
import GovtApplications from './GovtApplications';
import Hodreject from './Hodreject';


export default function Picwindow(props) {
    const [isregistered,setisregistered]=useState(true);
    const [govtApplications , setGovtApplications] = useState(false);
    const [iscancelled,setiscancelled]=useState(false);
    const [isforwarded,setisforwarded]=useState(false);

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
        <>
    <div className="container margintop">
        <div className="mb-5 tab_btn_section">
                  <Row>
                    <Col md={3}>
                         {
                              isregistered ? 
                              <button onClick={funcRegistered} type='btn' className="active tab_btn pic_btn">Registered Students</button> : 
                              <button onClick={funcRegistered} type='btn' className="pic_btn">Registered Students</button>
                         }
                      
                    </Col>
                    
                    <Col md={3}>
                    <button onClick={funcCancelled} type='btn' className="pic_btn">Cancelled Students</button>
                    </Col>
                    <Col md={3}>
                    <button onClick={funcForwarded} type='btn' className="pic_btn">Forwarded Students</button>
                    </Col>
                    <Col md={3}>
                    <button onClick={funcGovtApplications} type="btn" className="pic_btn">Government Applications</button>
                    </Col>
                  </Row>
                </div>
            {
                isregistered && iscancelled === false  && isforwarded === false && govtApplications===false ? 
                (
                    <>
                    <Hodregis hid={props.match.params.id}/>
                    
                    </>
                )
                :isregistered === false && iscancelled  && isforwarded === false && govtApplications===false?
                (<>
                    <Hodreject hid={props.match.params.id}/>
                    
                    </>
                )
               
                :isregistered === false && iscancelled===false && isforwarded && govtApplications===false?
                (   <>
                    <Hodforward hid={props.match.params.id}/>
                    
                    </>
                )  
                :isregistered === false && iscancelled===false && isforwarded===false && govtApplications ?
                (   <>
                    <GovtApplications />
                    </>
                )  
                :null
            }
            <button onClick={()=>{window.location.href="http://localhost:3000/hodmyprofile/"+props.match.params.id}} className="active tab_btn pic_btn">My Profile</button>
            </div>
            </>
           
    )
}
