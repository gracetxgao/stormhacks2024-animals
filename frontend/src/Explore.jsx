import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Animal from "./Animal"
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';

const Explore = () => {
    let animals = []
    const [imageSrc, setImageSrc] = useState([]);

    // Initialize basic info when screen loaded
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await loadBasicInfo()
                animals=response.animals
                loadThumbnails()
            } catch (error) {
                console.log(error)
            }
        }
        // fetchData()
        const test = async () => {
            try {
                const response = await axios.post('http://localhost:5000/getThumbnail', {thumbnail: 'jaeyoung.txt'})
                const blob = new Blob([response.data], { type: "text" });

                // To see blob
                await blob.text().then((response) => {console.log(response)})
                const imageUrl = URL.createObjectURL(blob); // Create a local URL for the image blob
                console.log(imageUrl)
                // imageSrc.push(imageUrl)
                // setImageSrc(prevState => [...prevState, imageUrl]);
                // // setImageSrc(imageSrc.push(imageUrl)) // Update state with the image URL
                // console.log(imageSrc)
            } catch (error) {

            }
        }
        test()
    },[])



    const loadBasicInfo = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/getAnimalsBasic')
            return data
        } catch (error) {
            console.log(error)
        }
    }

    const loadThumbnails = async () => {
        for (let i = 0; i < animals.length; i++) {
            getThumbnailFromIndex(i)
        }
    }

    const getThumbnailFromIndex = async (index) => {
        try {
            const curAnimal = animals[index]
            console.log(curAnimal)
            const { thumbnail } = curAnimal
            const response = await axios.post('http://localhost:5000/getThumbnail', {thumbnail: thumbnail})
            const blob = new Blob([response.data], { type: "image/jpeg" });

            // To see blob
            await blob.text().then((response) => {console.log(response)})
            const imageUrl = URL.createObjectURL(blob); // Create a local URL for the image blob
            console.log(imageUrl)
            imageSrc.push(imageUrl)
            setImageSrc(prevState => [...prevState, imageUrl]);
            // setImageSrc(imageSrc.push(imageUrl)) // Update state with the image URL
            console.log(imageSrc)
            // This code also didnt work
            // console.log(imageUrl)
            // const iframe = document.querySelector("abo");
            // iframe.setAttribute("src", imageUrl);
            // URL.revokeObjectURL(imageUrl);
            
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <Container className="fluid">
            <div>
                <img className="abo" src={imageSrc[0]}></img>
                a
            </div>
            <div className="row">
                <div className="col-sm-2"></div>
                    <div className="col-sm-8" align="center">
                    <Form className="w-100">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label style={{marginTop: 100, marginBottom: 30, fontSize: 40, fontWeight: "bold"}}>Explore!</Form.Label>
                            <Form.Control type="email" placeholder="ex. panda" />
                            <div style={{marginBottom:40}}></div>
                        </Form.Group>
                    </Form>
                    <Animal name="fu bao" location="china" color="F6E1C1" highlightColor="F0C490" animal="panda" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
                    <Animal name="sandra" location="canada" color="DCF6C1" highlightColor="ACD37A" animal="gorilla" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
                    <Animal name="kayla" location="canada" color="F5E0FF" highlightColor="BA90F0" animal="saola" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
                    <Animal name="ryan" location="nuggets" color="F6E1C1" highlightColor="F0C490" animal="rhino" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
                    <Animal name="percy" location="nuggets" color="DCF6C1" highlightColor="ACD37A" animal="porpoise" image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1599px-Grosser_Panda.JPG"/>
                </div>
            </div>
        </Container>
    )
}

export default Explore