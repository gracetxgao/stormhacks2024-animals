import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Animal = (props) => {
    const { name, location, image } = props;
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', backgroundColor: '#b3e5fc' }}>
            <Container fluid className="d-flex justify-content-center" style={{ backgroundColor: '#F6E1C1', borderRadius: '20px', maxWidth: '80%', padding: '20px' }}>
                <Row className="d-flex justify-content-center align-items-center w-100">
                    <Col sm={4} className="d-flex justify-content-center">
                        <div style={{ width: '300px', height: '300px', overflow: 'hidden', borderRadius: '50%' }}>
                            <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </Col>
                    <Col sm={8} className="text-center">
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{name}</p>
                        <p style={{ fontSize: '1.2rem' }}>{location}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Animal;
