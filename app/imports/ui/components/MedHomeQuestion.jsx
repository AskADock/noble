import React, { useState } from 'react';
import { Card, Row, Table, Button, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import QuestionModal from './QuestionModal';

const MedHomeQuestion = ({ questions }) => {
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
      <Row className="my-2 align-content-center justify-content-center">
        <Card className="rounded-4 p-1">
          <Card.Title>
            <h2 className="text-center mt-2">Recent Questions</h2>
          </Card.Title>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th colSpan={1}>Category</th>
                  <th colSpan={9}>Question</th>
                  <th colSpan={2}>Options</th>
                </tr>
              </thead>
              <tbody>
                {questions.slice(-10).map((question) => (
                  <tr key={question._id}>
                    <td colSpan={1}>{question.category}</td>
                    <td colSpan={9}>{question.question}</td>
                    <td colSpan={2} className="text-center">
                      <ButtonGroup>
                        <Button variant="primary" onClick={() => handleShowModal('edit', question)}>
                          Reply
                        </Button>
                        <Button variant="danger" onClick={() => handleShowModal('delete', question)}>
                          Delete
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button>
              View More
            </Button>
          </Card.Body>
        </Card>
      </Row>

      <QuestionModal
        show={showModal}
        action={action}
        question={selectedQuestion}
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
};

export default MedHomeQuestion;
