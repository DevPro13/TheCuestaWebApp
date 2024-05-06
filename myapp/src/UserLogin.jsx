import React,{useState} from "react";
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
        <form onSubmit={handleSubmit}>
            <label>First Name:<input type="text" name="fname" value={input.fname} onChange={handleChange}/></label>
            <label>EmailID:<input type="text" name="email" value={input.email} onChange={handleChange}/></label>
            <input type="submit" value="Login" />
        </form>
  );
}
export{
    UserLogin,
  }