import Picture1 from './zooImage2.svg';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';
import Explore from './Explore';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const controls = useAnimation();
    const [zoomCompleted, setZoomCompleted] = useState(false);
    const [zoomFactor, setZoomFactor] = useState(0);

    useEffect(() => {
        const handleWheel = (event) => {
            if (!zoomCompleted) {
                event.preventDefault();
                const deltaY = event.deltaY;
                if (deltaY > 0) { 
                    setZoomFactor(prevZoomFactor => {
                        const newZoomFactor = Math.min(prevZoomFactor + deltaY / (window.innerHeight / 2), 4);
                        controls.start({
                            scale: 1 + newZoomFactor,
                            transition: { duration: 0 }
                        });
                        if (newZoomFactor >= 4) {
                            setZoomCompleted(true);
                        }
                        return newZoomFactor;
                    });
                    window.scrollTo(0, 0); 
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [controls, zoomCompleted]);

    useEffect(() => {
        if (zoomCompleted) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }, [zoomCompleted]);

    const navigate = useNavigate()
    const gotToLogin=()=>{
        navigate("/Login");
    }

    const gotToAdd=()=>{
    navigate("/add-animal");
    }

    return (
        <>
            <div className="fullscreen-bg">
                <motion.img
                    src={Picture1}
                    alt="Traffic"
                    className="fullscreen-bg__image"
                    animate={controls}
                    initial={{ scale: 1 }}
                />
            </div>
            <div className="bottom-section">
            {zoomCompleted && (
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="#">Stranger Endanger</Link>
                        <motion.button className="login-button" onClick={() => gotToLogin()} style={{ marginRight: "6%"}}
                            whileHover = {{scale : 1.05}} whileTap = {{scale : 0.95}}
                        >Login</motion.button>
                        <motion.button className="add-button" onClick={() => gotToAdd()}
                        whileHover = {{scale : 1.05}} whileTap = {{scale : 0.95}}
                    >Add Animal</motion.button>
                    </div>
                </nav>
            
            )}
           
            <Explore />
            </div>
            
        </>
    );
};

export default Home;