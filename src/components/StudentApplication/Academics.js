import React,{useState}  from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'

const useStyles=makeStyles((theme)=>({
    root:{
       '& .MuiTextField-root':{
           margin:theme.spacing(1),
       }
    }
}))
export default function Academics(props) {
    const classes=useStyles();
   //number validation
   const [blurNum , setBlurNum] = useState({
    year : false, cgpa : false, outof: false
    })
    const isScore = (score) => {
    const validScore = RegExp(/^[0-9]*$/i)
    return validScore.test(score)
    }
    const isCGPA = (cgpa) => {
        return (!isNaN(cgpa))
    }
    return (
        <Container>
            <h1 className="my-5">Academic Qualifications</h1>
            <form className={classes.root}>
                {props.inputFields.map((inputField,index)=>(
                    <div key={index}>
                        <TextField 
                        name="degreeSpecialization"
                        label="Degree Specialization"
                        value={inputField.degreeSpecialization}
                        variant="filled"
                        onChange={event=>props.handleChangeInput(index,event)}>

                        </TextField>
                        <TextField
                        name="schoolCollege"
                        label="School/College"
                        value={inputField.schoolCollege}
                        variant="filled"
                        onChange={event=>props.handleChangeInput(index,event)}>

                        </TextField>
                        <TextField
                        name="universityBoard"
                        label="University/Board"
                        value={inputField.universityBoard}
                        variant="filled"
                        onChange={event=>props.handleChangeInput(index,event)}>

                        </TextField>

                        <TextField onBlur={()=>{setBlurNum({...blurNum , year:true }); props.setError(!isScore(inputField.year))}}
                        name="year"
                        label="year"
                        value={inputField.year}
                        variant="filled"
                        onChange={event=>props.handleChangeInput(index,event)}>                           
                        </TextField>
                       
                               
                        <TextField onBlur={()=>{setBlurNum({...blurNum , cgpa:true }); props.setError(!isCGPA(inputField.percentage)) }}
                        name="percentage"
                        label="Percentage/CGPA/CPI"
                        value={inputField.percentage}
                        variant="filled"
                        onChange={event=>props.handleChangeInput(index,event)}>
                        </TextField>

                        <TextField onBlur={()=>{setBlurNum({...blurNum , outof:true }); props.setError(!isCGPA(inputField.outof)) }}
                        name="outof"
                        label="Out Of"
                        value={inputField.outof}
                        variant="filled"
                        onChange={event=>props.handleChangeInput(index,event)}></TextField>
                                {
                                    isScore(inputField.year) || !blurNum.year ? null : (<div> <br /> <span className="text-red">Please enter a valid year</span></div>)
                                }
                                
                                {
                                    isCGPA(inputField.percentage) || !blurNum.cgpa ? null : (<div> <br /> <span className="text-red">Please enter a valid percentage or CGPA</span></div>)
                                }
                        <br/>
                      { (index >0) &&
                        <IconButton onClick={()=>props.handleRemoveFields(index)}>
                            <RemoveIcon/>
                        </IconButton>
                    } 
                        <IconButton onClick={()=>props.handleAddFields()}>
                            <AddIcon/>
                        </IconButton>
                    </div>
                ))}
            </form>
            <hr/>
        </Container>
    )
}
