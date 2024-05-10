import React from "react";
import './Styles.css';
import {useAuthentication} from "./Authentication"
function Header(props){
    const user=useAuthentication();
    const handleLogout=()=>{
        if(user.session_of==="customer"){
            user.LogOut("/login");
        }
        else{
             user.LogOut("/admin/login");
        }
    }
    const header_elemment=()=>{
        if(props.path==="adminlogin"||props.path==="userlogin"){
            return(<React.Fragment>
              {props.path==="adminlogin"?<a href="/login">Login As User</a>:<a href="/admin/login">Login As Admin</a>}
            </React.Fragment>);  
        }
        else{
            return(<React.Fragment>
                <label>Hello {user.session_of==="admin"?"Admin@"+user.user:user.user}</label>
                <button className='logout-btn' onClick={handleLogout}>LogOut</button>
            </React.Fragment>); 
        }
}
   return(
    <div className="App-header">
    <h1>
     THE CUESTA WEBAPP
    </h1>
    <div className='header-tray'>
        {header_elemment()}
  </div>
  </div>
  );
}
class Footer extends React.Component{
    render(){
   return(
    <div className="App-footer">
        dev@2024
  </div>
  );
}
}
export{
    Header,
    Footer,
}