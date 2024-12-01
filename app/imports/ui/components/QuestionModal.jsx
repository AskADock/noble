import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { removeItMethod, updateMethod } from '../../api/base/BaseCollection.methods';
import { Questions } from '../../api/question/QuestionCollection';
import { FAQ } from '../../api/faq/FAQCollection';

const QuestionModal = ({ show, collection, action, question, onClose, category }) => {
  const [updatedQuestion, setUpdatedQuestion] = useState(question);

  useEffect(() => {
    setUpdatedQuestion(question); // Update modal content when the selected question changes
  }, [question]);

  const handleSaveChanges = () => {
    let collectionName;
    if (collection === 'FAQ') {
      collectionName = FAQ.getCollectionName();
    } else if (collection === 'Questions') {
      collectionName = Questions.getCollectionName();
    }

    if (action === 'delete') {
      removeItMethod.callPromise({ collectionName, instance: question._id })
        .then(() => {
          swal('Success', `${action === 'FAQ' ? 'FAQ entry' : 'Question'} deleted successfully`, 'success');
          onClose();
        })
        .catch((error) => swal('Error', error.message, 'error'));
    } else if (action === 'reply') {
      const questionData = {
        id: question._id,
        question: updatedQuestion.question,
        answer: updatedQuestion.answer,
        category: updatedQuestion.category,
        answered: true,
      };
      console.log('Collection Name:', collectionName);
      console.log('Question Data:', questionData);

      updateMethod.callPromise({ collectionName, updateData: questionData })
        .then(() => {
          swal('Success', `${action === 'edit' ? 'updated' : 'replied to'} successfully`, 'success');
          onClose();
        })
        .catch((error) => swal('Error', error.message, 'error'));
    } else if (action === 'edit') {
      const questionData = {
        id: question._id,
        question: updatedQuestion.question,
        answer: updatedQuestion.answer,
        category: updatedQuestion.category,
        answered: updatedQuestion.answered,
      };

      updateMethod.callPromise({ collectionName, updateData: questionData })
        .then(() => {
          swal('Success', `${action === 'edit' ? 'updated' : 'replied to'} successfully`, 'success');
          onClose();
        })
        .catch((error) => swal('Error', error.message, 'error'));
    }
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{action === 'delete' ? 'Delete' : ''}{action === 'reply' ? 'Reply to' : ''}{action === 'edit' ? 'Edit' : ''} {collection === 'FAQ' ? 'FAQ' : 'Question'}</Modal.Title>
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
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={updatedQuestion?.category || ''}
                onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, category: e.target.value })}
              >
                {category.map((cat) => (
                  <option key={cat._id} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updatedQuestion?.question || ''}
                onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, question: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Answer</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={updatedQuestion?.answer || ''}
                onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answer: e.target.value })}
              />
            </Form.Group>
            {action === 'edit' && collection === 'Questions' && (
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Answered"
                  checked={updatedQuestion?.answered || false}
                  onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answered: e.target.checked })}
                />
              </Form.Group>
            )}
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
  collection: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  question: PropTypes.shape({
    _id: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    category: PropTypes.string,
    answered: PropTypes.bool,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  category: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
  })).isRequired,
};

export default QuestionModal;
