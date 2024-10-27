import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { removeItMethod, updateMethod } from '../../api/base/BaseCollection.methods';
import { Questions } from '../../api/question/QuestionCollection';

const QuestionModal = ({ show, action, question, onClose }) => {
  const [updatedQuestion, setUpdatedQuestion] = useState(question);

  useEffect(() => {
    setUpdatedQuestion(question); // Update the modal content when the selected question changes
  }, [question]);

  const handleSaveChanges = () => {
    const collectionName = Questions.getCollectionName();

    if (action === 'delete') {
      removeItMethod.callPromise({ collectionName, instance: question._id })
        .catch((error) => swal('Error', error.message, 'error'))
        .then(() => swal('Success', 'Question deleted successfully', 'success'));
    } else if (action === 'edit' || action === 'reply') {
      const questionData = {
        id: question._id,
        question: updatedQuestion.question,
        answer: updatedQuestion.answer,
        answered: true,
      };

      updateMethod.callPromise({ collectionName, updateData: questionData })
        .catch((error) => swal('Error', error.message, 'error'))
        .then(() => swal('Success', `Question ${action === 'edit' ? 'updated' : 'replied to'} successfully`, 'success'));
    }
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{action === 'delete' ? 'Delete Question' : 'Edit Question'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {action === 'delete' ? (
          <>
            <h5>Are you sure you want to delete this question?</h5>
            <p>{question.question}</p>
          </>
        ) : (
          <Form>
            <Form.Group>
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                defaultValue={question?.question}
                onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, question: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                defaultValue={question?.answer}
                onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answer: e.target.value })}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          {action === 'delete' ? 'Delete' : 'Save Changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

QuestionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  action: PropTypes.string,
  question: PropTypes.shape({
    _id: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    category: PropTypes.string,
    answered: PropTypes.bool,
  }),
  onClose: PropTypes.func.isRequired,
};

export default QuestionModal;
