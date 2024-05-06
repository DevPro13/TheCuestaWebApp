import React from "react";
class AdminHome extends React.Component{
    render(){
        return(
            <div id="App-Body">
                <a href="/admin/createuser">Create User</a>
                <a href="/admin/upload">Upload Video</a>
            </div>
        )
    }
}
export{
    AdminHome,
}