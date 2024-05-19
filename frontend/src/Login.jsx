import Button from "react-bootstrap/Button"
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const Login = () => {
    return (
        <>
            <p>login</p>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control as="input" />
                </Form.Group>
            </Form>
            <Link to="/explore">
                <Button>start exploring</Button>
            </Link>
        </>
    )
}

export default Login