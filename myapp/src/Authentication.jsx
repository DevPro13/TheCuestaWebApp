import React,{createContext,useState,useContext} from "react";
import { useNavigate} from "react-router-dom";
const AuthenticationContext=createContext();
function Authentication(props){
        const [user, setUser] = useState(null);
        const [token, setToken] = useState(localStorage.getItem("site") || "");
        const navigateTo=useNavigate();
        const api_endpoint="http://127.0.0.1:5000";
        const LoginAction=async (credentials,fetchpath,navpath)=>{
            console.log(credentials,fetchpath,navpath);
            try{
            const response=await fetch(`${api_endpoint}/${fetchpath}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(credentials),
            });
            const res=await response.json();
            if(res.data){
                setUser(res.data.user);
                setToken(res.token);
                localStorage.setItem("site",res.data.token);
                navigateTo((navpath));
                return;
            }
            throw new Error(res.message);
        }
        catch(err){
            console.error(err);
        }
    };
        const LogOut=(navpath)=>{
            setUser(null);
            setToken("");
            navigateTo({navpath});
        };
        return(
            <AuthenticationContext.Provider value={{user,token,LoginAction,LogOut}}>
                {props.children}
            </AuthenticationContext.Provider>
        );
    }
export {
    Authentication,
}
// export const useAuthentication=AuthenticationContext.Consumer;
export const useAuthentication = () => {
    return useContext(AuthenticationContext);
  };