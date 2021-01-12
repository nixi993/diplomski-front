import React from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'

class DetaljiNalogaModal extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/izmjeniNalog', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                brojNaloga: event.target.brojNaloga.value,
                komentarDjelatnika: event.target.komentarDjelatnika.value,
                status: event.target.status.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            })
        this.props.onHide()
    }

    render() {
        return (

            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <h3>Podaci o nalogu:</h3>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridBrojNaloga">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    name="brojNaloga"
                                    disabled
                                    defaultValue={this.props.brojNaloga}
                                    placeholder="Broj Naloga" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMarka">
                                <Form.Label>Marka</Form.Label>
                                <Form.Control
                                    name="marka"
                                    disabled
                                    defaultValue={this.props.marka}
                                    placeholder="Marka" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridModel">
                                <Form.Label>Model</Form.Label>
                                <Form.Control
                                    name="model"
                                    disabled
                                    defaultValue={this.props.model}
                                    placeholder="Model" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridTip">
                                <Form.Label>Tip</Form.Label>
                                <Form.Control
                                    name="tip"
                                    disabled
                                    defaultValue={this.props.tip}
                                    placeholder="Tip" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridGorivo">
                                <Form.Label>Gorivo</Form.Label>
                                <Form.Control
                                    name="gorivo"
                                    disabled
                                    defaultValue={this.props.gorivo}
                                    placeholder="Gorivo" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridKilometri">
                                <Form.Label>Kilometri</Form.Label>
                                <Form.Control
                                    name="kilometri"
                                    disabled
                                    defaultValue={this.props.kilometri}
                                    placeholder="Kilometri" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridSnaga">
                                <Form.Label>Snaga</Form.Label>
                                <Form.Control
                                    name="snaga"
                                    disabled
                                    defaultValue={this.props.snaga}
                                    placeholder="Snaga" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMjenjac">
                                <Form.Label>Mjenjac</Form.Label>
                                <Form.Control
                                    name="mjenjac"
                                    disabled
                                    defaultValue={this.props.mjenjac}
                                    placeholder="Mjenjac" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridVin">
                                <Form.Label>vin</Form.Label>
                                <Form.Control
                                    name="vin"
                                    disabled
                                    defaultValue={this.props.vin}
                                    placeholder="Vin" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridRegistracija">
                                <Form.Label>registracija</Form.Label>
                                <Form.Control
                                    name="registracija"
                                    disabled
                                    defaultValue={this.props.registracija}
                                    placeholder="Registracija" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridGodinaProizvodnje">
                                <Form.Label>GodinaProizvodnje</Form.Label>
                                <Form.Control
                                    name="godinaProizvodnje"
                                    disabled
                                    defaultValue={this.props.godinaProizvodnje}
                                    placeholder="GodinaProizvodnje" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridBrojIme">
                                <Form.Label>Ime</Form.Label>
                                <Form.Control
                                    name="ime"
                                    disabled
                                    defaultValue={this.props.ime}
                                    placeholder="Ime" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPrezime">
                                <Form.Label>Prezime</Form.Label>
                                <Form.Control
                                    name="prezime"
                                    disabled
                                    defaultValue={this.props.prezime}
                                    placeholder="Prezime" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    disabled
                                    defaultValue={this.props.email}
                                    placeholder="Email" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridTelefon">
                                <Form.Label>Telefon</Form.Label>
                                <Form.Control
                                    name="telefon"
                                    disabled
                                    defaultValue={this.props.telefon}
                                    placeholder="Telefon" />
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>

                            <Form.Group as={Col} controlId="formGridStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select"
                                    onChange={this.handleChange}
                                    name="status"
                                    defaultValue={this.props.status}
                                >
                                    <option value="Zaprimljeno">Zaprimljeno</option>
                                    <option value="Na dizalici">Na dizalici</option>
                                    <option value="Čeka dijelove">Čeka dijelove</option>
                                    <option value="Završeno">Završeno</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridDatumZaprimanja">
                                <Form.Label>DatumZaprimanja</Form.Label>
                                <Form.Control
                                    name="datumZaprimanja"
                                    disabled
                                    defaultValue={this.props.datumZaprimanja}
                                    placeholder="DatumZaprimanja" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridOpisKvara">
                                <Form.Label>OpisKvara</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                    name="opisKvara"
                                    disabled
                                    defaultValue={this.props.opisKvara}
                                    placeholder="OpisKvara" />
                            </Form.Group>


                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridKomentarDjelatnika">
                                <Form.Label>Komentar djelatnika</Form.Label>
                                <Form.Control as="textarea"
                                    name="komentarDjelatnika"
                                    defaultValue={this.props.komentarDjelatnika}
                                    placeholder="KomentarDjelatnika" />
                            </Form.Group>

                        </Form.Row>

                        <Form.Group>
                            <Button variant="primary" type="submit" >
                                Osvježi nalog
                        </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>

        )
    }
}
export default DetaljiNalogaModal