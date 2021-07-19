import React ,{useState} from 'react'
import Label from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
export default function Gre(props) {

     //score validation
     const [blurScore , setBlurScore] = useState({
         gstScore:false , stsScore:false , year:false 
     })
     const isScore = (score) => {
         const validScore = RegExp(/^[0-9]*$/i)
         return validScore.test(score)
     }

    return (
        <div>
             {props.inputFields.map((inputField,index)=>(
            <div className="p-5 si_div">
                <h1 className="text-center si_subhead">GRE (Graduate Record Examination)</h1>
                
                <div className="row">
                            <div className="col-sm-6 text-center">
                                <Label>Registeration No.</Label>
                                <TextField className="textfield" name="registerno" value={inputField.registerno} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                            </div>
                            <div className="col-sm-6 text-center">
                                <Label>Year</Label>
                                <TextField onBlur={()=>{setBlurScore({...blurScore , year:true }); props.setError(!isScore(inputField.year))}} className="textfield" name="year" value={inputField.year} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                                <br />
                                {
                                    isScore(inputField.year) || !blurScore.year ? null : (<span className="text-red">Please enter a valid year</span>)
                                }
                            </div>
                            
                </div>
                <div className="row">
                <div className="col-sm-6 text-center">
                                <Label>Name of Institute</Label>
                                <TextField className="textfield" name="nameofinst" value={inputField.nameofinst} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                            </div>
                            <div className="col-sm-6 text-center">
                                <Label>General Test Score </Label>
                                <TextField onBlur={()=>{setBlurScore({...blurScore , gstScore:true }); props.setError(!isScore(inputField.gts))}} className="textfield" name="gts"  value={inputField.gts} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                                <br />
                                {
                                    isScore(inputField.gts) || !blurScore.gstScore ? null : (<span className="text-red">Please enter a valid score</span>)
                                }
                            </div>

                </div>
                        <div className="row mt-5">
                            
                            <div className="col-sm-6 text-center">
                                <Label>Subject Test Score</Label>
                                <TextField onBlur={()=>{setBlurScore({...blurScore , stsScore:true }); props.setError(!isScore(inputField.sts))}} className="textfield" name="sts" value={inputField.sts} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                                <br />
                                {
                                    isScore(inputField.sts) || !blurScore.stsScore ? null : (<span className="text-red">Please enter a valid score</span>)
                                }
                            </div>
                           
                </div>
            </div>
             ))} <hr/></div>
    )
}
