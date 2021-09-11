import React, {Component} from 'react';
import Gre from './Gre';
import Details  from './Details';
import ContactDetails from './ContactDetails';
import Professional from './Professional';
import Publication from './Publication';
import Refree from './Refree';
import Toefl from './Toefl'
import Academics from './Academics';
import Statement from './Statement'
class PDF extends Component {
    render () {
        console.log(this.props)
        const student  = this.props.details;
        console.log(student);
        // var details = {};
        const details = {
            name : student.name ,
            dob : student.dob,
            gender : student.gender,
            category : student.category,
            nationality : student.nationality,
            program : student.program,
            department : student.department,
            email:student.userName,
            image : student.image
        }
        return (
            <div className = "container" style ={{margin : 20}}>
                <div className = "row text-center m-3" >
                    <div className = "col-3">
                        <img src="/assets/logo.png" height={150} width={150} />
                    </div>
                    <div style={{fontSize : 50,margin:"auto"}} className = "col-9 text-primary">
                        <h1>INDIAN INSTITUTE OF TECHNOLOGY PATNA</h1>
                    </div>
                    <h1>Application Form</h1>
                </div>
                <Details details = {details} />
                {/* <ContactDetails details={student.contactDetails} /> */}
                {student.contactDetails!=undefined ?  <ContactDetails details={student.contactDetails} /> : null }
                {student.toeflScore!=undefined ? <Toefl details = {student.toeflScore} /> : null }
                {student.greScore!=undefined ? <Gre details = {student.greScore} /> : null}
                {student.academicQualification.length!=0 ? <Academics details={student.academicQualification} /> : null}
                {student.professionalExperience.length!=0 ? <Professional details={student.professionalExperience} /> : null }
                {student.refereeDetails.length!=0 ? <Refree details={student.refereeDetails} /> : null}
                {student.statementOfPurpose!=undefined ? <Statement details = {student.statementOfPurpose} /> : null}
                {student.publications.length!=0 ? <Publication details = {student.publications} /> : null }
            </div>
        )
    }
}

export default PDF;
