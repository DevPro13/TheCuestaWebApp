import React,{useState} from "react";
import {useAuthentication} from "./Authentication";
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
        auth.LoginAction(input,"/login/admin","/admin");
    }
  return(
        <form onSubmit={handleSubmit}>
            <label>User:<input type="text" name="user" value={input.user} onChange={handleChange}/></label>
            <label>Password:<input type="password" name="passwd" value={input.passwd} onChange={handleChange}/></label>
            <input type="submit" value="Login" />
        </form>
  );
}
export{
    AdminLogin,
  }