import React from "react";
class AdminLogin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:'',
            passwd:'',
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(event){
        const {name,value}=event.target;
        this.setState({
            [name]:value
        });
    }
    handleSubmit(event){
        event.preventDefault();
        if(this.state.email.trim()===''){
            alert("User field is cannot be empty");
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
            <label>User:<input type="text" name="user" value={this.state.user} onChange={this.handleChange}/></label>
            <label>Password:<input type="password" name="passwd" value={this.state.passwd} onChange={this.handleChange}/></label>
            <input type="submit" value="Login" />
        </form>
  );
  }
}

export{
    AdminLogin,
  }