import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Container fluid>
                <p>home</p>
                <Link to="/login">
                    <Button>get started</Button>
                </Link>
            </Container>
        </>
    )
}

export default Home