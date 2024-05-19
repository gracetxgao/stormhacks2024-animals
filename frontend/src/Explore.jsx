import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Animal from "./Animal"
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';

const Explore = () => {
    const [animals, setAnimals] = useState([])
    const [filterAnimals, setFilterAnimals] = useState([])
    const [imageSrc, setImageSrc] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    // Initialize basic info when screen loaded
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await loadBasicInfo()
                // const temp = response.animals.slice()
                // console.log(temp)
                console.log(response.animals)
                setAnimals(response.animals)
                setFilterAnimals(response.animals)
                console.log(animals)
                loadThumbnails(response.animals.slice())
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

    const loadBasicInfo = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/getAnimalsInfo')
            return data
        } catch (error) {
            console.log(error)
        }
    }

    const loadThumbnails = async (animals) => {
        for (let i = 0; i < animals.length; i++) {
            getThumbnailFromIndex(animals, i)
        }
    }

    const getThumbnailFromIndex = async (animals, index) => {
        try {
            const curAnimal = animals[index]
            // console.log(curAnimal)
            const { thumbnail } = curAnimal
            const response = await axios.post('http://localhost:5000/getThumbnail', {thumbnail: thumbnail})
            
            // console.log(response.data)

            setImageSrc(prevState => [...prevState, response.data]);
            // setImageSrc(imageSrc.push(response.data)) // Update state with the image URL
            // console.log(imageSrc)
            
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const searchHandler = (event) => {
        let input = event.target.value.toLowerCase()

        setSearchInput(input)

        let clone = animals.slice()
        let tempArr = []

        for (let i = 0; i < animals.length; i++) {
            if (animals[i].name.toLowerCase().includes(searchInput) ||
             animals[i].type.toLowerCase().includes(searchInput)) {
                tempArr.push(clone[i])
            }
        }
        setFilterAnimals(tempArr)

        console.log(tempArr)
    }

    useEffect(() => {
        // console.log(imageSrc);
    }, [imageSrc]);

    return (
        <Container className="fluid">
            <div className="row">
                <div className="col-sm-1"></div>
                    <div className="col-sm-10" align="center">
                    <Form className="w-100">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label style={{marginTop: 100, marginBottom: 30, fontSize: 40, fontWeight: "bold", width: "200px"}}>Explore!</Form.Label>
                            <Form.Control onChange={searchHandler} type="search" placeholder="Search" />
                            <div style={{marginBottom:40}}></div>
                        </Form.Group>
                    </Form>
                    {/* <Animal name="fu bao" location="china" color="F6E1C1" highlightColor="F0C490" animal="panda" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
                    <Animal name="sandra" location="canada" color="DCF6C1" highlightColor="ACD37A" animal="gorilla" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
                    <Animal name="kayla" location="canada" color="F5E0FF" highlightColor="BA90F0" animal="saola" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
                    <Animal name="ryan" location="nuggets" color="F6E1C1" highlightColor="F0C490" animal="rhino" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
                    <Animal name="percy" location="nuggets" color="DCF6C1" highlightColor="ACD37A" animal="porpoise" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/> */}
                </div>
            </div>
        </Container>
    )
}

export default Explore