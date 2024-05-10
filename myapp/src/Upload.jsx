import React from "react";
import './Styles.css';
import {Header,Footer} from './HeaderFooter';
class Upload extends React.Component {
    constructor(props){
        super(props);
        this.state={
            title:'',
            name:'',
            email:'',
            filename:undefined
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChangeVideoFile=this.handleChangeVideoFile.bind(this);
    }
    handleChange(event){
        const {name,value}=event.target;
        this.setState({
            [name]:value
        });
    }
    handleChangeVideoFile(e){
        console.log(e.target);
        this.setState({
            filename:e.target.files[0]
        })
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
        (async()=>{
            const api_endpoint="http://127.0.0.1:5000";
            const fetchpath="/admin/upload";
            console.log(this.state);
            const videoData = new FormData();
            videoData.append('videofile', this.state.filename);
            videoData.append('title', this.state.title);
            videoData.append('name', this.state.name);
            videoData.append('email', this.state.email);
            try{
                const response=await fetch(`${api_endpoint}${fetchpath}`,{
                    method:"POST",
                    mode: "cors",
                    cache: "no-cache",
                    body:videoData,
                });
                const res=await response.json();
                console.log(res);
                if(res){
                    if(response.status===200){
                        alert(res.message);
                        this.setState({
                            title: '',
                            name: '',
                            email: '',
                            filename:undefined
                        });
                    }
                    else{
                        if(response.status===401){
                            this.setState({
                                filename:undefined
                            });
                        }
                        alert(res.message);
                    }
                    return;
                }
                throw new Error(res.message);
            }
            catch(err){
                console.log("Opps");
                console.error(err);
                return;
            }
        })();
    }
  render(){return(
    <React.Fragment>
        <Header path="admin"/>
        <div className='content-body'>
        <div className="upload-create-form">
            <div className="form-label">Upload Video file</div>
          <form onSubmit={this.handleSubmit}>
            <label>Video Title:<input type="text" placeholder="Enter video title" value={this.state.title} name="title" onChange={this.handleChange}/></label>
            <label>Name of Customer:<input type="text" placeholder="Customer name" value={this.state.name} name="name" onChange={this.handleChange}/></label>
            <label>Email:<input type="text" value={this.state.email} placeholder="Valid Customer Email"  name="email" onChange={this.handleChange}/></label>
            <label>Select File:<input type="file" name="filename" onChange={this.handleChangeVideoFile}/></label>
            <input type="submit" value="Upload Video" />
            <a href="/admin"><input type="button" value="Cancel Upload/Home"/> </a>
        </form>
        </div>
        </div>
        <Footer/>
    </React.Fragment>  
  );
  }
}
export{
    Upload,
}