import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Animal from "./Animal"
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import animalService from '../server/animals';

const Explore = () => {
    const [animals, setAnimals] = useState([])
    const [filterAnimals, setFilterAnimals] = useState([])
    const [searchInput, setSearchInput] = useState([])
    const [imageSrc, setImageSrc] = useState([]);

    const Colours = [["F6E1C1", "F0C490"], ["DCF6C1", "ACD37A"], ["F5E0FF", "BA90F0"]]

    function random(mn, mx) {
        return Math.random() * (mx - mn) + mn;
    }
    
    function GFG_Fun() {
        return (Colours[(Math.floor(random(1, 4))) - 1]);
    }
    GFG_Fun()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await loadBasicInfo()
                // const temp = response.animals.slice()
                // console.log(temp)
                console.log(response.animals)
                setAnimals(response.animals)
                setFilterAnimals(response.animals.slice())
                loadThumbnails(response.animals.slice())
                // setAnimals(prev => [...prev, ...response.animals])
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

    const loadBasicInfo = async () => {
        try {
            const { data } = await axios.get('http://localhost:5001/getAnimalsInfo')
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
            // console.log(`animal??? ${curAnimal}`)
            const { thumbnail } = curAnimal
            const response = await axios.post('http://localhost:5001/getThumbnail', {thumbnail: thumbnail})
            
            // console.log(response.data)

            const imageUri = `data:image/jpg;charset=utf-8;base64,${response.data}`
            // console.log(imageUri);

            setImageSrc(prevState => [...prevState, imageUri]);
            // setImageSrc(imageSrc.push(response.data)) // Update state with the image URL
            // console.log(imageSrc)
            
        } catch (error) {
            console.log(error.response)
        }
    }

    const searchHandler = (event) => {
        // console.log(event.target.value)
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

    const AnimalCards = animals.map((a, index) => {
        let name = a.name
        let location = a.location
        let desc = a.description
        let goal = a.donationGoal
        let curr = a.currentDonation
        let imageSource = imageSrc[index];
        // console.log(`ahhhhh ${a.thumbnail}`);
        // console.log(`aafasdfas dfasdf ${imageSource}`);
        const color = GFG_Fun();

        return (
            <Animal
                key={index}
                name={name}
                location={location}
                description={desc}
                donationGoal={goal}
                currentDonation={curr}
                image={imageSource}
                color={color[0]}
                highlightColor={color[1]}
            />
          );

    })

    return (
        <Container className="fluid">
            <div className="row">
                <div className="col-sm-0"></div>
                    <div className="col-sm-12" align="center">
                <div className="col-sm-1"></div>
                <div className="col-sm-10" align="center">
                    <Form className="w-100">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label style={{marginTop: 100, marginBottom: 30, fontSize: 40, fontWeight: "bold", width: "200px"}}>Explore!</Form.Label>
                            <Form.Control onChange={searchHandler} type="search" placeholder="Search" />
                            <div style={{marginBottom:40}}></div>
                        </Form.Group>
                    </Form>
                    {/* {AnimalCards}
                    {/* <Animal name="fu bao" location="china" color="F6E1C1" highlightColor="F0C490" animal="panda" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
                    <Animal name="sandra" location="canada" color="DCF6C1" highlightColor="ACD37A" animal="gorilla" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
                    <Animal name="kayla" location="canada" color="F5E0FF" highlightColor="BA90F0" animal="saola" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
                    <Animal name="ryan" location="nuggets" color="F6E1C1" highlightColor="F0C490" animal="rhino" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
                    <Animal name="percy" location="nuggets" color="DCF6C1" highlightColor="ACD37A" animal="porpoise" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/> */}
                </div>
            </div>
            </div>
        </Container>
    )
}

export default Explore