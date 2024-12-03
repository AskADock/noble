import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
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
            <span className="d-flex align-items-center">
              <ExclamationTriangleFill color="red" size="10%" />
              <h4>Delete this question?</h4>
            </span>
            <hr />
            <h4>Question</h4>
            <p>{question.question}</p>
            {question.answer && (
              <>
                <h4>Answer</h4>
                <p>{question.answer}</p>
              </>
            )}
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
                rows={5}
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
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
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
