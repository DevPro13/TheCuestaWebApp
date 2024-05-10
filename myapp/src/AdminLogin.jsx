import React,{useState} from "react";
import {useAuthentication} from "./Authentication";
import './Styles.css';
import {Header,Footer} from './HeaderFooter';
function AdminLogin(){
    const [input,setInput]=useState({
        user:"",
        passwd:""
    });
    const handleChange=(event)=>{
        const {name,value}=event.target;
        setInput(input=>({
            ...input,
            [name]:value
        }));
    }
    const auth=useAuthentication();
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(input.user.trim()===''){
            alert("User field is cannot be empty");
            return;
        }
        if (input.passwd.trim()===''){
            alert("Password Field cannot be empty")
            return;
        }
        auth.LoginAction(input,"/admin/login","/admin");
    }
  return(<React.Fragment>
        <Header path="adminlogin"/>
        <div className='content-body'>
        <div className="user-login-form">
        <div className="top-login-form">Enter Admin Credentials to Login</div>
          <form onSubmit={handleSubmit}>
                <label>User:<input type="text" placeholder="Enter user id" name="user" value={input.user} onChange={handleChange}/></label>
                <label>Password:<input type="password" placeholder="Enter Password" name="passwd" value={input.passwd} onChange={handleChange}/></label>
                <input type="submit" value="Login" />
            </form>
        </div>
        </div>
        <Footer/>
        </React.Fragment>
  );
}
export{
    AdminLogin,
  }