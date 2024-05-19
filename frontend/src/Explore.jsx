import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Animal from "./Animal"
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
// import animalService from '../server/animals';

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

    const addInfos = (animals) => {
        for (let i = 0; i < animals.length; i++) {
            animals[i].correspondingImg = i
            animals[i].correspondingColour = GFG_Fun()
        }
    }

    const hexToRgb = (hex) => {
        let hex_color = hex
        hex_color = hex_color.replace("#", "")
        let red = parseInt(hex_color.substring(0, 2), 16)
        let green = parseInt(hex_color.substring(2, 4), 16)
        let blue = parseInt(hex_color.substring(4, 6), 16)
        return {r: red, g: green, b: blue}
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await loadBasicInfo()
                // const temp = response.animals.slice()
                // console.log(temp)
                addInfos(response.animals)
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
            console.log(curAnimal)
            console.log(thumbnail)
            console.log(index)
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
        // console.log(imageSrc[0]);
    }, [imageSrc]);

    const AnimalCards = filterAnimals.map((a, index) => {
        let name = a.name
        let location = a.location
        let desc = a.description
        let goal = a.donationGoal
        let curr = a.currentDonations
        let type = a.type
        let imageSource = imageSrc[a.correspondingImg];
        // console.log(`ahhhhh ${a.thumbnail}`);
        // console.log(`aafasdfas dfasdf ${imageSource}`);
        const color = a.correspondingColour;

        return (
            <Animal
                key={index}
                name={name}
                location={location}
                description={desc}
                donationGoal={goal}
                currentDonations={curr}
                image={imageSource}
                color={color[0]}
                highlightColor={color[1]}
                type={type}
            />
          );

    })

    return (
        <div className='bottom-section'>
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
                    {AnimalCards}
                </div>
            </div>
            </div>
        </Container>
        </div>
    )
}

export default Explore