import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Animal from "./Animal"
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';

const Explore = () => {
    let animals = [{"name":"Fu Bao","location":"Seoul, South Korea","type":"Panda","description":"Fu Bao my goat ","donationGoal":"$12000","currentDonation":"$6300","thumbnail":"panda.jpg"}]

    // Initialize basic info when screen loaded
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await loadBasicInfo()
                animals=response.animals
                console.log(animals)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

    const loadBasicInfo = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/getAnimalsAdvanced')
            return data
        } catch (error) {
            console.log(error)
        }
    }

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
                            <Form.Control type="search" placeholder="Search" />
                            <div style={{marginBottom:40}}></div>
                        </Form.Group>
                    </Form>
                    {[...animals].map((item) => (
                        <Animal name={item.name} location={item.location} color="F6E1C1" highlightColor="F0C490" animal={item.type} image={item.thumbnail} description={item.description} donationGoal={item.donationGoal} currentDonation={item.currentDonation}/>
                    ))};
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