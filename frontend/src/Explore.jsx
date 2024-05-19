import axios from 'axios'

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
        <div className="fluid">
            <p>explore</p>
            <Animal name="panda" location="china" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
        </div>
    )
}

export default Explore