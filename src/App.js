import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import React from 'react'



class App extends React.Component {

  constructor(){
    super()
    this.state = {
      username:"",
      password:"",
      sifraUloge:"",
      id:""
    }
  }

  componentDidMount(){

    const data = window.localStorage.getItem("Drama")
    if(data != null){

      const {username, password,sifraUloge,id} =JSON.parse(data)

      console.log(data);
      
      this.setState({
        username:username,
        password:password,
        sifraUloge:sifraUloge,
        id: id
      })
    }


  }




  handleSubmitLogIn = (data) => {
 
    this.setState({
      username:data.username,
      password:data.password,
      sifraUloge:data.sifraUloge,
      id:data.id
    })


    window.localStorage.setItem("Drama",JSON.stringify(this.state))
    
  }

  handleSubmitLogOut = (e) => {
    console.log("drama")
    window.localStorage.setItem("Drama",JSON.stringify({}))
  }

  render(){
    
    return (

      <div>
        <Header user={this.state.username}
          password={this.state.password}
          sifraUloge={this.state.sifraUloge}
          handleSubmitLogOut= {this.handleSubmitLogOut}/>
        <Body 
          sifraUloge = {this.state.sifraUloge}
          id = {this.state.id}
          handleSubmitLogIn={this.handleSubmitLogIn} />
        <Footer />
      </div>
    );
  }
}

export default App;
