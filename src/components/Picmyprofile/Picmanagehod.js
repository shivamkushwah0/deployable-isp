import React, { Component } from 'react'
import {Link} from 'react-router-dom';

import '../Picwindow/Picwindow.css'
export default class Picmanagehod extends Component {
    constructor(props){
        super();
        this.state={
            deptHeads : {}
        }
        this.clicking=this.clicking.bind(this)
    }
    componentDidMount = () => {
        const address = "https://iitp-isa-portal-backend.herokuapp.com/backend/admin/departments"
        fetch(address , {
            method : 'get'
        })
        .then(res => {
            if(res.ok)
            return res.json();
        })
        .then(data => {
            console.log(data)
            this.setState({deptHeads : data})
            console.log(this.state.deptHeads);
        })
        .catch(err=>console.log(err))
    }
    clicking=files=>{
        console.log(files)
        this.props.history.push("/stuprofile")
    }
    render() {
        const RenderHODs = () => {
            console.log("helloooo")
            console.log(this.state.deptHeads);
            if(this.state.deptHeads.departments==undefined)
            return null ;

            const hods = this.state.deptHeads.departments.map((hod)=>{
                const link = '/seehodprofile/'+hod._id;
                const reset_link = "/resetprofilehod/"+hod._id;
                console.log(link);
                return(
                    
                    <tr>
                        <td>{hod.name}</td>
                        <td>{hod.departmentId}</td>
                        <td>{hod.email}</td>                       
                        <td><Link to={link}><i className="fa fa-user"> View Profile</i></Link></td>
                    </tr>
                    
                )
            })
            return hods;
        }
        
        return (
            
            <div className="container margintop">
               
               <table className="table table-striped">
               <thead>
               <tr>
                       <th>Department Head Name</th>
                       <th>Department</th>
                       <th>Email</th>
                       <th>Edit/View</th>
                      
                   </tr>
               </thead>
                   <tbody>
                   <RenderHODs />
                   </tbody>
               </table>
               <Link to={`/addprofilehod/${this.props.id}`}><button type='btn' className="active tab_btn pic_btn">Add HOD</button></Link>
               </div>
               
    
            
        )
    }
}
