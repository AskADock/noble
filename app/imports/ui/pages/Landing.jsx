import React from 'react';
import { Row, Col, Container, Image, Button } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container fluid id={PAGE_IDS.LANDING} className="landing-background p-0">
    <Row className="align-middle text-center mt-5 mb-3 py-5">
      <Col xs={12} className="justify-content-center">
        <h1>Noble</h1>
        <h3>Prepared for Tomorrow</h3>
      </Col>
    </Row>
    <Row className="mt-3 mb-5 py-5 g-2 justify-content-center">
      <Col xs="auto">
        <Button className="rounded-0" variant="outline-light" size="lg" href="/">
          FAQ
        </Button>
      </Col>
      <Col xs="auto">
        <Button className="rounded-0" variant="outline-light" size="lg" href="/">
          Question Compass
        </Button>
      </Col>
      <Col xs="auto">
        <Button className="rounded-0" variant="outline-light" size="lg" href="/">
          Ask A Doc
        </Button>
      </Col>
    </Row>
    <Container fluid className="color1 p-4 d-flex justify-content-center align-items-center">
      <Col className="col-9 text-center">
        <Row className="align-middle text-center m-5">
          <Col className="text-center">
            <h3>Ask health-related questions anonymously
            </h3>
          </Col>
        </Row>
        <Row>
          <Col className="text-start">
            <p>Whether it&apos;s a minor query or a more complex issue, you&apos;ll find the guidance you need.</p>
            <p>The Question Compass </p>
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
      </Col>
    </Container>
  </Container>
);

export default Landing;
