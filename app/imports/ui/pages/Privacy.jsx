import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Privacy = () => (
  <Container fluid className="privacy-policy-background">
    <Container className="justify-content-center align-items-center">
      <Row className="py-4">
        <Col>
          <Card className="rounded-4 p-3 text-center">
            <Card.Title>
              <h1>Privacy Policy</h1>
              <hr />
            </Card.Title>
            <Card.Body>
              <Row className="text-start">
                <p>
                  Your privacy is our top priority. All interactions—whether through chat or survey questions—are completely anonymous and not linked to any personal profile.
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
