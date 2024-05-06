import React from "react";
class Upload extends React.Component {
    constructor(props){
        super(props);
        this.state={
            title:'',
            name:'',
            email:'',
            address:''
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
            alert("Email field is cannot be empty");
            return;
        }
        if (this.state.name.trim()===''){
            alert("Name Field cannot be empty")
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
        <label>Video Title:<input type="text" value={this.state.title} name="title" onChange={this.handleChange}/></label>
            <label>Name of Customer:<input type="text" value={this.state.name} name="name" onChange={this.handleChange}/></label>
            <label>Email:<input type="text" value={this.state.email} name="email" onChange={this.handleChange}/></label>
            <label>Select File:<input type="file" name="filename"/></label>
            <input type="submit" value="Upload Video" />
        </form>
  );
  }
}
export{
    Upload,
}