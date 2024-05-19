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
    const { name, location, image, color, highlightColor, animal, description, donationGoal, currentDonation} = props;
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
                    <Row className="d-flex justify-content-center align-items-center" style={{ margin: '30px', paddingBlock: '30px' }}>
                        <Col sm={4} className="d-flex justify-content-center">
                            <div style={{ width: '400px', height: '300px', overflow: 'hidden', borderRadius: '50%' , borderColor: `#${highlightColor}`, border: '5px solid' }}>
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
                                <Row style={{ margin: '5%'}}>{description}</Row>
                            </Container>                         
                            <motion.button onClick={handleSeeAll} style={{ backgroundColor: 'white', color: `#${highlightColor}`, borderColor: `#${highlightColor}`, border: "4px solid", borderRadius: "15px"}}
                            whileHover = {{scale : 1.05, backgroundColor: "#F5F5F5"}} whileTap = {{scale : 0.95, rotate : "2.5deg"}} className="animate-button">{expand ? 'Close' : 'See All'}</motion.button>
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
                                        <motion.iframe 
                                        whileHover = {{scale : 1.05}} width="20%" height="100%" src="https://www.youtube.com/embed/sFY22hgbKYg" title="3-Second Animated Medical Laboratory Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
                                        style={{ width: '20%', height: '100%', marginInline: '20px', borderRadius: '10%', borderColor: 'black', border: '5px solid'}}></motion.iframe>
                                    ))}
                                    </div>
                                    </div>
                                    </motion.div>
                                </Col>
                            </Row>
                            <Row className="m-5">
                                <ProgressBar now={60} />
                            </Row>
                            <Row style={{ paddingBlock: '40px' }}>
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
