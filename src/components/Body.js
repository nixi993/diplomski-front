import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../style.css'

import NoviNalog from './NoviNalog';
import TreciTab from './TreciTab';


import Nalozi from './Nalozi';
import MojiNalozi from './MojiNalozi';
import Prijava from './Prijava';
import {Switch,Route} from 'react-router-dom';


class Body extends React.Component{
    constructor(props){
        super()
    }

    state = {
        order: [{
            brojNaloga:"",
            marka:"",
            model:"",
            gorivo:"",
            godinaProizvodnje:"",
            kilometri:""
        }]
      }
    

    componentDidMount(){

    }

    render(){
      
        return(
         
            <div className="body">
                        {this.props.sifraUloge === 10 &&    
                            <Switch>
                                
                                <Route path="/prijava" render = {(props)=>(
                                    <Prijava {...props}  handleSubmitLogIn = {this.props.handleSubmitLogIn}/>
                                )} />  
                                                                                                    
                                    <Route path="/nalozi" render = {(props) =>(
                                       <Nalozi {...props}  id={this.props.id} /> 
                                    )}
                                    
                                     />   
                                    <Route path="/mojiNalozi" render ={(props) =>(
                                        <MojiNalozi {...props} sifraUloge={this.props.sifraUloge} id={this.props.id}  /> 
                                    )}/>

                                    <Route path="/noviNalog" component={NoviNalog}/>  
                                    <Route exact path="" component={NoviNalog}/>   
                            </Switch>
                        }

                        {this.props.sifraUloge === 1 &&    
                            <Switch>
                                
                                <Route path="/prijava" render = {(props)=>(
                                    <Prijava {...props}  handleSubmitLogIn = {this.props.handleSubmitLogIn}/>
                                )} />  
                                                                                                    
                                    <Route path="/nalozi" render = {(props) =>(
                                       <Nalozi {...props}  id={this.props.id} /> 
                                    )}
                                    
                                     />   
                                    <Route path="/mojiNalozi" render ={(props) =>(
                                        <MojiNalozi {...props} sifraUloge={this.props.sifraUloge} id={this.props.id}  /> 
                                    )}/>

                                    <Route path="/noviNalog" component={NoviNalog}/>  
                                    <Route exact path="" component={NoviNalog}/>   
                            </Switch>
                        }
                        {this.props.sifraUloge === 5 &&
                            <Switch>
                                <Route path="/prijava" render = {(props)=>(
                                    <Prijava {...props}  handleSubmitLogIn = {this.props.handleSubmitLogIn}/>
                                )} /> 
                                
                                <Route path="/mojiNalozi" render ={(props) =>(
                                    <MojiNalozi {...props} sifraUloge={this.props.sifraUloge} id={this.props.id}  /> 
                                )}/>
                            </Switch>       
                        }

                        {this.props.sifraUloge === undefined  &&
                             <Switch>
                                <Route path="/prijava" render = {(props)=>(
                                    <Prijava {...props}  handleSubmitLogIn = {this.props.handleSubmitLogIn}/>
                                )} /> 
                             </Switch>
                        }
             
                    
                
                <br />
                <br />
                
            </div>
        )
    }
}
export default Body