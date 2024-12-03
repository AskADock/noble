import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { FAQ } from '../../api/faq/FAQCollection';

const CreateFAQModal = ({ show, onClose, categories }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');

  const handleCreateFAQ = () => {
    const faqData = {
      question,
      answer,
      category,
    };

    defineMethod.callPromise({ collectionName: FAQ.getCollectionName(), definitionData: faqData })
      .then(() => {
        swal('Success', 'FAQ created successfully', 'success');
        // Reset the form
        setQuestion('');
        setAnswer('');
        setCategory('');
        onClose();
      })
      .catch((error) => swal('Error', error.message, 'error'));
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Create New FAQ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCategory">
            <Form.Label><strong>Category</strong></Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.category}>{cat.category}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label><strong>Question</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label><strong>Answer</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter answer"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateFAQ}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

CreateFAQModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
  })).isRequired,

};

export default CreateFAQModal;
