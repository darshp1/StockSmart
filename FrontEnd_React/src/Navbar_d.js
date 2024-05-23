import './css/Navbar_d.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


import { useState, useEffect } from 'react';


import {  useLocation } from 'react-router-dom';

const Navbar_d = () => {

    const [selectedButton, setSelectedButton] = useState("search");
    const location = useLocation();

    useEffect(() => {
        // Extract the pathname from the location object
        const { pathname } = location;

        // Update the selected button based on the current pathname
        switch (pathname) {
            case "/search/home":
                setSelectedButton("search");
                break;
            case "/watchlist":
                setSelectedButton("watchlist");
                break;
            case "/portfolio":
                setSelectedButton("portfolio");
                break;
            default:
                setSelectedButton("search"); // Default to search if pathname doesn't match
                break;
        }
    }, [location]);
    return (
            <Navbar expand="lg" className="bg-body-tertiary sticky-top" style={{ padding: '0', margin: '0' }}>
                <Container fluid style={{ backgroundColor: 'blue' }}>
                    <Navbar.Brand className="d-flex align-items-center" style={{ color: 'white', fontSize: 'xx-large', marginLeft: '2vw', fontSize: '28px', height: '5vh', }}>Stock Search</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" className='border-white'>
                        <span><i className="bi bi-list text-light"></i></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="navbarScroll" className="justify-content-end" >
                        <Nav className="me-auto my-2 me-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Button
                                variant="outline-light"
                                as={Link}
                                to={"/search/home"}
                                className={`nav_right text-start ${selectedButton === "search" ? 'border border-light' : ''}`}
                                onClick={() => setSelectedButton("search")}
                            >
                                Search
                            </Button>
                            <Button
                                variant="outline-light"
                                as={Link}
                                to={"/watchlist"}
                                className={`nav_right text-start ${selectedButton === "watchlist" ? 'border border-light' : ''}`}
                                onClick={() => setSelectedButton("watchlist")}
                            >
                                Watchlist
                            </Button>
                            <Button
                                variant="outline-light"
                                as={Link}
                                to={"/portfolio"}
                                className={`nav_right text-start ${selectedButton === "portfolio" ? 'border border-light' : ''}`}
                                onClick={() => setSelectedButton("portfolio")}
                                style={{marginRight: '2vw'}}
                            >
                                Portfolio
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
     

    );
}

export default Navbar_d;


/*<Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid style={{ backgroundColor: 'blue' }}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home" style={{color: 'white', fontSize: '1.3vw', marginLeft: '2vw' }} >Stock Search</Nav.Link>
                    </Nav>
                    <Nav>
                        <Button variant="outline-light" href="#home" className='nav_right ' >Search </Button>
                        <Button variant="outline-light" href="#link" className='nav_right '>Watchlist</Button>
                        <Button variant="outline-light" href="#link" className='nav_right' style={{ marginRight: '3vw'}}>Portfolio</Button>
                    </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
 */

/*
        <nav>
            <div>
                Stock Search
            </div>
            <div>
                <button className="nav_right">Search</button>
                <button className="nav_right">Watchlist</button>
                <button className="nav_right">Portfolio</button>
            </div>
        </nav>
*/