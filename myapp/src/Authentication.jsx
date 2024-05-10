import React,{createContext,useState,useContext} from "react";
import { useNavigate} from "react-router-dom";
const AuthenticationContext=createContext();
function Authentication(props){
    //Make user authenticaton and session with the webapp
        const [user, setUser] = useState(localStorage.getItem("user") || "");;
        const [token, setToken] = useState(localStorage.getItem("site") || "");
        const [session_of, setSessionOf] = useState(localStorage.getItem("session_of") || "");
        const navigateTo=useNavigate();
        const api_endpoint="http://127.0.0.1:5000";
        const LoginAction=async (credentials,fetchpath,navpath)=>{
            try{
            const response=await fetch(`${api_endpoint}${fetchpath}`,{
                method:"POST",
                mode: "cors",
                cache: "no-cache",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(credentials),
            });
            const res=await response.json();
            if(response.status===200){
                if(res.data.token){
                setUser(res.data.user);
                setToken(res.data.token);
                setSessionOf(res.data.session_of);
                localStorage.setItem("site",res.data.token);
                localStorage.setItem("session_of",res.data.session_of);
                localStorage.setItem("user",res.data.user);
                localStorage.setItem("id",res.data.userID);
                navigateTo((navpath));
                }
                else{alert(res.message);}
                return;
                
            }
            else{alert(res.message);return;}
            throw new Error(res.message);
        }
        catch(err){
            console.error(err);
        }
    };
        const LogOut=(navpath)=>{
            //remove stored informaton like token, userid etc
            setUser("");
            setToken("");
            setSessionOf("");
            localStorage.removeItem("site")
            localStorage.removeItem("id")
            navigateTo({navpath});
        };
        return(
            <AuthenticationContext.Provider value={{user,token,session_of,LoginAction,LogOut}}>
                 {props.children}
             </AuthenticationContext.Provider>
        );
    }
export {
    Authentication,
}
export const useAuthentication = () => {
    return useContext(AuthenticationContext);
  };