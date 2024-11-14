import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MedHomeStats = ({ allQuestions, questionsNotAnswer, faq }) => {
  const textStyle = questionsNotAnswer.length > 0 ? { color: 'red' } : { color: 'green' };

  return (
    <Row className="my-2 align-content-center justify-content-center">
      <Card className="rounded-4">
        <Card.Body>
          <Row>
            <Col md={3} className="text-center">
              <h4>FAQ Total</h4>
              <h5>{faq.length}</h5>
            </Col>
            <Col md={3} className="text-center">
              <h4>Total Questions</h4>
              <h5>{allQuestions.length}</h5>
            </Col>
            <Col md={3} className="text-center">
              <h4>Unanswered Questions</h4>
              <h5 style={textStyle}>{questionsNotAnswer.length}</h5>
            </Col>
            <Col sm={12} md={3} className="text-center">
              <Row className="mb-2">
                <Button href="/faq-management">
                  FAQ Management
                </Button>
              </Row>
              <Row className="mb-2">
                <Button href="/question-management">
                  Question Management
                </Button>
              </Row>
              <Row>
                <Button href="/passcode-management">
                  Passcode Management
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Row>
  );
};

MedHomeStats.propTypes = {
  allQuestions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    category: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    answered: PropTypes.bool,
  })).isRequired,
  questionsNotAnswer: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    category: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    answered: PropTypes.bool,
  })).isRequired,
  faq: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
  })).isRequired,
};

export default MedHomeStats;
