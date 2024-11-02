import React, { useState } from 'react';
import { Card, Row, Button, ButtonGroup, Badge, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import QuestionModal from './QuestionModal';

const MedHomeQuestion = ({ questions, categories }) => {
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
      <Row className="my-2 align-content-center justify-content-center align-content-center">
        <Card className="rounded-4 p-1">
          <Card.Title>
            <h2 className="text-center mt-2">Recent Questions</h2>
          </Card.Title>
          <Card.Body>
            <Row className="justify-content-center">
              <Col className="col-11">
                {questions.length > 0 ? questions.map((item) => (
                  <Card key={item._id} className="mb-3 rounded-4">
                    <Card.Body>
                      <Badge bg="primary">{item.category || 'Uncategorized'}</Badge>
                      <Card.Title>{item.question}</Card.Title>
                      <Row className="justify-content-end">
                        <Col className="col-lg-4 col-xs-6 text-end">
                          <ButtonGroup>
                            <Button variant="success" onClick={() => handleShowModal('edit', item)}>Reply</Button>
                            <Button variant="danger" onClick={() => handleShowModal('delete', item)}>Delete</Button>
                          </ButtonGroup>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )) : <p>No Questions!</p>}
              </Col>
            </Row>
            <Button>
              View More
            </Button>
          </Card.Body>
        </Card>
      </Row>

      <QuestionModal
        show={showModal}
        collection="Questions"
        action={action}
        question={selectedQuestion}
        category={categories}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

MedHomeQuestion.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    category: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    answered: PropTypes.bool,
  })).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
  })).isRequired,
};

export default MedHomeQuestion;
