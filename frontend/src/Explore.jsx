import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Animal from "./Animal"
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';

const Explore = () => {
    let animals = []
    
    const loadBasicInfo = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/getAnimalsBasic')
            return data
        } catch (error) {
            console.log(error)
        }
    }

    const initAnimals = () => {
        loadBasicInfo().then((data) => {
            console.log(data.animals)
        })
    }

    return (
        <Container className="fluid">
            <p>explore</p>
            <Form className="w-100">
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Search</Form.Label>
                    <Form.Control type="email" placeholder="ex. panda" />
                </Form.Group>
            </Form>
            <Animal name="panda" location="china" color="F6E1C1" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
            <Animal name="dog" location="canada" color="DCF6C1"  image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
            <Animal name="chicken" location="nuggets" color="F5E0FF"  image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
        </Container>
    )
}

export default Explore