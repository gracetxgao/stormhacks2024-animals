import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css'
import { motion } from 'framer-motion';

const Login = () => {
    const attemptLogin = async (name) => {
        try {
            console.log(name)
            const { data } = await axios.post('http://localhost:5001/login', {name: name})
            return data
        }   catch (error) {
            console.log(error)
        }
    }

    const formSubmit = (event) => {
        // event.preventDefault();
        var input = document.getElementById('exampleForm.ControlInput1').value
        attemptLogin(input).then((response) => {
            console.log(response)})
    }

    const hexToRgb = (hex) => {
        let hex_color = hex
        hex_color = hex_color.replace("#", "")
        let red = parseInt(hex_color.substring(0, 2), 16)
        let green = parseInt(hex_color.substring(2, 4), 16)
        let blue = parseInt(hex_color.substring(4, 6), 16)
        return {r: red, g: green, b: blue}
    }

    const rgb = hexToRgb("#F5E0FF")
    // `rgba(${hexToRgb(color).r}, ${hexToRgb(color).g}, ${hexToRgb(color).b}, 0.7)`
    // "#F5E0FF"
    return (
        <div className='bottom-section'>
        <Container fluid className="d-flex vh-100" style={{ width: '100vw'}}>
            
            <Row className="m-auto w-100">
                <Col xs={10} md={8} lg={6} className="d-flex flex-column align-items-center mx-auto" style={{ maxWidth: '500px' , backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7)`, padding: "50px", borderRadius: "10px"}}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Log in</h1>
                    <Form className="w-100">
                        <Form.Group controlId="exampleForm.ControlInput1" style={{marginBottom: "20px"}}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="ex. name@example.com" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="ex. password123" />
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Link to="/">
                                <motion.button 
                                 whileHover = {{scale : 1.05, backgroundColor: "#F5F5F5"}}
                                 whileTap = {{scale: 0.95}}
                                 className="mt-3" onClick={formSubmit}
                                 style={{backgroundColor: "white", borderColor: "#BA90F0", border: "5px solid", color: "#BA90F0", borderRadius: "5px", height: "50px", fontSize: "20px"}}>Start Exploring</motion.button>
                            </Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default Login;
