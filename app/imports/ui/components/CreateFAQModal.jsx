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
        <Modal.Title>Create FAQ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formQuestion">
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter question"
            />
          </Form.Group>
          <Form.Group controlId="formAnswer">
            <Form.Label>Answer</Form.Label>
            <Form.Control
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter answer"
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
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
