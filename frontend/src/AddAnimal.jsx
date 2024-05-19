import './Home.css'
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import { motion } from 'framer-motion';
import React, { useState } from "react";

const AddAnimal = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const attemptAddAnimal = async (info) => {
        try {
            // console.log(info)
            const { data } = await axios.post('http://localhost:5001/addAnimal', info)
            return data
        }   catch (error) {
            return error.response.data
        }
    }

    const attemptUploadThumbnail = async (formData) => {
        try {
            const { data } = await axios.post('http://localhost:5001/uploadThumbnail', formData)
            return data
        } catch (error) {
            return error.response.data
        }
    }

    const formSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        
        var input = { name: document.getElementById('exampleForm.ControlInput1').value,
                      location: document.getElementById('exampleForm.ControlInput2').value,
                      type: document.getElementById('exampleForm.ControlInput3').value,
                      description: document.getElementById('exampleForm.ControlInput4').value,
                      donationGoal: document.getElementById('exampleForm.ControlInput5').value,
                      currentDonations: document.getElementById('exampleForm.ControlInput6').value,
                      thumbnail: file.name}
        let emptyProperty = false
        for(var key in input) {
            if(input[key] === "") {
                emptyProperty = true 
            }
        }
        if (!emptyProperty) {
            attemptAddAnimal(input).then((response) => {
                console.log(response)})
            attemptUploadThumbnail(formData).then((response) => {
                console.log(response)
            })
        }
    }

    return (
        <div className="bottom-section">
        <Container fluid className="d-flex vh-100" style={{ width: '100vw' }}>
            <Row className="m-auto w-100">
                <Col xs={10} md={8} lg={6} className="d-flex flex-column align-items-center mx-auto" style={{ maxWidth: '500px' , backgroundColor: "#F6E1C1", borderRadius: "10px", padding:"30px", marginLeft: "10px", marginRight:"10px"}}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Add Animal</h1>
                    <Form className="w-100">
                        <Form.Group controlId="exampleForm.ControlInput1" style={{marginBottom: "15px"}}>
                            <Form.Label>Name of animal</Form.Label>
                            <Form.Control type="name" placeholder="ex. Fu Bao" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2" style={{marginBottom: "15px"}}>
                            <Form.Label>Location (City, country)</Form.Label>
                            <Form.Control type="location" placeholder="ex. Seoul, South Korea" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput3" style={{marginBottom: "15px"}}>
                            <Form.Label>Type of Animal</Form.Label>
                            <Form.Control type="type-of-animal" placeholder="ex. Panda" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput4" style={{marginBottom: "15px"}}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="description" placeholder="Place description here" />    
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput5" style={{marginBottom: "15px"}}>
                            <Form.Label>Donation goal</Form.Label>
                            <Form.Control type="description" placeholder="ex. $3500" />    
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput6">
                            <Form.Label>Current donations</Form.Label>
                            <Form.Control type="description" placeholder="ex. $2500" />  
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput7" style={{marginBottom: "15px"}}>
                            <input type='file' className="thumbnail" onChange={handleFileChange} />
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            {/* <Link to="/explore"> */}
                            <motion.button 
                                 whileHover = {{scale : 1.05, backgroundColor: "#F5F5F5"}}
                                 whileTap = {{scale: 0.95}}
                                 className="mt-3" onClick={formSubmit}
                                 style={{backgroundColor: "white", borderColor: "#F0C490", border: "5px solid", color: "#F0C490", borderRadius: "5px", height: "50px", fontSize: "20px"}}>Start Exploring</motion.button>
                            {/* </Link> */}
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default AddAnimal