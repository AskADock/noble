import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const QuestionCompass = () => (
  <Container fluid className="question-compass-background p-0" id={PAGE_IDS.QUESTION_COMPASS}>
    <Container fluid className="color1">
      <Row className="py-4 text-center">
        <Col>
          <h1 className="text-white">Question Compass</h1>
        </Col>
      </Row>
    </Container>
    <Container>
      <Row className="my-5">
        <Col className="text-center">
          <h2>Disclaimer</h2>
          <h5> A ChatGPT account is required.</h5>
          <p>
            The Question Compass is still in development. To access a demo of the Question Compass, click the button below.
          </p>
          <p>
            The Question Compass is an AI chatbot knowledgeable about Air Force medical standards and procedures. It can answer questions about medical standards, waivers, and other medical-related topics.
          </p>
          <hr className="my-5" />
          <Button href="https://chatgpt.com/g/g-1mXpsuNWq-noble" variant="primary">
            Question Compass
          </Button>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default QuestionCompass;
