import React from 'react'
import { Table, Button, ButtonToolbar } from 'react-bootstrap'
import DetaljiNalogaModal from './DetaljiNalogaModal'

class MojiNalozi extends React.Component {

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
                vin: "",
                registracija: "",
                mjenjac: "",
                gorivo: "",
                kilometri: "",
                snaga: "",
                godinaProizvodnje: "",
                ime: "",
                prezime: "",
                email: "",
                telefon: ""
            }],
            detaljiNalogaModalShow: false
        }


    }

    componentDidMount() {
        this.refreshGrid();
    }

    componentDidUpdate() {
        this.refreshGrid();
    }

    refreshGrid() {

        if (this.props.sifraUloge === 5) {

            fetch('http://localhost:8080/naloziPoStranci?id=' + this.props.id)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        nalozi: data
                    })

                })
        } else {
            console.log(this.props.id)
            fetch('http://localhost:8080/naloziPoDjelatniku?id=' + this.props.id)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        nalozi: data
                    })
                })
        }

    }



    render() {

        const { brojNaloga, marka, model, tip, vin, registracija, mjenjac, gorivo, kilometri, snaga, godinaProizvodnje,
            ime, prezime, email, telefon, opisKvara, status, datumZaprimanja, komentarDjelatnika } = this.state
        let detaljiNalogaModalClose = () => this.setState({ detaljiNalogaModalShow: false })

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
                            {this.props.sifraUloge != 5 &&
                                <th>Detalji naloga</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.nalozi.map(nalog => {
                            return (
                                <tr key={nalog.brojNaloga}>
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
                                    {this.props.sifraUloge != 5 &&
                                        <td>
                                            <ButtonToolbar>
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => this.setState({
                                                        detaljiNalogaModalShow: true,
                                                        brojNaloga: nalog.brojNaloga,
                                                        marka: nalog.marka,
                                                        model: nalog.model,
                                                        tip: nalog.tip,
                                                        vin: nalog.vin,
                                                        registracija: nalog.registracija,
                                                        mjenjac: nalog.mjenjac,
                                                        gorivo: nalog.gorivo,
                                                        kilometri: nalog.kilometri,
                                                        snaga: nalog.snaga,
                                                        godinaProizvodnje: nalog.godinaProizvodnje,
                                                        ime: nalog.ime,
                                                        prezime: nalog.prezime,
                                                        email: nalog.email,
                                                        telefon: nalog.telefon,
                                                        opisKvara: nalog.opisKvara,
                                                        status: nalog.status,
                                                        datumZaprimanja: nalog.datumZaprimanja,
                                                        komentarDjelatnika: nalog.komentarDjelatnika

                                                    })}
                                                >Detalji</Button>
                                                <DetaljiNalogaModal
                                                    show={this.state.detaljiNalogaModalShow}
                                                    onHide={detaljiNalogaModalClose}
                                                    refreshGrid={this.refreshGrid}
                                                    brojNaloga={brojNaloga}
                                                    marka={marka}
                                                    model={model}
                                                    tip={tip}
                                                    vin={vin}
                                                    registracija={registracija}
                                                    mjenjac={mjenjac}
                                                    gorivo={gorivo}
                                                    kilometri={kilometri}
                                                    snaga={snaga}
                                                    godinaProizvodnje={godinaProizvodnje}
                                                    ime={ime}
                                                    prezime={prezime}
                                                    email={email}
                                                    telefon={telefon}
                                                    opisKvara={opisKvara}
                                                    status={status}
                                                    datumZaprimanja={datumZaprimanja}
                                                    komentarDjelatnika={komentarDjelatnika}

                                                />
                                            </ButtonToolbar>
                                        </td>
                                    }



                                </tr>

                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default MojiNalozi