import React from 'react';
import {AdminHome} from "./AdminHome";
import { AdminLogin } from './AdminLogin';
import {CreateUser} from "./CreateUser";
import { UserLogin } from './UserLogin';
import { Upload } from './Upload';
import {HomePage} from "./Home";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import {PrivateRoute} from "./PrivateRoute";
import {Authentication} from "./Authentication";
import {NoPage} from "./NoPage";
function App(){
    return (
      <BrowserRouter>
      <Authentication>
        <Routes>
          <Route path="/login" element={<UserLogin />}/>
          <Route element={<PrivateRoute path="/login"/>}>
          <Route path="/" element={ <HomePage/>}/>
          </Route>
          </Routes>
          <Routes>
          <Route path="/login/admin" element={<AdminLogin />}/>
          <Route element={<PrivateRoute path="/login/admin"/>}>
          <Route path="/admin/createuser" element={<CreateUser />}/>
          <Route path="/admin" element={<AdminHome />}/>
          <Route path="/admin/upload" element={<Upload />}/>
          </Route>
        </Routes>
        <Routes>
        {/* <Route path="*" element={<NoPage />}/> */}
        </Routes>
      </Authentication>
      </BrowserRouter>
    );
}
export default App;
