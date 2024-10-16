import React from 'react';
import { Container, Col } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px' };
  return (
    <footer className="mt-auto bg-light">
      <Container style={divStyle}>
        <Col className="text-center">
          "Ask A Doc" <br />
          Lauren Clayton, Rina Ogino, Thomas Rivera, Ryne Stagen, Brandon Underwood <br />
          University of Hawaii at Manoa<br />
          <a href="http://ics-software-engineering.github.io/meteor-application-template-production">Template Home Page</a>
        </Col>
      </Container>
    </footer>
  );
};

export default Footer;
