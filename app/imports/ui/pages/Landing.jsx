import React from 'react';
import { Row, Col, Container, Button, Card } from 'react-bootstrap';
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
      <Col xs={12} sm="auto" className="text-center">
        <Button className="rounded-3" variant="outline-light" size="lg" href="/faq">
          FAQ
        </Button>
      </Col>
      <Col xs={12} sm="auto" className="text-center">
        <Button className="rounded-3" variant="outline-light" size="lg" href="/">
          Question Compass
        </Button>
      </Col>
      <Col xs={12} sm="auto" className="text-center">
        <Button className="rounded-3" variant="outline-light" size="lg" href="/ask-a-doc">
          Ask A Doc
        </Button>
      </Col>
    </Row>
    <Container fluid className="color3 p-4 d-flex justify-content-center align-items-center">
      <Col xs={12} sm={11} md={10}>
        <Card className="rounded-3 p-5 m-5">
          <Row className="text-center">
            <Col xs={12} md={6}>
              <img src="/images/FAQ.png" alt="Logo" width="200" height="200" />
            </Col>
            <Col xs={12} md={6}>
              <h2>Ask health-related questions anonymously</h2>
              <p>Whether it&apos;s a minor query or a more complex issue, you&apos;ll find the guidance you need.</p>
            </Col>
          </Row>
        </Card>
      </Col>
    </Container>
    <Container fluid className="color2 p-4 d-flex justify-content-center align-items-center">
      <Col xs={12} sm={11} md={10}>
        <Card className="rounded-3 p-5 m-5">
          <Row className="text-center">
            <Col xs={12} md={6}>
              <h2>Question Compass</h2>
              <p>Find the right path to your health answers</p>
            </Col>
            <Col xs={12} md={6}>
              <img src="/images/N.png" alt="Logo" width="200" height="200" />
            </Col>
          </Row>
        </Card>
      </Col>
    </Container>
    <Container fluid className="color1 p-4 d-flex justify-content-center align-items-center">
      <Col xs={12} sm={11} md={10}>
        <Card className="rounded-3 p-5 m-5">
          <Row className="text-center">
            <Col xs={12} md={6}>
              <img src="/images/P.png" alt="Logo" width="200" height="200" />
            </Col>
            <Col xs={12} md={6}>
              <h2>Ask A Doc</h2>
              <p>Can&apos;t find an answer? Ask a medical professional directly!</p>
            </Col>
          </Row>
        </Card>
      </Col>
    </Container>
    <Container fluid className="color4 p-4 d-flex justify-content-center align-items-center">
      <Col xs={12} sm={11} md={10}>
        <Card className="rounded-3 p-5 my-5">
          <Row className="align-middle text-center my-5">
            <Col xs={12}>
              <h2>Our Mission</h2>
              <br />
              <p>
                Our mission is to empower individuals to take control of their health by providing accessible,
                accurate, and supportive medical resources. Through innovative tools and educational content,
                we aim to promote well-being, self-care, and informed decision-making for a healthier community.
              </p>
            </Col>
          </Row>
        </Card>
      </Col>
    </Container>
  </Container>
);

export default Landing;
