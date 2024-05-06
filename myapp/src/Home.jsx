// import logo from './logo.svg';
import './App.css';
import React from 'react';
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
class HomePage extends React.Component{
    render(){return(
        <React.Fragment>
            <Header />
            <h1> Hey There!!!</h1>
    </React.Fragment>
    );
}
}
export{
    HomePage,
}
