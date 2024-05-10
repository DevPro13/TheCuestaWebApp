import React,{useState} from "react";
import './Styles.css';
import {Header,Footer} from './HeaderFooter';
import {useAuthentication} from "./Authentication";
function UserLogin(){
    const [input,setInput]=useState({
        fname:"",
        email:""
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
        if(input.fname.trim()===''){
            alert("First Name field is cannot be empty");
            return;
        }
        if (input.email.trim()===''){
            alert("Email Field cannot be empty")
            return;
        }
        auth.LoginAction(input,"/login","/");
    }
    return(
        <React.Fragment>
        <Header path="userlogin"/>
        <div className='content-body'>
        <div className="user-login-form">
            <div className="top-login-form">Enter Your Credentials to Login</div>
          <form onSubmit={handleSubmit}>
            <label>Name:<input type="text" placeholder="example:Dev" name="fname" value={input.fname} onChange={handleChange}/></label>
            <label>EmailID:<input type="text" placeholder="example@gmail.com" name="email" value={input.email} onChange={handleChange}/></label>
            <input type="submit" value="Login" />
        </form>
        </div>
        </div>
        <Footer/>
        </React.Fragment>
  );
}
export{
    UserLogin,
  }