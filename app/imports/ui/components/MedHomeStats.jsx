import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MedHomeStats = ({ allQuestions, questionsNotAnswer, faq }) => {
  const textStyle = questionsNotAnswer.length > 0 ? { color: 'red' } : { color: 'green' };

  return (
    <Row className="my-2 align-content-center justify-content-center">
      <Card className="rounded-4">
        <Card.Body>
          <Row>
            <Col className="text-center">
              <h4>FAQ Total</h4>
              <h5>{faq.length}</h5>
            </Col>
            <Col className="text-center">
              <h4>Total Questions</h4>
              <h5>{allQuestions.length}</h5>
            </Col>
            <Col className="text-center">
              <h4>Unanswered Questions</h4>
              <h5 style={textStyle}>{questionsNotAnswer.length}</h5>
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
