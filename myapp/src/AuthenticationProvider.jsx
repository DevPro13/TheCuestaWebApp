import React,{createContext} from "react";
import { useNavigate,useContext } from "react-router-dom";
const AuthenticationContext=createContext();
class Authentication extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:null,
            token:localStorage.getItem("site")||""
        }
    }
    render(){
        const navigate=useNavigate();
        const api_endpoint="http://127.0.0.1:5000";
        const LoginAction=async (credentials,fetchpath,navpath)=>{
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
                this.setState({
                    user:res.data.user,
                    token:res.data.token
                });
                localStorage.setItem("site",res.data.token);
                navigate((navpath));
                return;
            }
            throw new Error(res.message);
        }
        catch(err){
            console.error(err);
        }
    };
        const LogOut=(navpath)=>{
            this.setState({
                user:"",
                token:""
            });
            navigate({navpath});
        };
        const{user,token}=this.state;
        return(
            <AuthenticationContext.Provider value={{user,token,LoginAction,LogOut}}>
                {this.props.children}
            </AuthenticationContext.Provider>
        );
    }
}
export default Authentication;
export const useAuthentica=AuthenticationContext.Consumer;