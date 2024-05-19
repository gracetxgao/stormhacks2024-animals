import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';


const Animal = (props) => {
    const { name, location, image, color } = props;
    const [expand, setExpand] = useState(false)

    const handleSeeAll = () => {
        setExpand(!expand);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <Container fluid style={{ backgroundColor: `#${color}`, borderRadius: '20px', maxWidth: '90vw' }}>
                <Row className="d-flex justify-content-center align-items-center" style={{ margin: '30px'}}>
                    <Col sm={4} className="d-flex justify-content-center">
                        <div style={{ width: '400px', height: '400px', overflow: 'hidden', borderRadius: '50%' }}>
                            <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </Col>
                    <Col sm={8} className="text-center">
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{name}</p>
                        <p style={{ fontSize: '1.2rem' }}>{location}</p>
                        <ProgressBar now={60} style={{ margin: '20px' }}/>
                        <ProgressBar now={60} style={{ margin: '20px' }}/>
                        <Button onClick={handleSeeAll}>{expand ? 'Close' : 'See All'}</Button>
                    </Col>
                </Row>
                {expand &&
                    <div style={{ marginTop: '50px'}}>
                        <Row className="d-flex justify-content-center align-items-center">
                            <Col className="d-flex" style={{ display: 'flex', justifyContent: 'center'}}>
                                <img src={image} alt={name} style={{ width: '20%', height: '100%', marginInline: '25px', borderRadius: '10%' }} />
                                <img src={image} alt={name} style={{ width: '20%', height: '100%', marginInline: '25px', borderRadius: '10%' }} />
                                <img src={image} alt={name} style={{ width: '20%', height: '100%', marginInline: '25px', borderRadius: '10%' }} />
                                <img src={image} alt={name} style={{ width: '20%', height: '100%', marginInline: '25px', borderRadius: '10%' }} />
                            </Col>
                        </Row>
                        <Row className="m-5">
                            <ProgressBar now={60} />
                        </Row>
                    </div>
                }
            </Container>
        </div>
    );
}

export default Animal;

