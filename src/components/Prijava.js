import React from 'react'
import { renderIntoDocument } from 'react-dom/test-utils'
import '../style.css'

import { Form,Button } from 'react-bootstrap'

class Prijava extends React.Component {
    constructor(){
        super()
        this.state = {
            username:'',
            password:''
        }
    }

    handleChange = (e) => {
        e.preventDefault()
        const {name,value} = e.target
        this.setState({ [name]: value})
        
    }

    handleSubmit = (e) => { 
           
        e.preventDefault()

        fetch('http://localhost:8080/dohvatiRacun?username=' + 
        e.target.username.value + '&password=' + e.target.password.value)
        .then(response => response.json())
        .then(data =>{
            if(data.sifraUloge != 0 ){
                this.props.handleSubmitLogIn(data)

                if(data.sifraUloge===5) {
                    this.props.history.push('/mojiNalozi')
                }else{
                    this.props.history.push('/nalozi')
                }
            }else{
                alert("Ne postojeci korisnik!!!")
            }
        })
    }




    render() {
        return(

                <div className="centered">
                    <div className="gornjaDistanca"></div>
                    <Form className="login" onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" value = {this.state.username} onChange={this.handleChange} placeholder="Username" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" value = {this.state.password} onChange={this.handleChange} type="password" placeholder="Password" />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Prijava
                    </Button>
                    </Form>
                    <div className="donjaDistanca"></div>
                </div>
           
        )
    }
}
export default Prijava