import React from "react";
import { Navigate,Outlet } from "react-router-dom";
import {useAuthentication} from "./Authentication";
function PrivateRoute(props){
        const user=useAuthentication();
        return(!user.token?<Navigate to={props.path}/>:<Outlet/>);
    }
export{
    PrivateRoute,
}