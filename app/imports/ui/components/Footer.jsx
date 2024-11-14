import React from 'react';
import { Container, Col, Row, Nav } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '25px' };
  const logoStyle = { marginBottom: '30px' };
  return (
    <footer className="mt-auto bg-light p-4">
      <Container style={divStyle}>
        <Row className="text-center">
          <Col md={4} className="text-start offset-md-1">
            <div>
              <Nav className="flex-column">
                <Nav.Link href="/" id={COMPONENT_IDS.FOOTER_HOME}>Home</Nav.Link>
                <Nav.Link href="/faq" id={COMPONENT_IDS.FOOTER_FAQ}>FAQ</Nav.Link>
                <Nav.Link href="/question-compass" id={COMPONENT_IDS.FOOTER_QUESTION_COMPASS}>Question Compass</Nav.Link>
                <Nav.Link href="/ask-a-doc" id={COMPONENT_IDS.FOOTER_ASK_A_DOC}>Ask A Doc</Nav.Link>
                <Nav.Link href="/feedback" id={COMPONENT_IDS.FOOTER_FEEDBACK}>Feedback</Nav.Link>
                <Nav.Link href="/privacy" id={COMPONENT_IDS.FOOTER_PRIVACY_POLICY}>Privacy</Nav.Link>
              </Nav>
            </div>
          </Col>
          <Col md={3} className="text-start">
            <div>
              <h4>Resources</h4>
              <Nav className="flex-column">
                <Nav.Link href="mailto:154mdg.gcc@us.af.mil">154 MDG Org Box</Nav.Link>
                <Nav.Link href="https://usaf.dps.mil/sites/HIANG/154WG/154MDG" target="_blank">154 MDG SharePoint</Nav.Link>
                <Nav.Link href="https://asimsimr.health.mil/imr/myimr.aspx" target="_blank">MyIMR Link</Nav.Link>
                <Nav.Link href="https://asimsimr.health.mil/imr/Login_Unit.aspx" target="_blank">Unit POC’s ASIMS Login</Nav.Link>
              </Nav>
            </div>
          </Col>
          <Col md={3}>
            <Nav className="justify-content-center">
              {/* <Nav.Link href="/terms">Terms</Nav.Link>
              <Nav.Link href="/privacy">Privacy</Nav.Link> */}{/* This should now link to your Privacy component */}
            </Nav>
            <Nav className="justify-content-center">
              <Row className="text-center mt-3">
                <Col md={4}>
                  <img src="/images/154_Logo.png" alt="Logo" width="150" height="150" style={logoStyle} />
                </Col>
              </Row>
            </Nav>
            <Nav className="justify-content-center mt-1">
              © Noble 2024
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
