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
            <div class="row">
            <div class="col-sm-2"></div>
            <div class="col-sm-8" align="center">
            <Form className="w-100">
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label style={{marginTop: 100, marginBottom: 30, fontSize: 40, fontWeight: "bold"}}>Explore!</Form.Label>
                    <Form.Control type="email" placeholder="ex. panda" />
                    <div style={{marginBottom:40}}></div>
                </Form.Group>
            </Form>
            </div>
            </div>
            <Animal name="panda" location="china" color="F6E1C1" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
            <Animal name="dog" location="canada" color="DCF6C1"  image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
            <Animal name="chicken" location="nuggets" color="F5E0FF"  image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
        </Container>
    )
}

export default Explore