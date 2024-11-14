import React from 'react';
import { Row, Col, Container, Button, Card, Image } from 'react-bootstrap';
import { LockFill, ShieldFill, PersonCheckFill } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container fluid id={PAGE_IDS.LANDING} className="landing-background p-0">
    {/* Hero Section */}
    <Container className="p-0">
      <Row className="hero-section align-items-center text-center my-5 py-5">
        <Col xs={12} className="justify-content-center">
          <h1 className="hero-title">Noble</h1>
          <h3 className="hero-subtitle">
            Prepared for Tomorrow
          </h3>
          <Row className="py-5 g-3 justify-content-center text-shadow">
            <Col xs={12} sm="auto" className="text-center">
              <Button className="rounded-3" variant="outline-light" size="lg" href="/faq">
                <strong>FAQ</strong>
              </Button>
            </Col>
            <Col xs={12} sm="auto" className="text-center">
              <Button className="rounded-3" variant="outline-light" size="lg" href="/question-compass">
                <strong>Question Compass</strong>
              </Button>
            </Col>
            <Col xs={12} sm="auto" className="text-center">
              <Button className="rounded-3" variant="outline-light" size="lg" href="/ask-a-doc">
                <strong>Ask A Doc</strong>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>

    {/* Features Section */}
    <Container fluid className="features-section p-0 justify-content-center align-items-center">
      <Container>
        <Row className="text-center py-3 mt-3 text-dark-blue">
          <h1 className="mb-3 text-dark-blue">Your Private Health Resource</h1>
          <h3 className="mb-3">Whether it&apos;s a minor query or a complex issue, you&apos;ll find the guidance you need.</h3>
        </Row>
        <Row className="justify-content-center">
          {/* First Feature Card */}
          <Col xs={12} sm={6} lg={4} className="mb-4">
            <Card className="feature-card rounded-4 p-3 shadow-sm">
              <Card.Img variant="top" src="/images/landing/FAQ.png" className="feature-image" />
              <Card.Body className="text-center">
                <h2 className="features-title">Find health-related questions</h2>
                <p className="feature-text">
                  Search through medical questions written by people like you.
                </p>
              </Card.Body>
              <Button variant="dark" href="/faq" className="feature-button">
                <strong>FAQ</strong>
              </Button>
            </Card>
          </Col>

          {/* Second Feature Card */}
          <Col xs={12} sm={6} lg={4} className="mb-4">
            <Card className="feature-card rounded-4 p-3 shadow-sm">
              <Card.Img variant="top" src="/images/landing/question-compass.png" className="feature-image" />
              <Card.Body className="text-center">
                <h2 className="features-title">Question Compass</h2>
                <p className="feature-text">
                  Chat with our AI assistant and find relevant information to your medical
                  questions.
                </p>
              </Card.Body>
              <Button variant="dark" href="/question-compass" className="feature-button">
                <strong>Question Compass</strong>
              </Button>
            </Card>
          </Col>

          {/* Third Feature Card */}
          <Col xs={12} sm={6} lg={4} className="mb-4">
            <Card className="feature-card rounded-4 p-3 shadow-sm">
              <Card.Img variant="top" src="/images/landing/ask-a-doc.png" className="feature-image" />
              <Card.Body className="text-center">
                <h2 className="features-title">Ask A Doc</h2>
                <p className="feature-text">
                  Can’t find an answer? Anonymously ask questions. Answers found in the FAQ
                  page.
                </p>
              </Card.Body>
              <Button variant="dark" href="/ask-a-doc" className="feature-button">
                <strong>Ask a Doc</strong>
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>

    <Container fluid className="color3">
      <Container className="my-4">
        <Card className="rounded-4 p-2 text-center">
          <Card.Body>
            <Row className="my-4">
              <Col sm={12} md={6}>
                <Image src="images/landing/MedGrp.jpg" alt="Medical pic" width="85%" className="rounded-4" />
              </Col>
              <Col sm={12} md={6}>
                <h2 style={{ color: 'rgba(15.81, 18.83, 106.57, 0.98)', fontSize: 40, fontWeight: 700 }}>
                  Stay Proactive
                </h2>
                <p style={{ color: 'black', fontSize: 20, fontWeight: 600, wordWrap: 'break-word' }}>
                  Regular health assessments and preventive care ensure that service members meet medical and
                  dental standards essential for fitness for duty and deployment readiness. The Military Health
                  System emphasizes that maintaining medical and dental preventive care fitness is vital for
                  sustaining health and wellness, facilitating restoration, and meeting medical readiness
                  standards.
                </p>
              </Col>
            </Row>
            <Row className="my-4">
              <Col sm={12} md={6}>
                <h2 style={{ color: 'rgba(15.81, 18.83, 106.57, 0.98)', fontSize: 36, fontWeight: 700 }}>
                  Stay Private
                </h2>
                <p style={{ color: 'black', fontSize: 20, fontWeight: 600, wordWrap: 'break-word' }}>
                  Our mission is to empower individuals to take control of their health by providing accessible,
                  accurate, and supportive medical resources. Through innovative tools and educational content,
                  we aim to promote well-being, self-care, and informed decision-making for a healthier
                  community. Your information will never be shared, and your identity will always be hidden and
                  secure.
                </p>
              </Col>
              <Col sm={12} md={6}>
                <Image src="images/landing/supply-drop.jpg" alt="Medical pic" width="85%" className="rounded-4" />
              </Col>
            </Row>
          </Card.Body>
        </Card>
        {/* <Container fluid className="color2 p-4 d-flex justify-content-center align-items-center"> */}
        {/*  <Row className="justify-content-end align-content-end"> */}
        {/*    <Col xs={12} lg={4} className="d-flex justify-content-center"> */}
        {/*      <Card className="landing-info-card rounded-4 p-1 m-2"> */}
        {/*        <Card.Img src="/images/FAQ.png" alt="Logo" variant="top" className="rounded-4" /> */}
        {/*        <Card.Body> */}
        {/*          <Row className="mt-3 text-center"> */}
        {/*            <h2>FAQ</h2> */}
        {/*            <p>First Stop for Quick Answers</p> */}
        {/*          </Row> */}
        {/*        </Card.Body> */}
        {/*      </Card> */}
        {/*    </Col> */}
        {/*    <Col xs={12} lg={4} className="d-flex justify-content-center"> */}
        {/*      <Card className="landing-info-card rounded-4 p-1 m-2"> */}
        {/*        <Card.Img src="/images/Compass.png" alt="Logo" variant="top" className="rounded-4" /> */}
        {/*        <Card.Body> */}
        {/*          <Row className="mt-3 text-center"> */}
        {/*            <h2>Question Compass</h2> */}
        {/*            <p>Find the right path to your health questions</p> */}
        {/*          </Row> */}
        {/*        </Card.Body> */}
        {/*      </Card> */}
        {/*    </Col> */}
        {/*    <Col xs={12} lg={4} className="d-flex justify-content-center"> */}
        {/*      <Card className="landing-info-card rounded-4 p-1 m-2"> */}
        {/*        <Card.Img src="/images/P.png" alt="Logo" variant="top" className="rounded-4" /> */}
        {/*        <Card.Body> */}
        {/*          <Row className="mt-3 text-center"> */}
        {/*            <h2>Ask A Doc</h2> */}
        {/*            <p>Can&apos;t find an answer? Ask a medical professional directly!</p> */}
        {/*          </Row> */}
        {/*        </Card.Body> */}
        {/*      </Card> */}
        {/*    </Col> */}
        {/*  </Row> */}
        {/* </Container> */}
        {/* <Container fluid className="color1 p-4 d-flex justify-content-center align-items-center"> */}
        {/*  <Row className="justify-content-end align-content-end"> */}
        {/*    <Col> */}
        {/*      <Card className="rounded-4 p-3 my-4 text-center"> */}
        {/*        <Card.Title> */}
        {/*          <h2>Our Promise</h2> */}
        {/*        </Card.Title> */}
        {/*        <Card.Body> */}
        {/*          <Row> */}
        {/*            <Col> */}
        {/*              <LockFill size="7vw" className="landing-info-card-icon" /> */}
        {/*              <h5> */}
        {/*                We don&apos;t collect any personal information. */}
        {/*              </h5> */}
        {/*            </Col> */}
        {/*            <Col> */}
        {/*              <ShieldFill size="7vw" className="landing-info-card-icon" /> */}
        {/*              <h5> */}
        {/*                No tracking - your usage stays anonymous. */}
        {/*              </h5> */}
        {/*            </Col> */}
        {/*            <Col> */}
        {/*              <PersonCheckFill size="7vw" className="landing-info-card-icon" /> */}
        {/*              <h5> */}
        {/*                Completely anonymous interactions. */}
        {/*              </h5> */}
        {/*            </Col> */}
        {/*          </Row> */}
        {/*          <hr /> */}
        {/*          <h4> */}
        {/*            Noble is designed with privacy in mind. No login required, no personal information collected. */}
        {/*          </h4> */}
        {/*        </Card.Body> */}
        {/*      </Card> */}
        {/*    </Col> */}
        {/*  </Row> */}
        {/* </Container> */}
        {/* <Container fluid className="color4 p-4 d-flex justify-content-center align-items-center"> */}
        {/*  <Col xs={12} sm={11} md={9}> */}
        {/*    <Card className="rounded-4 p-3 my-4 text-center"> */}
        {/*      <h2>Our Mission</h2> */}
        {/*      <br /> */}
        {/*      <p> */}
        {/*        Our mission is to empower individuals to take control of their health by providing accessible, */}
        {/*        accurate, and supportive medical resources. Through innovative tools and educational content, */}
        {/*        we aim to promote well-being, self-care, and informed decision-making for a healthier community. */}
        {/*      </p> */}
        {/*    </Card> */}
        {/*  </Col> */}
        {/* </Container> */}
      </Container>
    </Container>
  </Container>
);
export default Landing;
