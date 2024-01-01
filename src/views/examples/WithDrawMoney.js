import Header from 'components/Headers/Header'
import React from 'react'
import { Col, Container, Row, Input, Button } from 'reactstrap'

function WithDrawMoney() {
    return (
        <>
            <Header />
            <Container className="mt-5 mt-sm-0" fluid>
                <Row className="no-gutters justify-content-center">
                    <Col lg="6" md="8" >
                        <div className="complaint-card mt-5 mt-sm-4">
                            <div className="complaint-form">
                                <Input className="withdrawl-input" type="number" placeholder="Enter the withdrawal amount" />
                                <Input className="mt-4 withdrawl-input" type="date" />
                                <Button className="mt-4 w-100" color="primary">Submit</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default WithDrawMoney
