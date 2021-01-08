import React from 'react'
import { Nav, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import '../style.css'
import {  Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';



class Header extends React.Component{
    constructor(){
        super()
    }

    handleSubmit = () => {
        this.props.handleSubmitLogOut()
        this.props.history.push('/prijava')
        window.location.reload(false);
        
    }

    componentDidUpdate(){
        console.log("header did update - "+this.props.sifraUloge)
    }

    render(){
    
        return(
           
                <header>   
                    {this.props.sifraUloge != undefined && 
                        <Button className="logout" onClick={this.handleSubmit} variant="secondary">Odjava</Button>
                    }

                 {this.props.sifraUloge === 10 &&    
                <Nav className="navigacija" fill variant="tabs" defaultActiveKey="link-1">
                    
                    <Nav.Item>
                        <Nav.Link as={Link}  to="/nalozi" eventKey="link-1" >Nalozi</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link  as={Link}  to="/mojiNalozi" eventKey="link-2">Moji Nalozi</Nav.Link>
                    </Nav.Item>     
                      
                </Nav> 
                }

                 {this.props.sifraUloge === 1 &&  
                  <Nav className="navigacija" fill variant="tabs" defaultActiveKey="link-1">
                    
                  <Nav.Item>
                      <Nav.Link  as={Link} to="/noviNalog" eventKey="link-0">Novi nalog</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link as={Link}  to="/nalozi" eventKey="link-1" >Nalozi</Nav.Link>
                  </Nav.Item>  
                    
                </Nav> 
                 }

                {this.props.sifraUloge === 5 &&   
                    <Nav className="navigacija-stranka" fill variant="tabs"  defaultActiveKey="link-2">
                        
                        <Nav.Item>
                            <Nav.Link  as={Link}  to="/mojiNalozi" eventKey="link-2">Moji Nalozi</Nav.Link>
                        </Nav.Item>     
                            
                    </Nav>  
                }
                </header>
                
           
        )
    }
}
export default withRouter(Header)