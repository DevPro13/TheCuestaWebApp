// import logo from './logo.svg';
import './Styles.css';
import React from 'react';
import {Header,Footer} from './HeaderFooter';
class FetchData extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            status: null
        };
    }
    handleDownload=(filename)=>{
        (async()=>{
            const fileName={
                file:filename,
            };
        try{
            const url=new URL("http://127.0.0.1:5000/download")
            url.search= new URLSearchParams(fileName).toString();
            const response=await fetch(url,{
                method:"GET",
                mode: "cors",
                cache: "no-cache",
                headers:{
                    "Content-Type":"application/json",
                }
            });
            const blob=await response.blob();
            if(response.status===200){
                const videoURL = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = videoURL;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(videoURL);
                return;
            }
            throw new Error(response);
        }
        catch(err){
            console.error(err);
        }
    })();
}
    componentDidMount() {
    (async()=>{
            const api_endpoint="http://127.0.0.1:5000";
            const fetchpath="/";
            const userID={
                userid:localStorage.getItem('id')
            };
            try{
                const url=new URL(`${api_endpoint}${fetchpath}`)
                url.search= new URLSearchParams(userID).toString();
                const response=await fetch(url,{
                    method:"GET",
                    mode: "cors",
                    cache: "no-cache",
                    headers:{
                        "Content-Type":"application/json",
                    }
                });
                const res=await response.json();
                console.log(res);
                if(response.status===200){
                      this.setState({
                    videos: res.videos,
                    status: response.status
                });
                return;
                }
                throw new Error(res.message);
            }
            catch(err){
                console.error(err);
            }
        }
    )();
    }
    render(){
        const {videos,status}=this.state;
        if(status===200){
            return(
                videos.map((video, index) => (
                <div key={index} className="video-box">
                <div className="title-section">
                    Title: {video.title}<br/>
                    Filename:{video.fileName}
                </div>
                <div className="video-section"/>
                <div className="video-download" onClick={()=>this.handleDownload(video.filename)}>
                    Download
                </div>
            </div>
        ))
        );
        }
        else{
            //No video Data
            return(<div className="no-video-box">
                The Provider has not uploaded any of your Bungee jumping video content!!Stay Tuned
            </div>);
        }
    }
}
class HomePage extends React.Component{
    render(){
        return(
        <React.Fragment>
            <Header page="userhome"/>
            <div className='content-body'>
                <div className='video-body'>
                    <FetchData />
                </div>
            </div>
            <Footer/>
    </React.Fragment>
    );
}
}
export{
    HomePage,
}
