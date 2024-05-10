import React from "react";
import './Styles.css';
import {Header,Footer} from './HeaderFooter';
class CreateUser extends React.Component{
    //crate new customer account
    constructor(props){
        super(props);
        this.state={
            fullname:'',
            email:'',
            address:'',
            height:'',
            weight:'',
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    EmailValidity=()=>{
        const emailRegularExp =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegularExp.test(this.state.email);
    }
    handleChange(event){
        const {name,value}=event.target;
        this.setState({
            [name]:value
        });
    }
    handleSubmit(event){
        event.preventDefault();
        if(this.state.fullname.trim()===''){
            alert("Name field is cannot be empty");
            return;
        }
        if (this.state.email.trim()===''){
            alert("Email Field cannot be empty")
            return;
        }
        if (!this.EmailValidity()){
            alert("Invalid Email: "+this.state.email);
            return;
        }
        if(this.state.address.trim()===''){
            alert("Address field is cannot be empty");
            return;
        }
        if (this.state.height.trim()===''){
            alert("Height Field cannot be empty")
            return;
        }
        if (this.state.weight.trim()===''){
            alert("Weight Field cannot be empty")
            return;
        }
        if (parseFloat(this.state.height.trim())<0){
            alert("Height cannot be negative")
            return;
        }
        if (parseFloat(this.state.weight.trim())<0){
            alert("Weight cannot be nagative")
            return;
        }
        (async()=>{
            const api_endpoint="http://127.0.0.1:5000";
            const fetchpath="/admin/createuser";
            console.log(this.state);
            try{
                const response=await fetch(`${api_endpoint}${fetchpath}`,{
                    method:"POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify(this.state),
                });
                const res=await response.json();
                console.log(res);
                if(res){
                    if(response.status===200){
                        alert(res.message);
                        this.setState({
                            fullname:'',
                            email:'',
                            address:'',
                            height:'',
                            weight:'',
                        });
                    }
                    else{
                        alert(res.message);
                    }
                    return;
                }
                throw new Error(res.message);
            }
            catch(err){
                console.error(err);
                return;
            }
        })();
    }
  render(){
    return(
        <React.Fragment>
        <Header path="admin"/>
        <div className='content-body'>
        <div className="upload-create-form">
            <div className="form-label">Enter Customer Details to Create Customer Account</div>
        <form onSubmit={this.handleSubmit}>
            <label>Full Name:<input type="text" placeholder="Enter name" value={this.state.fullname} name="fullname" onChange={this.handleChange}/></label>
            <label>Email:<input type="text" placeholder="Enter Email" value={this.state.email} name="email" onChange={this.handleChange}/></label>
            <label>Address:<input type="text" placeholder="Enter address" value={this.state.address} name="address" onChange={this.handleChange}/></label>
            <label>Height:<input type="number" placeholder="Enter height in feet" value={this.state.height} name="height" onChange={this.handleChange}/></label>
            <label>Weight in KG:<input type="number" placeholder="Enter Weight" value={this.state.weight} name="weight" onChange={this.handleChange}/></label>
            <input type="submit" value="Create User" />
            <a href="/admin"><input type="button" value="Cancel/Home"/> </a>
        </form>
    </div>
    </div>
    <Footer/>
    </React.Fragment>
    );
  }
}
export{
    CreateUser,
  }