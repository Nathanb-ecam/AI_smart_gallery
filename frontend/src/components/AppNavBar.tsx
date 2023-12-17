// Navbar

import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AppNavbar() {
    return (
        <>
            <Navbar className="navbar bg-body-tertiary" bg="primary" data-bs-theme="dark">
                <Container>
                <Navbar.Brand href="#home">AI </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Smart Image Gallery</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </>
      );}

export default AppNavbar;
