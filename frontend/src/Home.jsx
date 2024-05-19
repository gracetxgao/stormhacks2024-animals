import Picture1 from './zooImage1.png';

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
    const gotToNewPage=()=>{
        navigate("/Login");
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
            {zoomCompleted && (
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top" style={{backgroundColor: "#fc7e7e !important"}}>
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="#">Sticky top</Link>
                        <motion.button class="login-button" onClick={() => gotToNewPage()}
                            whileHover = {{scale : 1.05}} whileTap = {{scale : 0.95}}
                        >Login</motion.button>
                    </div>
                </nav>
            )}
            <Explore />
            
        </>
    );
};

export default Home;
