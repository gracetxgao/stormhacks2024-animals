import React, { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Chatbox from './Chatbox.jsx';
import { animate, motion, useInView } from 'framer-motion';
import locationImage from '../src/assets/location.png';

const Animal = (props) => {
    const { name, location, image, color, highlightColor, animal } = props;
    const [expand, setExpand] = useState(false);
    const [hasBeenInView, setHasBeenInView] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });
    

    const Images = [
        image,
        image,
        image,
        image
    ]
    const handleSeeAll = () => {
        setExpand(!expand);
    };

    useEffect(() => {
        if (isInView) {
            setHasBeenInView(true);
        }
    }, [isInView]);

    return (
        <div style={{ top: '0', zIndex: '1' }}>
            <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={{ opacity: hasBeenInView ? 1 : 0 }}
                transition={{ delay: 0.25, duration: 1 }}
            >
                <Container fluid style={{ backgroundColor: `#${color}`, borderRadius: '20px', maxWidth: '90vw' }}>
                    <Row className="d-flex justify-content-center align-items-center" style={{ margin: '30px' }}>
                        <Col sm={4} className="d-flex justify-content-center">
                            <div style={{ width: '400px', height: '400px', overflow: 'hidden', borderRadius: '50%' }}>
                                <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </Col>
                        <Col sm={8} className="text-center">
                            <Container>
                                <Row>
                                    <Col>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: `#${highlightColor}`, paddingBlock: '30px', borderRadius: '40px' }}>{name}</h3>
                                    </Col>
                                    <Col>
                                        <h3 style={{ fontSize: '1.2rem', backgroundColor: `#${highlightColor}`, paddingBlock: '30px', borderRadius: '40px' }}>
                                            <img src={locationImage} width={'10%'} style={{ marginInline: '5px'}} />
                                            {location}
                                        </h3>
                                    </Col>
                                </Row>
                                <Row style={{ margin: '5%'}}>Fu Bao, born on July 20, 2020, at Everland Resort in South Korea, is the country's first giant panda. Beloved for her playful antics and charming personality, her name means "a treasure that brings happiness."</Row>
                            </Container>                         
                            <motion.button onClick={handleSeeAll}
                            whileHover = {{scale : 1.05}} whileTap = {{scale : 0.95, rotate : "2.5deg"}} className="animate-button">{expand ? 'Close' : 'See All'}</motion.button>
                        </Col>
                    </Row>
                    {expand && (
                        <div style={{ marginTop: '50px' }}>
                            <Row className="d-flex justify-content-center align-items-center">
                                <Col className="d-flex" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <motion.div 
                                    initial = {{opacity : 0, height : 0}}
                                    animate = {{opacity : 1, height : "auto"}}
                                    transition={{duration : 0.1}}>
                                    <div class="slider">
                                    <div class="slide-track">

                                    {[...Images].map((item, idx) => (
                                        <img class="slide" src={image} alt={name} style={{ width: '20%', height: '100%', marginInline: '25px', borderRadius: '10%' }} />
                                    ))}
                                    </div>
                                    </div>
                                    </motion.div>
                                </Col>
                            </Row>
                            <Row className="m-5">
                                <ProgressBar now={60} />
                            </Row>
                            <Row style={{ padding: '3%' }}>
                                <h3>Begin a conversation with {name}!</h3>
                                <Chatbox name={name} animal={animal}/>
                            </Row>
                        </div>
                    )}
                </Container>
            </motion.div>
        </div>
    );
};

export default Animal;
