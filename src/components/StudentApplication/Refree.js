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
export default function Refree(props) {
    const classes=useStyles();
    //email validation
    const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
      const [blurEmail , setBlurEmail] = useState(false)
      const isEmail = (email) => {
          return (validEmailRegex.test(email))
          
      }
    
    return (
        <Container>
            <h1 className="my-5">Refree Details</h1>
            <form className={classes.root}>
                {props.inputFields.map((inputField,index)=>(
                    <div key={index}>
                        <TextField
                        name="name"
                        label="Name"
                        value={inputField.name}
                        variant="filled"
                        onChange={event=>props.handleChangeInput(index,event)}>

                        </TextField>
                        <TextField
                        name="position"
                        label="Position"
                        value={inputField.position}
                        variant="filled"
                        onChange={event=>props.handleChangeInput(index,event)}>

                        </TextField>
                        <TextField
                        name="organization"
                        label="organization"
                        value={inputField.organization}
                        variant="filled"
                        onChange={event=>props.handleChangeInput(index,event)}>

                        </TextField>
                        <TextField onBlur={()=>{setBlurEmail(true)}}
                        name="email"
                        label="Email Id"
                        value={inputField.email}
                        variant="filled"
                        onChange={event=>props.handleChangeInput(index,event)}>

                        </TextField>
                        
                        <TextField
                        name="contact"
                        label="Contact"
                        value={inputField.contact}
                        variant="filled"
                        onChange={event=>props.handleChangeInput(index,event)}>

                        </TextField>
                        <br />
                                {
                                    isEmail(inputField.email) || !blurEmail ? null : (<span className="text-red">Please enter a valid email id</span>)
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
