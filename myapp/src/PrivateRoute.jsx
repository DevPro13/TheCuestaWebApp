import React from "react";
import { Navigate,Outlet,useLocation } from "react-router-dom";
import {useAuthentication} from "./Authentication";
function PrivateRoute(props){
        //handle private routes
        //guards route from accessing without authorized logged in
        const location=useLocation();
        const user=useAuthentication();
        const pattern = /^\/admin(?:\/[^\/]*)*$/;//regular expession to check routes start with /admin/<..>
        const exists = pattern.test(location.pathname);
        if(!user.token||(user.session_of==="admin" && !exists)){
            return(<Navigate to={props.path}/>);
        }
        if(user.session_of==="customer"&& exists){
            return(<Navigate to={props.path}/>);
        }
        //user is authorized
        //proceded to the path
        return(<Outlet/>);
    }
export{
    PrivateRoute,
}