import React from 'react';
import {AdminHome} from "./AdminHome";
import { AdminLogin } from './AdminLogin';
import {CreateUser} from "./CreateUser";
import { UserLogin } from './UserLogin';
import { Upload } from './Upload';
import {HomePage} from "./Home";
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import {PrivateRoute} from "./PrivateRoute";
import {Authentication,useAuthentication} from "./Authentication";
import {NoPage} from "./NoPage";
function App(){
    return (
      <BrowserRouter>
      <Authentication>
        <Routes>
          <Route path="/login" element={<Login url="/login"/>}/>
          <Route element={<PrivateRoute path="/login"/>}>
          <Route path="/" element={ <HomePage/>}/>
          </Route>
          <Route path="/admin/login" element={<Login url="/admin/login"/>}/>
          <Route element={<PrivateRoute path="/admin/login"/>}>
          <Route path="/admin/createuser" element={<CreateUser />}/>
          <Route path="/admin" element={<AdminHome />}/>
          <Route path="/admin/upload" element={<Upload />}/>
          </Route>
          <Route path="*" element={<NoPage />}/>
        </Routes>
      </Authentication>
      </BrowserRouter>
    );
}
function Login(props){
  const user=useAuthentication();
  const path=props.url;
  if(path==="/login"){
    if(!user.token||user.session_of==="admin"){
      return(<UserLogin/>);
    }
    return(<Navigate to={"/"}/>);
  }
  if(path==="/admin/login"){
    if(!user.token||user.session_of==="customer"){
      return(<AdminLogin />);
    }
    return(<Navigate to={"/admin"}/>);
  }
}
export default App;
