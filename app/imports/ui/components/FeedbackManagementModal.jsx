import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { removeItMethod } from '../../api/base/BaseCollection.methods';
import { Feedback } from '../../api/feedback/FeedbackCollection';

const FeedbackManagementModal = ({ show, feedback, onClose }) => {

  const handleDelete = () => {
    // Remove the feedback
    removeItMethod.callPromise({ collectionName: Feedback.getCollectionName(), instance: feedback._id })
      .then(() => {
        swal('Success', 'Feedback deleted successfully', 'success');
        onClose();
      })
      .catch((error) => swal('Error', error.message, 'error'));
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keybard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="d-flex align-items-center">
          <ExclamationTriangleFill color="red" size="10%" />
          <h4>Delete this feedback?</h4>
        </span>
        <hr />
        <h4>Feedback</h4>
        <p>{feedback.feedback}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

FeedbackManagementModal.propTypes = {
  show: PropTypes.bool.isRequired,
  feedback: PropTypes.shape({
    _id: PropTypes.string,
    feedback: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FeedbackManagementModal;
