import React from 'react'
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import LogIn from "./components/Login/Login"
import Landing from './components/Landing/Landing';
import StudentMyProfile from './components/StudentMyProfile/StudentMyProfile';
import studentinformation from './components/StudentApplication/Studentinformation';
import Picwindow from './components/Picwindow/Picwindow';
import StudentProfile from './components/StudentProfile/StudentProfile';
import SignupAsStudent from './components/SignUp/SignupAsStudent/SignupAsStudent';
import SignupAsEmployer from './components/SignUp/SignUpAsEmp/SignupAsEmployer';
import Hodstuprofile from './components/hod/Hodstuprofile';
import Hodwindow from './components/hod/Hodwindow';
import Academicsection from './components/academicsection/Academicsection';
import Hodmyprofile from './components/Hodmyprofile/Hodmyprofile';
import Edithodprofile from './components/Hodmyprofile/Edithodprofile';
import Picmyprofile from './components/Picmyprofile/Picmyprofile';
import Piceditprofile from './components/Picmyprofile/Piceditprofile';
import Addprofilehod from './components/Hodmyprofile/Addprofilehod';
import Hodhome from './components/Hodmyprofile/Hodhome';
import userResetPassword from './components/Login/userResetPassword'
import resetPassword from './components/Login/resetPassword'
import ConfirmEmail from './components/SignUp/SignupAsStudent/ConfirmEmail/'

import 'bootstrap/dist/css/bootstrap.min.css'
const App =() => {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
        
        <Switch>
          <Route exact path="/" component={Landing}/>
           <Route exact path="/login" component={LogIn}/>
           <Route exact path="/picwindow/:id" component={Picwindow}/>
            <Route exact path="/signup" component={SignupAsStudent} />
            <Route exact path="/stuinfo/:id" component={studentinformation}/>
            <Route exact path="/stuprofile/:id/:aid" component={StudentProfile}/>
            <Route exact path="/signstu" component={SignupAsStudent}/>
            <Route exact path="/signemp" component={SignupAsEmployer}/>
            <Route exact path="/hodstuprofile/:hid/:id" component={Hodstuprofile}/>
            <Route exact path="/hodwindow/:id" component={Hodwindow}/>
            <Route exact path="/stumyprofile/:id" component={StudentMyProfile}/>
            <Route exact path="/aswindow/:id" component={Academicsection}/>
            <Route exact path="/hodmyprofile/:id" component={Hodmyprofile}/>
            <Route exact path="/edithodprofile/:id" component={Edithodprofile}/>
            <Route exact path="/picmyprofile/:id" component={Picmyprofile}/>
            <Route exact path="/piceditprofile/:id" component={Piceditprofile}/>
            <Route exact path="/addprofilehod/:id" component={Addprofilehod}/>
            <Route exact path="/seehodprofile/:id" component={Hodhome}/>
            <Route path="/user-reset-password" component = {userResetPassword} />
            <Route path="/resetPassword/:token" component = {resetPassword} />
            <Route path="/emailConfirm/:token" component = {ConfirmEmail} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

