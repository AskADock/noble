import React from 'react';
import { Row, Col, Container, Button, Card } from 'react-bootstrap';
import { LockFill, ShieldFill, PersonCheckFill } from 'react-bootstrap-icons';
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
        <Button className="rounded-3" variant="outline-light" size="lg" href="/question-compass">
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
      <Col xs={12} sm={11} md={9}>
        <Card className="rounded-4 p-3 my-4 text-center">
          <h2>Your Private Health Resource</h2>
          <hr />
          <h6>Whether it&apos;s a minor query or a more complex issue, you&apos;ll find the guidance you need.</h6>
        </Card>
      </Col>
    </Container>
    <Container fluid className="color2 p-4 d-flex justify-content-center align-items-center">
      <Row className="justify-content-end align-content-end">
        <Col xs={12} lg={4} className="d-flex justify-content-center">
          <Card className="landing-info-card rounded-4 p-1 m-2">
            <Card.Img src="/images/FAQ.png" alt="Logo" variant="top" className="rounded-4" />
            <Card.Body>
              <Row className="mt-3 text-center">
                <h2>FAQ</h2>
                <p>First Stop for Quick Answers</p>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={4} className="d-flex justify-content-center">
          <Card className="landing-info-card rounded-4 p-1 m-2">
            <Card.Img src="/images/Compass.png" alt="Logo" variant="top" className="rounded-4" />
            <Card.Body>
              <Row className="mt-3 text-center">
                <h2>Question Compass</h2>
                <p>Find the right path to your health questions</p>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={4} className="d-flex justify-content-center">
          <Card className="landing-info-card rounded-4 p-1 m-2">
            <Card.Img src="/images/P.png" alt="Logo" variant="top" className="rounded-4" />
            <Card.Body>
              <Row className="mt-3 text-center">
                <h2>Ask A Doc</h2>
                <p>Can&apos;t find an answer? Ask a medical professional directly!</p>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Container fluid className="color1 p-4 d-flex justify-content-center align-items-center">
      <Row className="justify-content-end align-content-end">
        <Col>
          <Card className="rounded-4 p-3 my-4 text-center">
            <Card.Title>
              <h2>Our Promise</h2>
            </Card.Title>
            <Card.Body>
              <Row>
                <Col>
                  <LockFill size="7vw" className="landing-info-card-icon" />
                  <h5>
                    We don&apos;t collect any personal information.
                  </h5>
                </Col>
                <Col>
                  <ShieldFill size="7vw" className="landing-info-card-icon" />
                  <h5>
                    No tracking - your usage stays anonymous.
                  </h5>
                </Col>
                <Col>
                  <PersonCheckFill size="7vw" className="landing-info-card-icon" />
                  <h5>
                    Completely anonymous interactions.
                  </h5>
                </Col>
              </Row>
              <hr />
              <h4>
                Noble is designed with privacy in mind. No login required, no personal information collected.
              </h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Container fluid className="color4 p-4 d-flex justify-content-center align-items-center">
      <Col xs={12} sm={11} md={9}>
        <Card className="rounded-4 p-3 my-4 text-center">
          <h2>Our Mission</h2>
          <br />
          <p>
            Our mission is to empower individuals to take control of their health by providing accessible,
            accurate, and supportive medical resources. Through innovative tools and educational content,
            we aim to promote well-being, self-care, and informed decision-making for a healthier community.
          </p>
        </Card>
      </Col>
    </Container>
  </Container>
);

export default Landing;
