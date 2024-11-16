import React from 'react';
import { Row, Col, Container, Button, Card, Image } from 'react-bootstrap';
import { LockFill, ShieldFill, PersonCheckFill } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container fluid id={PAGE_IDS.LANDING} className="landing-background p-0">
    {/* Hero Section */}
    <Container>
      <Row className="hero-section align-items-center text-center my-5 py-5">
        <Col className="justify-content-center text-shadow">
          <h1 className="hero-title">Noble</h1>
          <h3 className="hero-subtitle">
            Prepared for Tomorrow
          </h3>
        </Col>
      </Row>
    </Container>

    {/* About Section */}
    <Container fluid className="about-section align-content-center">
      <Container>
        <Row className="py-3 mt-3 mb-4 justify-content-center text-center">
          <h1 className="text-dark-blue pt-3">
            <strong>It takes courage to address health concerns,</strong>
          </h1>
          <h1 className="text-dark-blue pb-3">
            <strong>especially when privacy is a priority</strong>
          </h1>
          <hr />
          <Row className="text-black">
            <Col sm={12} md={6} className="align-content-center">
              <h3>
                Noble provides <strong>reliable, anonymous health information and support</strong>, empowering individuals to make informed decisions with confidence.
              </h3>
            </Col>
            <Col sm={12} md={6} className="align-content-center">
              <Image fluid src="/images/landing/MedGrp.jpg" alt="" className="rounded-4" style={{ maxWidth: '90%' }} />
            </Col>
          </Row>
        </Row>
      </Container>
    </Container>

    {/* Stay Proactive Section */}
    <Container fluid className="stay-proactive-background">
      <Row className="justify-content-end align-items-end">
        <Col xs={12} sm={6} className="stay-proactive-section align-content-center p-lg-5 p-sm-4">
          <h1 className="text-light-blue stay-proactive-title">
            <strong>STAYING PROACTIVE</strong>
          </h1>
          <hr />
          <p className="text-start">
            Regular health checkups and preventive care are key to staying healthy, prepared, and ready to meet both personal and professional demands.
          </p>
        </Col>
      </Row>
    </Container>

    {/* Mission Section */}
    <Container fluid className="color-white p-0">
      <Container>
        <Row className="text-center py-4 my-3 text-dark-blue">
          <h1 className="text-dark-blue">
            <strong>OUR MISSION</strong>
          </h1>
        </Row>
      </Container>
    </Container>
    <Container fluid className="our-misison-background">
      <Row className="justify-content-start align-content-start">
        <Col sm={12} md={6} className="our-mission-section align-content-center p-lg-5 p-sm-4">
          <h1 className="text-light-blue our-mission-tilte">
            PREPARED FOR TOMORROW
          </h1>
          <hr />
          <p className="text-start">
            We empower individuals to take charge of their health with accessible and reliable resources.
            Through innovative tools and education, we inspire well-being, self-care, and confident decision-making for a healthier, safer community.
          </p>
        </Col>
      </Row>
    </Container>

    {/* Our Promise Section */}
    <Container fluid className="color-white p-0">
      <Container>
        <Row className="text-center py-4 my-3 text-dark-blue">
          <h1 className="text-dark-blue">
            <strong>OUR PROMISE</strong>
          </h1>
        </Row>
      </Container>
    </Container>
    <Container fluid className="our-promise-background align-content-center">
      <Row className="justify-content-center p-2">
        <Col sm={12} md={8} lg={6} className="our-promise-section align-content-center">
          <Row className="text-center align-content-center justify-content-center p-3">
            <Row className="mb-5">
              <h1 className="text-light-blue our-promise-title">
                <strong>Designed with Privacy</strong>
              </h1>
              <hr />
              <h2>
                <strong>No login required, nothing collected</strong>
              </h2>
            </Row>
            <Col sm={12} md={4} className="p-1">
              <LockFill size="50%" className="landing-info-card-icon" />
              <h4>
                NO personal information collected
              </h4>
            </Col>
            <Col sm={12} md={4} className="p-1">
              <ShieldFill size="50%" className="landing-info-card-icon" />
              <h4>
                NO tracking
              </h4>
            </Col>
            <Col sm={12} md={4} className="p-1">
              <PersonCheckFill size="50%" className="landing-info-card-icon" />
              <h4>
                Completely anonymous interactions
              </h4>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>

    {/* Features Section */}
    <Container fluid className="features-section justify-content-center align-items-center">
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
                <h2 className="features-title">FAQ</h2>
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
                  Chat with our AI assistant and find relevant medical information.
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
                  Can’t find an answer? Anonymously ask questions. Answers found in FAQ.
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
