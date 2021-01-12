import React from 'react'
import { Table, Button } from 'react-bootstrap'

class Djelatnici extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            djelatnici: [{
                id: "",
                ime: "",
                prezime: "",
                email: "",
                telefon: "",
                username: "",
                password: "",
                vrstaDjelatnika: ""
            }]

        }
    }

    componentDidMount() {
        this.dohvatiDjelatnike();

    }

    dohvatiDjelatnike = () => {

        console.log("pozvan dohvati djelatnike")
        fetch('http://localhost:8080/djelatnici')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    djelatnici: data
                })

            })
    }

    handleButton = (djelatnik) => {

        fetch('http://localhost:8080/obrisiDjelatnika?id=' + djelatnik.id)
            .then(response => response.json())

        this.dohvatiDjelatnike()

    }

    render() {
        return (
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>Email</th>
                            <th>Telefon</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Vrsta djelatnika</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.djelatnici.map(djelatnik => {
                            return (
                                <tr key={djelatnik.id}>
                                    <td>
                                        {djelatnik.ime}
                                    </td>
                                    <td>
                                        {djelatnik.prezime}
                                    </td>
                                    <td>
                                        {djelatnik.email}
                                    </td>
                                    <td>
                                        {djelatnik.telefon}
                                    </td>
                                    <td>
                                        {djelatnik.username}
                                    </td>
                                    <td>
                                        {djelatnik.password}
                                    </td>
                                    <td>
                                        {djelatnik.vrstaDjelatnika}
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={() => { if (window.confirm("Želite obrisati djelatnika " + djelatnik.ime + " " + djelatnik.prezime)) { this.handleButton(djelatnik) } }}>Delete</Button>
                                    </td>

                                </tr>

                            )
                        })}
                    </tbody>
                </Table>
            </div >
        )
    }
}
export default Djelatnici