import React,{useState} from 'react'
import Label from '@material-ui/core/InputLabel'
import './StudentApplication.css'
import TextField from '@material-ui/core/TextField'
import "./StudentApplication.css"
export default function ContactDetails(props) {
    //email validation
    const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
      const [blurEmail , setBlurEmail] = useState(false)
      const isEmail = (email) => {
          return (validEmailRegex.test(email))
          
      }
      //phone number validation
      const [blurNum , setBlurNum] = useState(false)
      const isNum = (num) => {
          const validNum = RegExp(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i); 
          return (validNum.test(num))
      }
    return (
        <div>
             {props.inputFields.map((inputField,index)=>(
            <div className="p-5 si_div" key={index}>
                <h1 className="text-center si_subhead">Contact Details</h1>
                <div className="row">
                            <div className="col-sm-6 text-center">
                                <Label>Present address<span className="text-red">*</span></Label>
                                <TextField className="textfield" name="presentadress" value={inputField.presentadress} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                            </div>
                            <div className="col-sm-6 text-center">
                                <Label>Permanent Address<span className="text-red">*</span></Label>
                                <TextField className="textfield" name="permanentAdress" value={inputField.permanentAdress} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                            </div>
                            
                        </div>
                        <div className="row">
                        <div className="col-sm-6 text-center">
                            <Label>Phone number<span className="text-red">*</span></Label>
                                <TextField onBlur={()=>{setBlurNum(true)}} className="textfield" name="phonenum" value={inputField.phonenum} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                                <br />
                                {
                                    console.log(isNum(inputField.phonenum))
                                }
                                {
                                    isNum(inputField.phonenum) || !blurNum ? null : (<span className="text-red">Please enter a valid phone number containing only 10 digits</span>)
                                }

                            </div>
                            <div className="col-sm-6 text-center">
                            <Label>Email Id<span className="text-red">*</span></Label>
                                <TextField onBlur={()=>{setBlurEmail(true)}} className="textfield" type="email" name="email" value={inputField.email} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                                <br />
                                {
                                    isEmail(inputField.email) || !blurEmail ? null : (<span className="text-red">Please enter a valid email id</span>)
                                }
                            </div>
                        </div>
                        <div className="row mt-5">
                            
                            <div className="col-sm-6 text-center">
                                <Label>Passport No.<span className="text-red">*</span></Label>
                                <TextField className="textfield" name="pasno" value={inputField.pasno} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                            </div>
                           
                        </div>
            </div>
             ))}
             <hr/>
        </div>
    )
}
