import Picture1 from '../public/zooImage1.png';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';

const Home = () => {
    const controls = useAnimation();
    const [zoomCompleted, setZoomCompleted] = useState(false);
    const [zoomFactor, setZoomFactor] = useState(0);

    useEffect(() => {
        const handleWheel = (event) => {
            if (!zoomCompleted) {
                event.preventDefault();
                const deltaY = event.deltaY;
                if (deltaY > 0) { // Only handle positive scroll
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
                    window.scrollTo(0, 0); // Keep the page from scrolling
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
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="#">Sticky top</Link>
                    </div>
                </nav>
            )}
            <div className="container mt-3">
                <h3>Sticky Navbar</h3>
                <p>A sticky navigation bar stays fixed at the top of the page when you scroll past it.</p>
                <p>Scroll this page to see the effect. <strong>Note:</strong> sticky-top does not work in IE11 and earlier.</p>
            </div>
            <div className="container-fluid">
                <p>Some example text. Some example text. Some example text. Some example text. Some example text.</p>
                <p>Some example text. Some example text. Some example text. Some example text. Some example text.</p>
                <p>Some example text. Some example text. Some example text. Some example text. Some example text.</p>
                <p>Some example text. Some example text. Some example text. Some example text. Some example text.</p>
            </div>
        </>
    );
};

export default Home;
