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


class NoviNalog extends React.Component {

    constructor() {
        super();
        this.state = {
            ime: "",
            prezime: "",
            oib: "",
            email: "",
            adresa: "",
            telefon: "",
            marka: "",
            model: "",
            tip: "",
            vin: "",
            registracija: "",
            mjenjac: "",
            gorivo: "",
            kilometri: "",
            snaga: "",
            godinaProizvodnje: "",
            opisKvara: "",

            formErrors: {
                ime: "",
                prezime: "",
                oib: "",
                adresa: "",
                telefon: "",
                marka: "",
                model: "",
                tip: "",
                vin: "",
                registracija: "",
                mjenjac: "",
                gorivo: "",
                kilometri: "",
                snaga: "",
                godinaProizvodnje: "",
                opisKvara: ""
            },
            disabled: true
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        if (formValid(this.state)) {
            fetch('http://localhost:8080/NoviNalog', {
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

    handleChange(event) {
        event.preventDefault()
        let name = event.target.name
        let value = event.target.value
        this.setState({
            [name]: value
        })

        if (name === 'oib' && value.length === 11) {
            fetch('http://localhost:8080/dohvatiStranku?oib=' + value)
                .then(response => response.json())
                .then(data => {
                    if (data.id != 0) {
                        this.setState({
                            ime: data.ime,
                            prezime: data.prezime,
                            oib: data.oib,
                            email: data.email,
                            telefon: data.telefon,
                            adresa: data.adresa

                        })
                    }
                })
        }

        if (name === 'vin' && value.length === 17) {
            fetch('http://localhost:8080/dohvatiAuto?vin=' + value)
                .then(response => response.json())
                .then(data => {

                    if (data.id != 0) {
                        this.setState({
                            marka: data.marka,
                            model: data.model,
                            tip: data.tip,
                            vin: data.vin,
                            registracija: data.registracija,
                            mjenjac: data.mjenjac,
                            gorivo: data.gorivo,
                            kilometri: data.kilometri,
                            snaga: data.snaga,
                            godinaProizvodnje: data.godinaProizvodnje

                        })
                    }
                })
        }




        let formErrors = this.state.formErrors
        switch (name) {

            case 'ime':
                formErrors.ime = value.length < 3 ? 'Polje mora sadržavati barem 3 znaka' : ''
                break;

            case 'prezime':
                formErrors.prezime = value.length < 3 ? 'Polje mora sadržavati barem 3 znaka' : ''
                break;

            case 'oib':
                formErrors.oib = value.length != 11 ? 'Polje mora sadržavati tocno 11 znakova' : ''
                break;

            case 'adresa':
                formErrors.adresa = value.length < 3 ? 'Polje mora sadržavati barem 3 znaka' : ''
                break;

            case 'telefon':
                formErrors.telefon = /^\d+$/.test(value) ? '' : 'Polje mora sadržavati barem 3 znaka'
                break;

            case 'marka':
                formErrors.marka = value.length < 3 ? 'Polje mora sadržavati barem 3 znaka' : ''
                break;

            case 'model':
                formErrors.model = value.length < 2 ? 'Polje mora sadržavati barem 2 znaka' : ''
                break;

            case 'tip':
                formErrors.tip = value.length < 3 ? 'Polje mora sadržavati barem 3 znaka' : ''
                break;

            case 'vin':
                formErrors.vin = value.length != 17 ? 'Polje mora sadržavati tocno 17 znakova' : ''
                break;

            case 'registracija':
                formErrors.registracija = value.length < 4 ? 'Polje mora sadržavati barem 4 znaka' : ''
                break;

            case 'mjenjac':
                formErrors.mjenjac = value.length < 5 ? 'Polje mora sadržavati barem 5 znaka' : ''
                break;

            case 'gorivo':
                formErrors.gorivo = value.length < 4 ? 'Polje mora sadržavati barem 4 znaka' : ''
                break;

            case 'kilometri':
                formErrors.kilometri = /^\d+$/.test(value) ? '' : 'Polje mora sadržavati samo brojeve'
                break;

            case 'snaga':
                formErrors.snaga = /^\d+$/.test(value) ? '' : 'Polje mora sadržavati samo brojeve'
                break;

            case 'godinaProizvodnje':
                formErrors.godinaProizvodnje = /^\d+$/.test(value) ? value.length == 4 ? '' : 'Polje mora sadržavati tocno 4 broja' : 'Polje mora sadržavati samo brojeve'
                break;

            case 'opisKvara':
                formErrors.opisKvara = value.length < 4 ? 'Polje mora sadržavati barem 4 znaka' : ''
                break;

            default:
                break;
        }

        this.setState({ formErrors, [name]: value })

    }




    render() {
        return (
            <div className="body">
                <Form onSubmit={this.handleSubmit}>

                    <h3>Stranka: </h3>
                    <Form.Row>

                        <Form.Group as={Col} controlId="formGridOib">
                            <Form.Label>Oib</Form.Label>
                            <Form.Control name="oib" className={this.state.formErrors.oib.length > 0 ? "error" : null}
                                value={this.state.oib} onChange={this.handleChange} placeholder="Oib" />
                            {this.state.formErrors.oib.length > 0 && <span className="errorMessage">{this.state.formErrors.oib}</span>}
                        </Form.Group>

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

                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" value={this.state.email} onChange={this.handleChange} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAdresa">
                            <Form.Label>Adresa</Form.Label>
                            <Form.Control name="adresa" className={this.state.formErrors.adresa.length > 0 ? "error" : null} value={this.state.adresa} onChange={this.handleChange} placeholder="Adresa" />
                            {this.state.formErrors.adresa.length > 0 && <span className="errorMessage">{this.state.formErrors.adresa}</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridTelefon">
                            <Form.Label>Telefon</Form.Label>
                            <Form.Control name="telefon" className={this.state.formErrors.telefon.length > 0 ? "error" : null} value={this.state.telefon} onChange={this.handleChange} placeholder="Telefon" />
                            {this.state.formErrors.telefon.length > 0 && <span className="errorMessage">{this.state.formErrors.telefon}</span>}
                        </Form.Group>
                    </Form.Row>
                    <hr />
                    <h3>Podaci o vozilu</h3>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridVin">
                            <Form.Label>VIN oznaka</Form.Label>
                            <Form.Control name="vin" className={this.state.formErrors.vin.length > 0 ? "error" : null} value={this.state.vin} onChange={this.handleChange} placeholder="vin" />
                            {this.state.formErrors.vin.length > 0 && <span className="errorMessage">{this.state.formErrors.vin}</span>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridMarka">
                            <Form.Label>Marka</Form.Label>
                            <Form.Control name="marka" className={this.state.formErrors.marka.length > 0 ? "error" : null} value={this.state.marka} onChange={this.handleChange} placeholder="marka" />
                            {this.state.formErrors.marka.length > 0 && <span className="errorMessage">{this.state.formErrors.marka}</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Control name="model" className={this.state.formErrors.model.length > 0 ? "error" : null} value={this.state.model} onChange={this.handleChange} placeholder="model" />
                            {this.state.formErrors.model.length > 0 && <span className="errorMessage">{this.state.formErrors.model}</span>}
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridTip">
                            <Form.Label>Tip</Form.Label>
                            <Form.Control name="tip" className={this.state.formErrors.tip.length > 0 ? "error" : null} value={this.state.tip} onChange={this.handleChange} placeholder="tip" />
                            {this.state.formErrors.tip.length > 0 && <span className="errorMessage">{this.state.formErrors.tip}</span>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridGodinaProizvodnje">
                            <Form.Label>Godina Proizvodnje</Form.Label>
                            <Form.Control name="godinaProizvodnje" className={this.state.formErrors.godinaProizvodnje.length > 0 ? "error" : null} value={this.state.godinaProizvodnje} onChange={this.handleChange} placeholder="Godina Proizvodnje" />
                            {this.state.formErrors.godinaProizvodnje.length > 0 && <span className="errorMessage">{this.state.formErrors.godinaProizvodnje}</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridKilometri">
                            <Form.Label>Kilometri</Form.Label>
                            <Form.Control name="kilometri" className={this.state.formErrors.kilometri.length > 0 ? "error" : null} value={this.state.kilometri} onChange={this.handleChange} placeholder="kilometri" />
                            {this.state.formErrors.kilometri.length > 0 && <span className="errorMessage">{this.state.formErrors.kilometri}</span>}
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridSnaga">
                            <Form.Label>Snaga u kw</Form.Label>
                            <Form.Control name="snaga" className={this.state.formErrors.snaga.length > 0 ? "error" : null} value={this.state.snaga} onChange={this.handleChange} placeholder="snaga" />
                            {this.state.formErrors.snaga.length > 0 && <span className="errorMessage">{this.state.formErrors.snaga}</span>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridGorivo">
                            <Form.Label>Gorivo</Form.Label>
                            <Form.Control name="gorivo" className={this.state.formErrors.gorivo.length > 0 ? "error" : null} value={this.state.gorivo} onChange={this.handleChange} placeholder="gorivo" />
                            {this.state.formErrors.gorivo.length > 0 && <span className="errorMessage">{this.state.formErrors.gorivo}</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridMjenjac">
                            <Form.Label>Mjenjac</Form.Label>
                            <Form.Control name="mjenjac" className={this.state.formErrors.mjenjac.length > 0 ? "error" : null} value={this.state.mjenjac} onChange={this.handleChange} placeholder="mjenjac" />
                            {this.state.formErrors.mjenjac.length > 0 && <span className="errorMessage">{this.state.formErrors.mjenjac}</span>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridRegistracija">
                            <Form.Label>Registracija</Form.Label>
                            <Form.Control name="registracija" className={this.state.formErrors.registracija.length > 0 ? "error" : null} value={this.state.registracija} onChange={this.handleChange} placeholder="registracija" />
                            {this.state.formErrors.registracija.length > 0 && <span className="errorMessage">{this.state.formErrors.registracija}</span>}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridOpisKvara">
                            <Form.Label>Opis kvara</Form.Label>
                            <Form.Control as="textarea" col={3} name="opisKvara" className={this.state.formErrors.opisKvara.length > 0 ? "error" : null} value={this.state.opisKvara} onChange={this.handleChange} placeholder="opisKvara" />
                            {this.state.formErrors.opisKvara.length > 0 && <span className="errorMessage">{this.state.formErrors.opisKvara}</span>}
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit">
                        Kreiraj Nalog
                </Button>
                </Form>
            </div>

        )
    }
}
export default NoviNalog