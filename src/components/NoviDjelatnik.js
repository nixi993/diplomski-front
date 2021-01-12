import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button, Row, Col } from 'react-bootstrap'
import '../style.css'



const formValid = ({ formErrors, ...rest }) => {

    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    })

    console.log(formErrors)
    Object.values(rest).forEach(val => {

        val === "" && (valid = false);
    })

    return valid;
};

class NoviDjelatnik extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ime: "",
            prezime: "",
            email: "",
            telefon: "",
            username: "",
            password: "",
            vrstaDjelatnika: "",
            formErrors: {
                ime: "",
                prezime: "",
                email: "",
                telefon: "",
                username: "",
                password: "",
                vrstaDjelatnika: ""
            }

        }
    }

    handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        this.setState({ [name]: value })

        let formErrors = this.state.formErrors
        switch (name) {

            case 'ime':
                formErrors.ime = value.length < 3 ? 'Polje mora sadržavati barem 3 znaka' : ''
                break;

            case 'prezime':
                formErrors.prezime = value.length < 3 ? 'Polje mora sadržavati barem 3 znaka' : ''
                break;

            case 'username':
                formErrors.username = value.length < 3 ? 'Polje mora sadržavati barem 3 znaka' : ''
                break;

            case 'password':
                formErrors.password = value.length < 3 ? 'Polje mora sadržavati barem 3 znaka' : ''
                break;

            case 'adresa':
                formErrors.adresa = value.length < 3 ? 'Polje mora sadržavati barem 3 znaka' : ''
                break;

            case 'telefon':
                formErrors.telefon = /^\d+$/.test(value) ? '' : 'Polje mora sadržavati barem 3 znaka'
                break;

            case 'vrstaDjelatnika':
                formErrors.vrstaDjelatnika = value.length === 0 ? 'Izaberite vrstu djelatnika' : ''
                break;

            default:
                break;
        }

        this.setState({ formErrors, [name]: value })

        console.log(this.state.ime)
        console.log(this.state.prezime)
        console.log(this.state.username)
        console.log(this.state)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
        if (formValid(this.state)) {
            fetch('http://localhost:8080/noviDjelatnik', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                })

            this.props.history.push('/nalozi')
        } else {
            alert("Invalid Form!")
        }
    }

    render() {
        return (
            <div className="body">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridIme">
                            <Form.Label>Ime</Form.Label>
                            <Form.Control name="ime" className={this.state.formErrors.ime.length > 0 ? "error" : null}
                                value={this.state.ime} onChange={this.handleChange} placeholder="Ime" />
                            {this.state.formErrors.ime.length > 0 && <span className="errorMessage">{this.state.formErrors.ime}</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPrezime">
                            <Form.Label>Prezime</Form.Label>
                            <Form.Control name="prezime" className={this.state.formErrors.prezime.length > 0 ? "error" : null} value={this.state.prezime} onChange={this.handleChange} placeholder="Prezime" />
                            {this.state.formErrors.prezime.length > 0 && <span className="errorMessage">{this.state.formErrors.prezime}</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" value={this.state.email} onChange={this.handleChange} type="email" placeholder="Enter email" />
                        </Form.Group>

                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridTelefon">
                            <Form.Label>Telefon</Form.Label>
                            <Form.Control name="telefon" className={this.state.formErrors.telefon.length > 0 ? "error" : null}
                                value={this.state.telefon}
                                onChange={this.handleChange}
                                placeholder="Telefon" />
                            {this.state.formErrors.telefon.length > 0 && <span className="errorMessage">{this.state.formErrors.telefon}</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="username" className={this.state.formErrors.username.length > 0 ? "error" : null}
                                value={this.state.username}
                                onChange={this.handleChange}
                                placeholder="Username" />
                            {this.state.formErrors.username.length > 0 && <span className="errorMessage">{this.state.formErrors.username}</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" className={this.state.formErrors.password.length > 0 ? "error" : null}
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder="Password" />
                            {this.state.formErrors.password.length > 0 && <span className="errorMessage">{this.state.formErrors.password}</span>}
                        </Form.Group>

                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridVrstaDjelatnika">
                            <Form.Label>Vrsta djelatnika</Form.Label>
                            <Form.Control as="select"
                                onChange={this.handleChange}
                                name="vrstaDjelatnika">
                                <option value="">--Izaberite--</option>
                                <option value="automehanicar">Automehaničar</option>
                                <option value="prijem vozila">Prijem Vozila</option>
                            </Form.Control>
                            {this.state.formErrors.vrstaDjelatnika.length > 0 && <span className="errorMessage">{this.state.formErrors.vrstaDjelatnika}</span>}
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">
                        Dodaj djelatnika
                    </Button>
                </Form>
            </div>
        )
    }
}
export default NoviDjelatnik