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
            <Form className="w-100">
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Search</Form.Label>
                    <Form.Control type="email" placeholder="ex. panda" />
                </Form.Group>
            </Form>
            <Animal name="fu bao" location="china" color="F6E1C1" animal="panda" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
            <Animal name="sandra" location="canada" color="DCF6C1" animal="gorilla" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
            <Animal name="kayla" location="canada" color="F5E0FF" animal="saola" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
            <Animal name="ryan" location="nuggets" color="F6E1C1" animal="rhino" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
            <Animal name="percy" location="nuggets" color="DCF6C1" animal="porpoise" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
        </Container>
    )
}

export default Explore