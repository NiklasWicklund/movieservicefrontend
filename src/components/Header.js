import React, {useState } from 'react';
import { Navbar, Nav,Form,FormControl,Container,Button } from 'react-bootstrap';
import {Link } from 'react-router-dom';
function Header({handleSearch}) {
    const [searchString,setSearchString] = useState('')
  return (
        <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
        <Container fluid>
            <Navbar.Brand as={Link} to="/">MovieNow</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/discover">Discover</Nav.Link>
            </Nav>
            <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Search"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success" onClick={() => {handleSearch(searchString)}}>Search</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    
  )
}

export default Header