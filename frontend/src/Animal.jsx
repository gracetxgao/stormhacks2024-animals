import Container from 'react-bootstrap/Container';

const Animal = (props) => {
    const {name, location, image} = props
    return (
        <Container>
            <p>name: {name}</p>
            <p>location: {location}</p>
        </Container>
    )
}

export default Animal