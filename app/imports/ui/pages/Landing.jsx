import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container fluid id={PAGE_IDS.LANDING} className="landing-background p-0">
    <Row className="align-middle text-center mt-5 mb-3 py-5">
      <Col xs={12} className="justify-content-center text-shadow">
        <h1>Noble</h1>
        <h3>Prepared for Tomorrow</h3>
      </Col>
    </Row>
    <Row className="mt-2 mb-5 py-5 g-3 justify-content-center text-shadow">
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
    <Container fluid className="color3 p-4 d-flex justify-content-center align-items-center">
      <Col className="col-9 text-center">
        <Row className="align-middle text-center m-5">
          <Col className="text-shadow">
            <h2>Ask health-related questions anonymously</h2>
            <p>Whether it&apos;s a minor query or a more complex issue, you&apos;ll find the guidance you need.</p>
          </Col>
        </Row>
      </Col>
    </Container>
    <Container fluid className="color2 p-4 d-flex justify-content-center align-items-center">
      <Row className="align-middle text-center m-5">
        <Col className="text-shadow">
          <h3>Question Compass</h3>
        </Col>
      </Row>
    </Container>
    <Container fluid className="color1 p-4 d-flex justify-content-center align-items-center">
      <Row className="align-middle text-center my-5">
        <Col className="text-shadow">
          <h3>Ask A Doc</h3>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default Landing;
