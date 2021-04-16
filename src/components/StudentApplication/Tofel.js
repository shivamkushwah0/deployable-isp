import React,{useState} from 'react'
import Label from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
export default function Tofel(props) {
    
    //score validation
    const [blurScore , setBlurScore] = useState({
        lsScore:false , rsScore:false , year:false, ssScore:false, wsScore:false, tsScore:false 
    })
    const isScore = (score) => {
        const validScore = RegExp(/^[0-9]*$/i)
        return validScore.test(score)
    }

    return (
        <div>
             {props.inputFields.map((inputField,index)=>(
            <div className="p-5 si_div">
                <h1 className="text-center si_subhead">Tofel</h1>
                <div className="row">
                            <div className="col-sm-6 text-center">
                                <Label>REGISTERATION NO</Label>
                                <TextField  className="textfield" name="registerno" value={inputField.registerno} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                            </div>
                            <div className="col-sm-6 text-center">
                            <Label>YEAR</Label> 
                                <TextField onBlur={()=>{setBlurScore({...blurScore , year:true })}} className="textfield" name="year" value={inputField.year} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                                <br />
                                {
                                    isScore(inputField.year) || !blurScore.year ? null : (<span className="text-red">Please enter a valid year</span>)
                                }
                            </div>
                            
                </div>
                <div className="row">
                <div className="col-sm-6 text-center">
                            <Label>NAME OF INSTITUTE</Label>
                                <TextField className="textfield" name="nameofinst" value={inputField.nameofinst} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                            </div>
                            <div className="col-sm-6 text-center">
                            <Label>LISTENING SCORE</Label>
                                <TextField onBlur={()=>{setBlurScore({...blurScore , lsScore:true })}} className="textfield" name="ls" value={inputField.ls} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                                <br />
                                {
                                    isScore(inputField.ls) || !blurScore.lsScore ? null : (<span className="text-red">Please enter a valid score</span>)
                                }
                            </div>
                </div>
                <div className="row">
                            
                            <div className="col-sm-6 text-center">
                            <Label>READING SCORE</Label>
                                <TextField onBlur={()=>{setBlurScore({...blurScore , rsScore:true })}} className="textfield" name="rs" value={inputField.rs} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                                <br />
                                {
                                    isScore(inputField.rs) || !blurScore.rsScore ? null : (<span className="text-red">Please enter a valid score</span>)
                                }
                            </div>
                            <div className="col-sm-6 text-center">
                            <Label>SPEAKING SCORE</Label>
                                <TextField onBlur={()=>{setBlurScore({...blurScore , ssScore:true })}} className="textfield" name="ss" value={inputField.ss} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                                <br />
                                {
                                    isScore(inputField.ss) || !blurScore.ssScore ? null : (<span className="text-red">Please enter a valid score</span>)
                                }
                            </div>
                </div>
                <div className="row">
                            <div className="col-sm-6 text-center">
                            <Label>Writing Score</Label>
                                <TextField onBlur={()=>{setBlurScore({...blurScore , wsScore:true })}} className="textfield" name="ws" value={inputField.ws} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                                <br />
                                {
                                    isScore(inputField.ws) || !blurScore.wsScore ? null : (<span className="text-red">Please enter a valid score</span>)
                                }
                            </div>
                            <div className="col-sm-6 text-center">
                            <Label>Test Score</Label>
                                <TextField onBlur={()=>{setBlurScore({...blurScore , tsScore:true })}} className="textfield" name="ts" value={inputField.ts} variant="filled" onChange={event=>props.handleChangeInput(index,event)}></TextField>
                                <br />
                                {
                                    isScore(inputField.ts) || !blurScore.tsScore ? null : (<span className="text-red">Please enter a valid score</span>)
                                }
                            </div>
                            
                </div>
            </div>
             ))}
             <hr/>
             </div>
    )
}
