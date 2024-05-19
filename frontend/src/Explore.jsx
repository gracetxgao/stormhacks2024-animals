import Animal from "./Animal"
import Container from 'react-bootstrap/Container';

const Explore = () => {
    return (
        <Container fluid>
            <p>explore</p>
            <Animal name="panda" location="china" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
        </Container>
    )
}

export default Explore