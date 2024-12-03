import React from 'react';
import { Card, Accordion, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const QuestionCard = ({ question }) => (
  <Card className="my-2" key={question._id} id={COMPONENT_IDS.FAQ_LIST_CARD}>
    <Accordion id={COMPONENT_IDS.FAQ_LIST_CARD_ACCORDION}>
      <Accordion.Item eventKey={question._id} className="p-2">
        <div className="d-flex justify-content-between align-items-center">
          <Badge bg="primary" style={{ fontSize: '.9rem' }}>
            {question.category}
          </Badge>
          <p className="text-muted mb-0 ms-2">
            Updated: {question.timestamp.toLocaleDateString()}
          </p>
        </div>
        <Accordion.Header id={COMPONENT_IDS.FAQ_LIST_QUESTION}>
          <h5>{question.question}</h5>
        </Accordion.Header>
        <Accordion.Body id={COMPONENT_IDS.FAQ_LIST_ANSWER}>{question.answer}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </Card>
);

QuestionCard.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string,
    category: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    timestamp: PropTypes.instanceOf(Date),
  }).isRequired,
};

export default QuestionCard;
