import React from "react";
import './Styles.css';
import {Header,Footer} from './HeaderFooter';
class AdminHome extends React.Component{
    render(){
        return(
            <React.Fragment>
        <Header path="admin"/>
        <div className='content-body'>
        <div id="App-Body">
                <a href="/admin/createuser" className="admin-home-link-btn">Create User</a>
                <a href="/admin/upload" className="admin-home-link-btn">Upload Video</a>
            </div>
        </div>
        <Footer/>
        </React.Fragment>
        );
    }
}
export{
    AdminHome,
}