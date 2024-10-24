import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Privacy = () => (
  <Container fluid className="color1 justify-content-center align-items-center">
    <Row className="py-4 my-5 align-content-center justify-content-center">
      <Col className="col-9">
        <Card className="rounded-4 p-4 text-center">
          <h1 className="mb-4">Privacy Policy</h1>
          <Row className="text-start px-5">
            <p>
              At Noble, your privacy is our top priority. We are committed to ensuring that any information you provide remains completely anonymous. No personally identifiable information is collected unless you explicitly choose to share it
              for communication purposes. Your questions are submitted securely, and we take extensive measures to ensure that your data is encrypted and stored safely.
            </p>
            <p>
              We understand the importance of confidentiality in healthcare, which is why we never track or associate questions with user profiles. This approach allows you to seek the medical information you need without any concerns about
              privacy. Trust is at the heart of our mission, and we are dedicated to maintaining it by keeping your identity protected at all times.
            </p>
          </Row>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Privacy;
