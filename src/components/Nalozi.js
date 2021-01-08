import React from 'react'
import { Table, Button } from 'react-bootstrap'

class Nalozi extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nalozi: [{
                brojNaloga: "",
                opisKvara: "",
                status: "",
                datumZaprimanja: "",
                datumZavrsetka: "",
                djelatnikId: "",
                komentarDjelatnika: "",
                marka: "",
                model: "",
                tip: "",
                ime: "",
                prezime: "",
                email: "",
                telefon: "",
                imeDjelatnika: "",
                prezimeDjelatnika: ""
            }]
        }


    }

    componentDidMount() {
        this.refreshGrid()

    }

    componentDidUpdate() {
        this.refreshGrid()
    }

    refreshGrid() {
        fetch('http://localhost:8080/sviNalozi')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    nalozi: data
                })

            })
    }

    handleButtonPreuzmi = (nalogPreuzmi) => {

        this.setState(prevState => {
            const updatedState = prevState.nalozi.map(nalog => {
                if (nalog.brojNaloga === nalogPreuzmi.brojNaloga) {
                    nalog.djelatnikId = this.props.id
                }
                return nalog;
            })
            return {
                nalozi: updatedState
            }
        })

        fetch('http://localhost:8080/preuzmiNalog?brojNaloga=' + nalogPreuzmi.brojNaloga + '&radnikId=' + this.props.id)
            .then(res => res.json())
            .then((result) => {
                alert(result);
            })

    }

    render() {
        return (
            <div className="body">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Broj naloga</th>
                            <th>Opis kvara</th>
                            <th>Status</th>
                            <th>Datum zaprimanja</th>
                            <th>Datum zavrsetka</th>
                            <th>Marka</th>
                            <th>Model</th>
                            <th>Tip</th>
                            <th>Komentar djelatnika</th>
                            <th>Ime djelatnika</th>
                            <th>Prezime djelatnika</th>
                            <th>Preuzimanje naloga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.nalozi[0].brojNaloga != "" && this.state.nalozi.map(nalog => {
                            return (
                                <tr>
                                    <td>
                                        {nalog.brojNaloga}
                                    </td>
                                    <td>
                                        {nalog.opisKvara}
                                    </td>
                                    <td>
                                        {nalog.status}
                                    </td>
                                    <td>
                                        {nalog.datumZaprimanja}
                                    </td>
                                    <td>
                                        {nalog.datumZavrsetka}
                                    </td>
                                    <td>
                                        {nalog.marka}
                                    </td>
                                    <td>
                                        {nalog.model}
                                    </td>
                                    <td>
                                        {nalog.tip}
                                    </td>
                                    <td>
                                        {nalog.komentarDjelatnika}
                                    </td>
                                    <td>
                                        {nalog.imeDjelatnika}
                                    </td>
                                    <td>
                                        {nalog.prezimeDjelatnika}
                                    </td>

                                    {nalog.djelatnikId ? <td><Button variant="success" >Preuzeto</Button></td> : <td><Button variant="danger" onClick={() => this.handleButtonPreuzmi(nalog)}>Preuzmi</Button></td>}
                                </tr>

                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default Nalozi