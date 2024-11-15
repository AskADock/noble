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
        <Col xs={12} className="justify-content-center text-shadow">
          <h1 className="hero-title">Noble</h1>
          <h3 className="hero-subtitle">
            Prepared for Tomorrow
          </h3>
        </Col>
      </Row>
    </Container>

    {/* About Section */}
    <Container fluid className="about-section p-0">
      <Container>
        <Row className="text-center text-black py-3 mt-3 mb-4">
          <h2 className="text-dark-blue py-3">
            <strong>It takes courage to address health concerns, especially when privacy is a priority</strong>
          </h2>
          <hr />
          <h3>
            Noble provides reliable, anonymous health information and support, empowering individuals to make informed decisions with confidence.
          </h3>
        </Row>
      </Container>
    </Container>

    {/* Stay Proactive Section */}
    <Container fluid className="stay-proactive-background">
      <Row className="justify-content-end align-items-end">
        <Col xs={12} sm={6} className="stay-proactive-text align-content-center p-5">
          <h1 className="text-light-blue">
            <strong>STAYING PROACTIVE</strong>
          </h1>
          <p className="text-start">
            Regular health assessments and preventive care are essential for maintaining overall health, ensuring individuals are prepared for their responsibilities, and promoting long-term well-being.
            Prioritizing preventive care supports wellness, aids recovery, and helps meet readiness standards for both personal and professional demands.
          </p>
        </Col>
      </Row>
    </Container>

    {/* Our Promise Section */}
    <Container fluid className="color1 p-4 d-flex justify-content-center align-items-center">
      <Row className="justify-content-center align-content-center">
        <Col sm={12} md={6} className="text-center align-content-center">
          <Card className="rounded-4 p-3 my-4 text-center">
            <Card.Title>
              <h1 className="text-dark-blue">
                <strong>Our Promise</strong>
              </h1>
            </Card.Title>
            <Card.Body>
              <Row>
                <Col sm={12} md={4}>
                  <LockFill size="50%" className="landing-info-card-icon" />
                  <h4>
                    We don&apos;t collect any personal information
                  </h4>
                </Col>
                <Col sm={12} md={4}>
                  <ShieldFill size="50%" className="landing-info-card-icon" />
                  <h4>
                    No tracking - your usage stays anonymous
                  </h4>
                </Col>
                <Col sm={12} md={4}>
                  <PersonCheckFill size="50%" className="landing-info-card-icon" />
                  <h4>
                    Completely anonymous interactions
                  </h4>
                </Col>
              </Row>
              <hr />
              <h3>
                Noble is designed with privacy in mind
              </h3>
              <h3>
                <strong>No login required, no personal information collected</strong>
              </h3>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6} className="text-center align-content-center">
          <Image fluid src="/images/landing/pilot-shaka.jpg" alt="" className="rounded-4" />
        </Col>
      </Row>
    </Container>

    {/* Mission Section */}
    <Container fluid className="color4 p-4 d-flex justify-content-center align-items-center">
      <Col xs={12} sm={11} md={9}>
        <Card className="rounded-4 p-3 my-4 text-center">
          <Card.Title>
            <h1>
              <strong>Our Mission</strong>
            </h1>
          </Card.Title>
          <Card.Body>
            <p>
              Our mission is to empower individuals to take control of their health by providing accessible,
              accurate, and supportive medical resources. Through innovative tools and educational content,
              we aim to promote well-being, self-care, and informed decision-making for a healthier and safer community.
            </p>
            <h3>
              Together, we can be Prepared for Tomorrow
            </h3>
          </Card.Body>
        </Card>
      </Col>
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
  </Container>
);
export default Landing;
