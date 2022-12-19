import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/ImpresorasPage.css'
import { useEffect } from 'react'
import { Card, Col, ListGroup, Row } from 'react-bootstrap'
import { useImpStore } from '../hooks/useImpStore'
import { ImpresorasForm } from '../components/ImpresorasForm'

export const ImpresorasPage = () => {

    const { impresoras, startGetImp } = useImpStore()



    useEffect(() => {
        startGetImp()
    }, [])

    return (
        <>

            <ImpresorasForm />

            <div className='text-center'>
                <h3>Impresoras</h3>
            </div>

            <Row xs={1} md={2} lg={3} className="g-4 text-center m-2">
                {Array.from(impresoras).map(impresora => (
                    <Col key={impresora.uid}>
                        <Card>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>{impresora.ciudad}</ListGroup.Item>
                                    <ListGroup.Item>{impresora.sucursal}</ListGroup.Item>
                                    <ListGroup.Item>{impresora.marca}</ListGroup.Item>
                                    <ListGroup.Item>{impresora.modelo}</ListGroup.Item>
                                    <ListGroup.Item>{impresora.toner}</ListGroup.Item>
                                    <ListGroup.Item>{impresora.propia}</ListGroup.Item>
                                    <ListGroup.Item>{impresora.estado}</ListGroup.Item>
                                    <ListGroup.Item>{impresora.sector}</ListGroup.Item>
                                    <ListGroup.Item>{impresora.ip}</ListGroup.Item>
                                    <ListGroup.Item>{impresora.codigo}</ListGroup.Item>
                                    <ListGroup.Item>{impresora.proveedor}</ListGroup.Item>
                                    <ListGroup.Item>{impresora.comentarios}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}
