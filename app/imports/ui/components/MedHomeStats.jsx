import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MedHomeStats = ({ faq, allQuestions, questionsNotAnswer }) => {
  const textStyle = questionsNotAnswer.length > 0 ? { color: 'red' } : { color: 'green' };

  return (
    <Row className="my-2 align-content-center justify-content-center">
      <Card className="rounded-4">
        <Card.Body>
          <Row>
            <Col md={3} className="text-center align-content-center">
              <h3>FAQ Total</h3>
              <h4>{faq.length}</h4>
            </Col>
            <Col md={3} className="text-center align-content-center">
              <h3>Total Questions</h3>
              <h4>{allQuestions.length}</h4>
            </Col>
            <Col md={3} className="text-center align-content-center">
              <h3>Unanswered</h3>
              <h4 style={textStyle}>{questionsNotAnswer.length}</h4>
            </Col>
            <Col sm={12} md={3} className="text-center align-content-center">
              <Row className="mb-2">
                <Button href="/faq-management" className="text-center">
                  <h5>FAQ Management</h5>
                </Button>
              </Row>
              <Row className="mb-2">
                <Button href="/question-management" className="text-center">
                  <h5>Question Management</h5>
                </Button>
              </Row>
              <Row>
                <Button href="/passcode-management" className="text-center">
                  <h5>Passcode Management</h5>
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
