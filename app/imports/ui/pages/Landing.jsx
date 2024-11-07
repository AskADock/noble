import React from 'react';
import { Row, Col, Container, Button, Card } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
    <Container fluid id={PAGE_IDS.LANDING} className="landing-background p-0">

        {/* Hero Section */}
        <Row className="hero-section align-items-center text-center mt-5 mb-3">
            <Col xs={12}   className="justify-content-center">
                <h1 className="hero-title">Noble</h1>
                <h3 className="hero-subtitle">
                    Prepared for Tomorrow
                </h3>
            </Col>
        </Row>

        {/* Features Section */}
        <Container fluid className="features-section p-4 d-flex flex-column justify-content-center align-items-center">
            {/* Centered Headings for Features */}
            <h2 className="text-center mb-3 text-dark-blue">Features</h2> {/* White text for heading */}
            <h3 className="text-center mb-4 text-dark-blue">
                Applications made for you to access medical information whenever, wherever.
            </h3>

            <Row className="feature-cards justify-content-around">
                {/* First Feature Card */}
                <Col xs={14} sm={8} md={4} className="mb-4">
                    <Card className="feature-card p-3 shadow-sm">
                        <Card.Img variant="top" src="/images/FAQ.png" className="feature-image"/>
                        <Card.Body className="text-center">
                            <h2 className="features-title">Find health-related questions </h2>
                            <p className="feature-text">
                                Whether it's a minor query or a more complex issue, you can get the guidance you need
                                through our platform. Search through medical questions written by people like you.
                            </p>
                            <Button variant="primary" href="/faq">FAQ</Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Second Feature Card */}
                <Col xs={14} sm={8} md={4} className="mb-4">
                    <Card className="feature-card p-3 shadow-sm">
                        <Card.Img variant="top" src="/images/N.png" className="feature-image"/>
                        <Card.Body className="text-center">
                            <h2 className="features-title">Question Compass</h2>
                            <p className="feature-text">
                                Using our custom AI assistant, you can find relevant information to your medical
                                questions approved by medical staff </p>
                            <Button variant="primary" href="/question-compass">Question Compass</Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Third Feature Card */}
                <Col xs={14} sm={8} md={4} className="mb-4">
                    <Card className="feature-card p-3 shadow-sm">
                        <Card.Img variant="top" src="/images/P.png" className="feature-image"/>
                        <Card.Body className="text-center">
                            <h2 className="features-title">Ask A Doc</h2>
                            <p className="feature-text">
                                Can’t find an answer? Worried about your privacy? Use our Ask A Doc feature to ask real
                                medical professionals anonymous questions that get answered periodically on the FAQ
                                page.
                            </p>
                            <Button variant="primary" href="/ask-a-doc">Ask a Doc</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

        <div className="medgroup" style={{width: 1676, height: 988, position: 'relative'}}>

            <div
                className="rectangle"
                style={{
                    width: 1676,
                    height: 988,
                    position: 'absolute',
                    background: 'white',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: 70,
                }}
            />

            <div
                className="stay-proactive"
                style={{
                    width: 607,
                    height: 'auto',
                    left: 930,
                    top: 54,
                    //position: 'absolute',
                    textAlign: 'center',
                    position: 'relative',
                    padding: '40px',
                    maxWidth: '100%',
                }}
            >
                <h2 style={{color: 'rgba(15.81, 18.83, 106.57, 0.98)', fontSize: 40, fontWeight: 700}}>
                    Stay Proactive
                </h2>
                <p style={{color: 'black', fontSize: 20, fontWeight: 600, wordWrap: 'break-word'}}>
                    Regular health assessments and preventive care ensure that service members meet medical and
                    dental standards essential for fitness for duty and deployment readiness. The Military Health
                    System emphasizes that maintaining medical and dental preventive care fitness is vital for
                    sustaining health and wellness, facilitating restoration, and meeting medical readiness
                    standards.
                </p>
            </div>
            <div
                className="stay-private"
                style={{
                    width: 607,
                    height: 'auto',
                    left: 103,
                    top: 548,
                    position: 'absolute',
                    textAlign: 'center',
                }}
            >
                <h2 style={{color: 'rgba(15.81, 18.83, 106.57, 0.98)', fontSize: 36, fontWeight: 700}}>
                    Stay Private
                </h2>
                <p style={{color: 'black', fontSize: 20, fontWeight: 600, wordWrap: 'break-word'}}>
                    Our mission is to empower individuals to take control of their health by providing accessible,
                    accurate, and supportive medical resources. Through innovative tools and educational content,
                    we aim to promote well-being, self-care, and informed decision-making for a healthier
                    community. Your information will never be shared, and your identity will always be hidden and
                    secure.
                </p>
            </div>
            <img
                className="medgrp"
                style={{width: 686, height: 405, left: 83, top: 89, position: 'absolute'}}
                src="images/landing/MedGrp.jpg"
                alt="Medical pic"
            />
            <img
                className="medgrp"
                style={{width: 689, height: 426, left: 866, top: 526, position: 'absolute'}}
                src="images/landing/supply-drop.jpg"
                alt="Medical pic"
            />
        </div>
</Container>
)
;

export default Landing;
