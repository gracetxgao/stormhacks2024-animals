import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Animal from "./Animal"
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import animalService from '../server/animals';

const Explore = () => {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        console.log('getting animals');
        animalService
            .getAll()
            .then(response => {
                console.log('fulfilled');
                setAnimals(prevAnimals => [...prevAnimals, ...response])
            })
    }, [])

    console.log(`number of animals: ${animals.length}`);

    const animalCards = animals.map((a, index) => {
        console.log(a.name);
        
        var imageSource;
        if (a.uri) {
            if (a.uri.startsWith('http')) {
                imageSource = a.uri;
            } else {
                imageSource = `data:image/jpg;charset=utf-8;base64, ${a.uri}`;
            }
        }

        // console.log(imageSource);

        let name = a.name;
        let location = a.location;
        let type = a.type;
        let description = a.description;
        let goal = a.goal;

        return (
          <Animal
            key={index}
            name={name}
            location={location}
            type={type}
            description={description}
            goal={goal}
            image={imageSource}
          />
        );
    });

    // // let animals = []
    // const [imageSrc, setImageSrc] = useState([]);

    // // Initialize basic info when screen loaded
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await loadBasicInfo()
    //             animals=response.animals
    //             loadThumbnails()
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchData()
    // },[])

    // const loadBasicInfo = async () => {
    //     try {
    //         const { data } = await axios.get('http://localhost:5000/getAnimalsBasic')
    //         return data
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const loadThumbnails = async () => {
    //     for (let i = 0; i < animals.length; i++) {
    //         getThumbnailFromIndex(i)
    //     }
    // }

    // const getThumbnailFromIndex = async (index) => {
    //     try {
    //         const curAnimal = animals[index]
    //         console.log(curAnimal)
    //         const { thumbnail } = curAnimal
    //         const response = await axios.post('http://localhost:5000/getThumbnail', {thumbnail: thumbnail})
    //         const blob = new Blob([response.data], { type: "image/jpeg" });

    //         // To see blob
    //         // await blob.text().then((response) => {console.log(response)})
    //         const imageUrl = URL.createObjectURL(blob); // Create a local URL for the image blob
    //         console.log(imageUrl)
    //         imageSrc.push(imageUrl)
    //         setImageSrc(prevState => [...prevState, imageUrl]);
    //         // setImageSrc(imageSrc.push(imageUrl)) // Update state with the image URL
    //         console.log(imageSrc)
    //         // This code also didnt work
    //         // console.log(imageUrl)
    //         // const iframe = document.querySelector("abo");
    //         // iframe.setAttribute("src", imageUrl);
    //         // URL.revokeObjectURL(imageUrl);
            
    //     } catch (error) {
    //         console.log(error.response.data)
    //     }
    // }

    return (
        <Container className="fluid">
            <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10" align="center">
                    <Form className="w-100">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label style={{marginTop: 100, marginBottom: 30, fontSize: 40, fontWeight: "bold"}}>Explore!</Form.Label>
                            <Form.Control type="email" placeholder="ex. panda" />
                            <div style={{marginBottom:40}}></div>
                        </Form.Group>
                        {animalCards}
                    </Form>
                </div>
            </div>
        </Container>
    )
}

export default Explore