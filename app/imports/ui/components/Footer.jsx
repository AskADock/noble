import React from 'react';
import { Container, Row, Col, Nav, Image } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto bg-light p-4">
    <Container>
      <Row className="text-center justify-content-center">
        <Col md={4} className="text-start">
          <Nav className="flex-column">
            <Nav.Link href="/" id={COMPONENT_IDS.FOOTER_HOME}>Home</Nav.Link>
            <Nav.Link href="/faq" id={COMPONENT_IDS.FOOTER_FAQ}>FAQ</Nav.Link>
            <Nav.Link href="/question-compass" id={COMPONENT_IDS.FOOTER_QUESTION_COMPASS}>Question Compass</Nav.Link>
            <Nav.Link href="/ask-a-doc" id={COMPONENT_IDS.FOOTER_ASK_A_DOC}>Ask A Doc</Nav.Link>
            <Nav.Link href="/feedback" id={COMPONENT_IDS.FOOTER_FEEDBACK}>Feedback</Nav.Link>
            <Nav.Link href="/privacy" id={COMPONENT_IDS.FOOTER_PRIVACY_POLICY}>Privacy</Nav.Link>
          </Nav>
        </Col>
        <Col md={4} className="text-start">
          <h4>Resources</h4>
          <Nav className="flex-column">
            <Nav.Link href="mailto:154mdg.gcc@us.af.mil">154 MDG Org Box</Nav.Link>
            <Nav.Link href="https://usaf.dps.mil/sites/HIANG/154WG/154MDG" target="_blank" rel="noreferrer">154 MDG SharePoint</Nav.Link>
            <Nav.Link href="https://asimsimr.health.mil/imr/myimr.aspx" target="_blank" rel="noreferrer">MyIMR Link</Nav.Link>
            <Nav.Link href="https://asimsimr.health.mil/imr/Login_Unit.aspx" target="_blank" rel="noreferrer">Unit POC’s ASIMS Login</Nav.Link>
          </Nav>
        </Col>
        <Col md={3} className="text-center">
          <Image src="/images/154_Logo.png" alt="Logo" width="75%" fluid />
          <p>© Noble 2024</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
