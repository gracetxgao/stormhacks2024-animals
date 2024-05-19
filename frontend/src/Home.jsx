import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <p>home</p>
            <Link to="/animals"><Button>animals</Button></Link>
        </>
    )
}

export default Home