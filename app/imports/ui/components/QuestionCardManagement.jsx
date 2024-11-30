import React, { useState } from 'react';
import { Card, Badge, ButtonGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import QuestionModal from './QuestionModal';

const QuestionCardManagement = ({ questions, categories, collection }) => {
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleShowModal = (actionType, question) => {
    setAction(actionType);
    setSelectedQuestion(question);
    setShowModal(true);
  };

  return (
    <>
      <Card key={questions._id} className="mb-3 rounded-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <Badge bg="primary" style={{ fontSize: '.9rem' }}>
              {questions.category}
            </Badge>
            <p className="text-muted mb-0 ms-2">
              Updated: {questions.timestamp.toLocaleDateString()}
            </p>
          </div>
          <Card.Title className="text-start pt-1">
            {questions.question}
          </Card.Title>
          {questions.answer && (
            <Card.Text className="text-start">
              {questions.answer}
            </Card.Text>
          )}
        </Card.Body>
        <Card.Footer className="text-end">
          <ButtonGroup>
            <Button variant="success" onClick={() => handleShowModal('edit', questions)}>Reply</Button>
            <Button variant="danger" onClick={() => handleShowModal('delete', questions)}>Delete</Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>

      <QuestionModal
        show={showModal}
        collection={collection}
        action={action}
        question={selectedQuestion}
        category={categories}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

QuestionCardManagement.propTypes = {
  questions: PropTypes.shape({
    _id: PropTypes.string,
    category: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    timestamp: PropTypes.instanceOf(Date),
  }).isRequired,
  categories: PropTypes.shape({
    category: PropTypes.string,
  }).isRequired,
  collection: PropTypes.string.isRequired,
};

export default QuestionCardManagement;
