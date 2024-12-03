import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import Header from '../components/Header';

const Privacy = () => (
  <Container fluid className="privacy-policy-background" id={PAGE_IDS.PRIVACY_POLICY}>
    <Header
      title="Privacy Policy"
      background="color1"
    />
    <Container className="justify-content-center align-items-center">
      <Row className="py-4">
        <Col>
          <Card className="rounded-4 p-3 text-center">
            <Card.Body>
              <Row className="text-start">
                <p>
                  Your privacy is our top priority. All interactions—whether through chat or form submissions—are completely anonymous and not linked to any personal profile.
                </p>
                <p>
                  Please avoid including personally identifiable information in your chat. Noble is designed to provide you with a secure, private space to access health information without tracking or identification.
                </p>
                <p>
                  Trust is at the heart of our mission, and we are dedicated to maintaining it by keeping your identity protected at all times.
                </p>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default Privacy;
