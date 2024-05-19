import './AddAnimal.css'
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

import React, { useState } from "react";

const AddAnimal = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const attemptAddAnimal = async (info) => {
        try {
            // console.log(info)
            const { data } = await axios.post('http://localhost:5000/addAnimal', info)
            return data
        }   catch (error) {
            return error.response.data
        }
    }

    const attemptUploadThumbnail = async (formData) => {
        try {
            const { data } = await axios.post('http://localhost:5000/uploadThumbnail', formData)
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
                      thumbNail: file.name}
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
        <Container fluid className="d-flex vh-100" style={{ width: '100vw' }}>
            <Row className="m-auto w-100">
                <Col xs={10} md={8} lg={6} className="d-flex flex-column align-items-center mx-auto" style={{ maxWidth: '500px' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Add Animal</h1>
                    <Form className="w-100">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Name of animal</Form.Label>
                            <Form.Control type="name" placeholder="ex. Fu Bao" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Location (City, country)</Form.Label>
                            <Form.Control type="location" placeholder="ex. Seoul, South Korea" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput3">
                            <Form.Label>Type of Animal</Form.Label>
                            <Form.Control type="type-of-animal" placeholder="ex. Panda" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput4">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="description" placeholder="Place description here" />    
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput5">
                            <Form.Label>Donation goal</Form.Label>
                            <Form.Control type="description" placeholder="ex. $3500" />    
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput6">
                            <Form.Label>Current donations</Form.Label>
                            <Form.Control type="description" placeholder="ex. $2500" />  
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput7">
                            <input type='file' className="thumbnail" onChange={handleFileChange} />
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            {/* <Link to="/explore"> */}
                                <Button className="mt-3" onClick={formSubmit}>Start Exploring</Button>
                            {/* </Link> */}
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddAnimal