import React , {useState} from 'react';
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
export const Publications = (props) => {
    const classes=useStyles();
    return (
        <div className="text-center">
            <h1 className="py-5">Publications</h1>
            <form className={classes.root}>
                {props.inputFields.map((inputField,index)=>(
                    <div key={index}>
                        <TextField fullWidth
                        multiline
                        rows={4}
                        name="publication"
                        label="Publication"
                        value={inputField}
                        variant="filled"
                        onChange={event=>props.handleChangeInput(index,event)}>

                        </TextField>
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

        </div>
    )
}