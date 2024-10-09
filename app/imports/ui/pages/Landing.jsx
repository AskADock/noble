import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container fluid id={PAGE_IDS.LANDING} className="p-0">
    <Container fluid className="landing-background">
      <Row className="align-middle text-center">
        <Col className="justify-content-center my-5">
          <h1>Noble</h1>
          <h3>Prepared for Tomorrow</h3>
        </Col>
      </Row>
    </Container>
    <Container>
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
  </Container>
);

export default Landing;
