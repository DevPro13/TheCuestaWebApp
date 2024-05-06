import React from "react";
class CreateUser extends React.Component{
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


        // try{
        //     //yeha Form Submit hunu paryo..
        //     //User bhayey load hunu paryo
        //     //user nabhayey user chhaina bhannu paryo
        // }
    }
  render(){return(
        <form onSubmit={this.handleSubmit}>
            <label>Full Name:<input type="text" value={this.state.fullname} name="fullname" onChange={this.handleChange}/></label>
            <label>Email:<input type="text" value={this.state.email} name="email" onChange={this.handleChange}/></label>
            <label>Address:<input type="text" value={this.state.address} name="address" onChange={this.handleChange}/></label>
            <label>Height:<input type="number" value={this.state.height} name="height" onChange={this.handleChange}/></label>
            <label>Weight in KG:<input type="number" value={this.state.weight} name="weight" onChange={this.handleChange}/></label>
            <input type="submit" value="Create User" />
        </form>
  );
  }
}
export{
    CreateUser,
  }