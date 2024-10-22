import React from 'react';
import { Container, Col, Row, Nav } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px' };
  return (
    <footer className="mt-auto bg-light">
      <Container style={divStyle}>
        <Row className="text-center">
          <Col md={4}>
            <img src="/images/Noble_Logo.png" alt="Logo" width="150" height="150" />
          </Col>
          <Col md={4}>
            <Nav className="justify-content-center">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/faq">FAQ</Nav.Link>
              <Nav.Link href="/question-compass">Question Compass</Nav.Link>
              <Nav.Link href="/ask-a-doc">Ask A Doc</Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <Nav className="justify-content-center">
              <Nav.Link href="/terms">Terms</Nav.Link>
              <Nav.Link href="/privacy">Privacy</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row className="text-center mt-3">
          <Col>
            Noble <br />
            University of Hawaii<br />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
