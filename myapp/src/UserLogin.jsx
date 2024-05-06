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
        console.log(event.target);
        const {name,value}=event.target;
        console.log({name,value});
        this.setState({
            [name]:value
        });
    }
    handleSubmit(event){
        event.preventDefault();
        if(this.state.email.trim()===''){
            alert("Email field is cannot be empty");
            return;
        }
        if (this.state.password.trim()===''){
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
        <form onSubmit={this.handleSubmit}>
            <label>UserID:<input type="text" name="userame" value={this.state.username} onChange={this.handleChange}/></label>
            <label>Password:<input type="password" name="password" value={this.state.password} onChange={this.handleChange}/></label>
            <input type="submit" value="Login" />
        </form>
  );
  }
}

export{
    UserLogin,
  }