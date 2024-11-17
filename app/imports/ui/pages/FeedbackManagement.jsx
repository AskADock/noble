import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { removeItMethod } from '../../api/base/BaseCollection.methods';
import { Feedback } from '../../api/feedback/FeedbackCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const FeedbackManagement = () => {
  // Subscribe to the Feedback collection
  const { ready, feedback } = useTracker(() => {
    const subscription = Feedback.subscribeFeedbackAdmin();
    const rdy = subscription.ready();
    const feedbackItems = Feedback.find().fetch();
    return {
      feedback: feedbackItems,
      ready: rdy,
    };
  });

  const [show, setShow] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // Handle the modal close
  const handleClose = () => setShow(false);

  // Handle the delete button
  const handleDelete = () => {
    removeItMethod.callPromise({ collectionName: Feedback.getCollectionName(), instance: selectedFeedback._id })
      .then(() => {
        swal('Success', 'Feedback deleted successfully', 'success');
        handleClose();
      })
      .catch((error) => swal('Error', error.message, 'error'));
  };

  return (ready ? (
    <Container fluid className="p-0 med-staff-background" id={PAGE_IDS.FEEDBACK_MANAGEMENT}>
      <Container fluid className="color1">
        <Row className="py-4 text-center">
          <Col>
            <h1 className="text-white">Feedback Management</h1>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="py-4">
          <Col>
            {feedback.map((f) => (
              <Card key={f._id} className="mb-3">
                <Card.Body>
                  <Card.Text>{f.feedback}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedFeedback(f);
                      setShow(true);
                    }}
                  >Delete
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this feedback?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  ) : <LoadingSpinner />);
};

export default FeedbackManagement;
