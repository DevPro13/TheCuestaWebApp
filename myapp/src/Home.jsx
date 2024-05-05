// import logo from './logo.svg';
import './App.css';
class Header extends React.Component{
    render(){
   return(
    <header className="App-header">
    <h1>
     THE CUESTA WEBAPP
    </h1>
  </header>
  );
}
}
class UserLogin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            isLoggedIn:false
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }
    handleChange(event){
        this.setState({
            email:event.target.value,
            password:event.target.value
        });
    }
    handleSubmit(event){
        event.preventDefault();
        if(this.state.email===''){
            alert("Email field is cannot be empty");
            return;
        }
        if (this.state.password==''){
            alert("Password Field cannot be empty")
            return;
        }
        try{
            //yeha Form Submit hunu paryo..
            //User bhayey load hunu paryo
            //user nabhayey user chhaina bhannu paryo
        }

    }
  render(){return (
      <AppBody className="form-body">
        <form onSubmit={this.handleSubmit}>
            <label>UserID:<input type="text" value={this.state.username} onChange={this.handleChange}/></label>
            <label>Password:<input type="password" value={this.state.password} onChange={this.handleChange}/></label>
            <input type="submit" value="Login" />
        </form>
      </AppBody>
  );
  }
}
class HomePage extends React.Component{
    render(){return(
        <div className="my-home">
            <Header />
      <Login/>
    </div>
    );
}
}
export default Home;
