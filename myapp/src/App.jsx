// import logo from './logo.svg';
import React from 'react';
// import {UserLogin,CreateUser} from "./User";
import {AdminHome} from "./AdminHome";
import { AdminLogin } from './AdminLogin';
import {CreateUser} from "./CreateUser";
import { UserLogin } from './UserLogin';
import { Upload } from './Upload';
import {HomePage} from "./Home";
import { BrowserRouter, Routes, Route} from "react-router-dom";
class App extends React.Component{
  render(){
    if(this.props.user)
    return (
      <BrowserRouter>
        <Routes>
        <Route element={<PrivateRoute />}/>
          <Route path="/" element={ <HomePage/>}/>
          <Route path="/login" element={<UserLogin />}/>
          <Route path="/admin/createuser" element={<CreateUser />}/>
          <Route path="/admin" element={<AdminHome />}/>
          <Route path="/login/admin" element={<AdminLogin />}/>
          <Route path="/admin/upload" element={<Upload />}/>
        </Routes>
      </BrowserRouter>
    );
//   return(
//     <React.Fragment>
//     <Header />
//         <Switch>
//             <Route exact path="/">
//             <UserHome/>
//              </Route>
//              <Route exact path="/login">
//                 <UserLogin />
//               </Route>
//               <Route exact path="/login/admin">
//                  <AdminLogin />
//                </Route>
//                <Route exact path="/admin">
//                   <AdminHome />
//                 </Route>
//                 <Route exact path="/admin/createuser">
//                   <CreateUser />
//                 </Route>
//                 <Route exact path="/admin/upload">
//                   <Upload />
//                 </Route>
//         </Switch>
//       <Footer />
//   </React.Fragment>
// );
}
}
export default App;
