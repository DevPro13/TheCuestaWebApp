// // import logo from './logo.svg';
// import './App.css';
// import {UserLogin,CreateUser} from "./User";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>
//          THE CUESTA WEBAPP
//         </h1>
//       </header>
//       <div className="App-Body">
//         <UserLogin/>
//         <CreateUser/>
//       </div>
//     </div>
//   );
// }
// export default App;


import React from "react";
import {Link,Route,Switch} from "react-router-dom"
import {UserLogin,CreateUser} from "./User";
class Main extends React.Component{
  render(){
  return(
    <React.Fragment>
    <Header />
        <Switch>
            <Route exact path="/">
            <Home />
             </Route>
             <Route exact path="/login">
                <Contacts />
              </Route>
              <Route exact path="/login/admin">
                 <Events />
               </Route>
               <Route exact path="/admin">
                  <Admin />
                </Route>
                <Route exact path="/admin/createuser">
                  <Admin />
                </Route>
                <Route exact path="/admin/upload">
                  <Admin />
                </Route>
        </Switch>
      <Footer />
  </React.Fragment>
);
}
}
export default Main;

