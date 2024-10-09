import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id={PAGE_IDS.LANDING} className="py-3">
    <Row className="align-middle text-center my-5">
      <Col className="justify-content-center">
        <h1>Noble</h1>
        <h3>Prepared for Tomorrow</h3>
      </Col>
    </Row>
    <Row className="align-middle text-center my-5">
      <Col className="text-start">
        <p>Ask health-related questions anonymously.
        </p>
      </Col>
      <Col>
        <p>Image</p>
      </Col>
    </Row>
    <Row className="align-middle text-center my-5">
      <Col>
        <p>Image</p>
      </Col>
      <Col className="text-start">
        <p>Our interactive Question Compass guides you step-by-step through common concerns, providing personalized advice
          based on your responses. Whether it&apos;s a minor query or a more complex issue, you&apos;ll get the guidance you need.
        </p>
      </Col>
    </Row>
  </Container>
);

export default Landing;
