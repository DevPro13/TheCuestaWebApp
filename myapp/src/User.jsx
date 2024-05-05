import React from "react";
class UserLogin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            isLoggedIn:false
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({
            email:event.target.value,
            password:event.target.value
        });
    }
    handleSubmit(event){
        event.preventDefault();
        if(this.state.email===''){
            alert("Email field is cannot be empty");
            return;
        }
        if (this.state.password==''){
            alert("Password Field cannot be empty")
            return;
        }
        // try{
        //     //yeha Form Submit hunu paryo..
        //     //User bhayey load hunu paryo
        //     //user nabhayey user chhaina bhannu paryo
        // }

    }
  render(){return(
      <AppBody className="form-body">
        <form onSubmit={this.handleSubmit}>
            <label>UserID:<input type="text" value={this.state.username} onChange={this.handleChange}/></label>
            <label>Password:<input type="password" value={this.state.password} onChange={this.handleChange}/></label>
            <input type="submit" value="Login" />
        </form>
      </AppBody>
  );
  }
}
class CreateUser extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
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
        this.setState({
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            height:this.state.height,
            weight:this.state.weight,
        }
            );
    }
    handleSubmit(event){
        event.preventDefault();
        if(this.state.name.trim()===''){
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


        try{
            //yeha Form Submit hunu paryo..
            //User bhayey load hunu paryo
            //user nabhayey user chhaina bhannu paryo
        }

    }
  render(){return(
      <AppBody className="form-body">
        <form onSubmit={this.handleSubmit}>
            <label>Full Name:<input type="text" value={this.state.username} onChange={this.handleChange}/></label>
            <label>Email:<input type="text" value={this.state.email} onChange={this.handleChange}/></label>
            <label>Address:<input type="text" value={this.state.address} onChange={this.handleChange}/></label>
            <label>Height:<input type="text" value={this.state.height} onChange={this.handleChange}/></label>
            <label>Weight in KG:<input type="text" value={this.state.height} onChange={this.handleChange}/></label>
            <input type="submit" value="Create User" />
        </form>
      </AppBody>
  );
  }
}